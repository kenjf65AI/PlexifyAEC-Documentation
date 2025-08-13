---
adr: "001"
title: "Authentication & Role-Based Access Control (RBAC)"
status: "accepted"
date: "2025-08-13"
deciders: ["Architecture Guild", "Security Lead", "Product Owner"]
tags: ["security", "auth", "rbac", "phase-2"]
---

## 1. Context  

Phase Two (Production Foundation) requires replacing demo-only mocks with a **production-grade AuthN/AuthZ system** to:

* secure evidence links and integration tokens;  
* isolate multi-tenant projects;  
* meet NYC agency audit requirements;  
* support SSO for contractors using Microsoft 365.

The solution must integrate with future connectors (Autodesk ACC, Procore, Primavera P6, Bluebeam Studio, **SharePoint**), survive offline mode, and run in Kubernetes.

## 2. Decision Drivers  

1. **Enterprise SSO** – majority of customers use Azure AD / Entra ID.  
2. **Zero-trust evidence access** – signed URLs & short-lived JWTs.  
3. **Least-privilege & auditability** – fine-grained roles, immutable logs.  
4. **Extensibility** – pluggable IdPs (Okta, Google Workspace) in 2026.  
5. **Developer velocity** – leverage OSS libs, minimal custom crypto.  
6. **Ops simplicity** – Kubernetes secrets, Vault integration, auto key-rotation.  

## 3. Considered Options  

| # | Option | Pros | Cons |
|---|--------|------|------|
| **A** | Pure session cookies (server-side) | Simple, familiar | CSRF risk, poor SPA perf, hard for mobile agents |
| **B** | JWTs signed with static HS256 secret | Stateless, fast | Key compromise = total breach; secret rotation painful |
| **C** | JWTs (RS256) + OIDC (Azure AD) + custom RBAC tables | Standards, easy key rotation (JWKS), SSO ready | Slightly higher token size, need JWKS endpoint |
| **D** | Full OAuth proxy (Keycloak) in front of API | Turn-key admin UI | Adds infra component, learning curve |
| **E** | Service Mesh mTLS only, no user auth | Strong service auth | Does not solve human SSO & RBAC |

## 4. Decision Outcome  

**We choose Option C** – **OIDC with Azure AD (PKCE)** issuing JWTs (RS256) validated by the API gateway; RBAC enforced at middleware & SQL level.

Rationale:

* Aligns with customer Microsoft ecosystems **and** future IdPs via OIDC.  
* Stateless JWTs keep APIs horizontally scalable; RS256 allows **safe key rotation via JWKS**.  
* Custom RBAC table lets us map external ACLs (e.g., SharePoint drive permissions) to Plexify roles.  
* Additional IdPs can be added with negligible code change.

Status: **Accepted** as baseline for Phase Two; Keycloak proxy remains option for self-hosted clients but **out of scope** now.

## 5. Implementation Details  

### 5.1 Authentication Flow  

1. Front-end calls `/auth/login` → redirects to Azure AD Auth Code **PKCE** flow.  
2. User consents; Plexify callback exchanges code for **access + refresh tokens** (scopes: `openid profile email` + optional Graph scopes).  
3. API gateway issues **platform JWT (RS256, 15 min)** containing:  
   * `sub` user id  
   * `roles` `[admin|pm|reviewer|viewer]`  
   * `tenant` organisation id  
   * `jti`, `iat`, `exp`  
4. Refresh token stored encrypted in Vault (_AES-256-GCM_) & rotated every 45 days.  

### 5.2 RBAC Model  

| Role | Perms | Notes |
|------|-------|-------|
| **Admin** | `*` | Org-wide settings, user invites |
| **PM** | `docs:write`, `evidence:view`, `reports:generate` | Project manager |
| **Reviewer** | `docs:read`, `evidence:view` | Agency/QA reviewer |
| **Viewer** | `docs:read` | Read-only consumer |

SQL schema:

```sql
table users        (id uuid pk, email text, tenant_id uuid, ...)
table roles        (id serial pk, name text unique)
table user_roles   (user_id uuid fk, role_id int fk)
table permissions  (id serial pk, name text unique)
table role_perms   (role_id int fk, perm_id int fk)
```

### 5.3 Enforcement  

* **API middleware** inspects Bearer JWT, verifies RS256 sig with JWKS, checks role → permission matrix.  
* **Evidence link endpoint** signs a short-lived (5 min) S3 URL **only if** caller has `evidence:view`.  
* **Frontend** hides UI paths via `<RequirePerm>` guard.  
* **Redis** caches JWT introspection for 5 min (hit ≥ 70 %).  

### 5.4 Key Management & Rotation  

* JWKS endpoint exposes current + previous keys (`kid`).  
* **Rotation cron** generates new RSA 2048 key daily; retains previous 24 h.  
* Vault handles master key storage; Dev environments use in-cluster KMS.  
* Rotation tested in CI with hot reload integration tests.  

### 5.5 Auditing & Monitoring  

* All auth events written to `auth_event` table (login, logout, failure).  
* Sentry traces login latency; Prometheus tracks `auth_failure_total`.  
* Log-based alert if 5xx on `/auth/…` > 1 % / 5 min.  

## 6. Consequences  

* **Positive** – Meets compliance (SOC2, NYC cyber) and demo guardrails; scales horizontally.  
* **Negative** – Slightly larger token size; observers must trust JWKS endpoint availability.  
* Mitigation: JWKS endpoint cached by gateway; fallback to last known key.  

## 7. References  

* [Microsoft identity platform OAuth 2.0 PKCE](https://learn.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow)  
* NIST SP-800-63B Digital Identity Guidelines  
* ADR-002-persistence.md (pending) links RBAC tables to Postgres schema  
* ADR-003-integration-pattern.md (pending) describes permission mappers for external systems  

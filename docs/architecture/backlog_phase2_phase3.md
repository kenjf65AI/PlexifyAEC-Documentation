---
title: "Backlog – Phase 2 & Phase 3 System Tasks"
description: "Detailed ticket plan for Production Foundation (Q3 2025) and Integration Expansion (Q4 2025) with SharePoint focus."
owner: "Engineering PMO"
version: "1.0.0"
created: "2025-08-13"
updated: "2025-08-13"
status: "draft"
tags: [backlog, phase2, phase3, sharepoint, integrations, auth, rbac, persistence]
---

# Legend

| Field | Purpose |
|-------|---------|
| **ID** | Permanent ticket key (e.g. `PH2-AUTH-01`) |
| **Story** | INVEST-style user story |
| **Details** | Business/tech context |
| **DoD** | Definition of Done checklist |
| **Test Strategy** | Unit / Integration / e2e |
| **Dependencies** | Blocking links |
| **Labels** | JIRA/GH labels |

---

# Phase 2 – Production Foundation (Q3 2025)

## Epic E-2.1 AuthN & RBAC

| ID | Story | Details | DoD | Test Strategy | Dependencies | Labels |
|----|-------|---------|-----|---------------|--------------|--------|
| **PH2-AUTH-01** | *As an org admin, I invite a new user so that they can sign in via SSO.* | Implement OIDC (Azure AD) with PKCE. | ‑ OIDC flow completes (login → callback).<br>- Refresh token stored encrypted.<br>- Audit log entry created. | Unit: token util (100%).<br>Int: mock-IdP.<br>e2e: Cypress sign-in. | None | `auth` `backend` |
| **PH2-AUTH-02** | *As a PM, I need role-based access so that evidence links respect permissions.* | RBAC roles Admin, PM, Reviewer, Viewer. | ‑ Roles table migrated.<br>- `/evidence/:id` returns 403 if role lacks `evidence:view`.<br>- Postman collection passes. | RBAC policy unit tests.<br>Integration: evidence endpoint. | PH2-AUTH-01 | `auth` `rbac` |
| **PH2-AUTH-03** | *As DevOps, I want rotating signing keys so that JWTs remain secure.* | JWKS endpoint, key rotation cron. | ‑ Keys rotate daily.<br>- Old keys valid for 12 h. | Unit: signer util.<br>Chaos: rotate during load. | PH2-AUTH-01 | `security` |

## Epic E-2.2 Persistence Layer

| ID | Story | Details | DoD | Test Strategy | Dependencies | Labels |
|----|-------|---------|-----|---------------|--------------|--------|
| **PH2-DB-01** | *As a dev, I persist chat history in Postgres so users see past messages after logout.* | Schema: `conversations`, `messages`.| ‑ Liquibase migration applied.<br>- LocalStorage code removed.<br>- p95 read <60 ms. | Unit: repo layer.<br>Load test: 10 k msgs. | none | `db` `backend` |
| **PH2-DB-02** | *As an engineer, I cache compliance lookups for <50 ms reads.* | Redis LRU cache. | ‑ Cache hit ratio ≥70 %. | Unit: cache util.<br>Bench: k6. | PH2-DB-01 | `cache` |

## Epic E-2.3 API Gateway v1

| ID | Story | Details | DoD | Test Strategy | Dependencies | Labels |
|----|-------|---------|-----|---------------|--------------|--------|
| **PH2-API-01** | *As an integrator, I query `/v1/documents` to list project docs.* | OpenAPI spec section. | ‑ Returns paginated list.<br>- 95 % unit coverage. | Contract tests with Prism. | PH2-DB-01 | `api` |
| **PH2-API-02** | *As a reviewer, I GET `/v1/evidence/:id` to retrieve secured evidence.* | Requires JWT & role. | ‑ 403 without scope.<br>- 200 with signed URL. | Security tests (zap). | PH2-AUTH-02 | `api` `security` |

## Epic E-2.4 CI/CD

| ID | Story | Details | DoD | Test Strategy | Dependencies | Labels |
|----|-------|---------|-----|---------------|--------------|--------|
| **PH2-CI-01** | *As a dev, PRs run lint+typecheck.* | ESLint, TypeScript strict. | Green pipeline on PR. | GH Actions matrix. | none | `devops` |
| **PH2-CI-02** | *As a release mgr, merge to main auto-deploys to staging.* | Docker + Helm chart. | Artifact pushed, Helm rollout complete ≤10 min. | ArgoCD sync test. | PH2-CI-01 | `devops` |

---

# Phase 3 – Integration Expansion (Q4 2025)

## Epic E-3.1 Connector SDK Upgrade

| ID | Story | DoD (key) | Test Strategy | Deps |
|----|-------|-----------|---------------|------|
| **PH3-SDK-01** | *As a connector dev, I scaffold a new integration in <30 min.* | `cli plexify connector create sharepoint` generates typed client, tests. | Snapshot tests for template files. | PH2-API-01 |

## Epic E-3.2 Microsoft SharePoint Integration

| ID | Story | Details | DoD | Test Strategy | Dependencies | Labels |
|----|-------|---------|-----|---------------|--------------|--------|
| **SP-AUTH-01** | *As an admin, I connect SharePoint using Microsoft OAuth.* | Graph scopes: `Files.ReadWrite.All`, `Sites.Read.All`, `offline_access`. | ‑ OAuth dance completes.<br>- Refresh stored encrypted in Vault.<br>- Token refresh auto. | Unit: auth flow mocks.<br>e2e: Cypress connect. | PH3-SDK-01 | `sharepoint` `auth` |
| **SP-SYNC-01** | *As a user, my SharePoint docs appear in Plexify within 5 min.* | Delta queries + initial backfill. | ‑ Backfill ≤10 k items <4 h.<br>- Incremental <2 min. | Contract tests using mocked Graph `/delta`, `/subscr`. | SP-AUTH-01 | `sharepoint` `sync` |
| **SP-WEBHOOK-01** | *System receives change notifications in <30 s.* | Graph subscriptions. | ‑ Notification 95th ≤30 s.<br>- Replay logic for missed events. | Integration test with ngrok. | SP-AUTH-01 | `sharepoint` `webhook` |
| **SP-ACL-01** | *User permissions mirror SharePoint ACL.* | RBAC mapper. | ‑ ACL sync job.<br>- Evidence link fails if revoked. | Unit ACL diff test.<br>Selenium UI perms check. | SP-SYNC-01, PH2-AUTH-02 | `sharepoint` `rbac` |
| **SP-ERROR-01** | *System gracefully handles Graph 429.* | Retry w/back-off. | ‑ No data loss in chaos (15 min throttle). | K6 + fault-injection. | SP-SYNC-01 | `sharepoint` `resilience` |
| **SP-TEST-01** | *As QA, I run contract & e2e suites for SharePoint.* | Pact tests, Postman, Cypress. | ‑ 95 % lines covered.<br>- CI time <5 min. | SP-SYNC-01 | `qa` `sharepoint` |

## Epic E-3.3 Other Connectors Parity

List similar tasks for ACC, Procore, P6, Bluebeam (not expanded here for brevity).

---

# Test Strategy Overview

| Layer | Tool | Goal |
|-------|------|------|
| **Unit** | Jest, ts-jest | ≥95 % critical logic |
| **Contract** | Pact / Prism | Spec compliance |
| **Integration** | Supertest, TestContainers | DB & external APIs |
| **e2e** | Cypress | UI + OAuth flows |
| **Load** | k6 | Perf & resiliency |

---

# Dependencies Matrix

* **PH2-AUTH** precedes **SP-ACL**  
* **SDK upgrade (PH3-SDK-01)** blocks all new connectors  
* CI/CD pipeline must run before staging demos  

---

# Definition of Done Checklist (global)

- [ ] Code merged to `main` with 2 PR approvals  
- [ ] Unit + integration + contract tests green  
- [ ] Lint, typecheck, security scan pass  
- [ ] Updated ADR & OpenAPI docs  
- [ ] Feature toggle added and documented  
- [ ] Monitoring/alerting dashboards updated  

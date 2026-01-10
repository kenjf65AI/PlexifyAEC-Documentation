---
adr: "003"
title: "External Integrations Pattern"
status: "accepted"
date: "2025-08-13"
deciders:
  - "Architecture Guild"
  - "Integration Lead"
  - "DevOps Lead"
tags: ["integrations", "connector-sdk", "gateway", "sharepoint", "phase-3"]
---

## 1 Context  

PlexifyAEC must **ingest, version, and cross-link documents** residing in a variety of construction-industry systems:

* Autodesk **ACC/BIM 360**
* **Procore** Construction Platform  
* Oracle **Primavera P6**
* **Bluebeam Studio**
* Microsoft **SharePoint** (new in Phase III)

Phase One demo used _mock JSON_ APIs.  
Phase Two+ require a production-grade pattern that:

1. Delivers *feature parity* across connectors (OAuth, CRUD, versions, webhooks, delta sync).  
2. Enforces **security, rate-limit resilience, audit logging** consistently.  
3. Scales horizontally ( ≥ 1 M files / project) without duplicating boilerplate code.  
4. Enables independent connector teams to ship safely under the same CI/CD pipeline.

## 2 Decision Drivers  

| Driver | Rationale |
|--------|-----------|
| **Consistency** | Identical developer & user experience across platforms. |
| **Fault Isolation** | Failure in one connector must **not** impact others. |
| **Extensibility** | New platforms (e.g., Box, Egnyte) pluggable in <2 sprints. |
| **Security** | Centralised OAuth secret handling, token vaulting, RBAC mapping. |
| **Observability** | Uniform metrics (`sync_latency`, `rate_limit_hits`). |
| **Testability** | Contract tests & stub servers per connector. |

## 3 Considered Options  

| # | Option | Pros | Cons |
|---|--------|------|------|
| **A** | **Point-to-point** logic in each micro-service | Simple for 1-2 systems | Code duplication, exploding services, uneven behaviour |
| **B** | **Monolithic Integration Service** | Single code-base, fewer deploys | Risky blast-radius, long build times, language lock-in |
| **C** | **Event-driven Hub (Kafka)** with per-system adapters | Asynchronous, decoupled | Added infra, slower initial simplicity, complex ordering |
| **D** | **Connector SDK + Integration Gateway** (Facade) | Code reuse, isolation, same API surface, language flexibility | Needs solid SDK design & versioning |

## 4 Decision Outcome  

**Adopt Option D: “Connector SDK + Integration Gateway”.**

*Each connector is a self-contained package implementing a typed interface provided by the SDK.  
The Integration Gateway exposes uniform REST endpoints and schedules each connector’s sync jobs.*  

Why:

* **Reusable primitives** (OAuth helpers, rate-limit back-off, webhook validator).  
* **Isolation** – a bad delta token in SharePoint restarts only that worker pod.  
* **Incremental rollout** – existing ACC/Procore logic migrates gradually.  
* Enables **language choice** (TypeScript primary; Python ML plugins later).  

Status: **Accepted** for Phase III and forward.

## 5 Implementation Details  

### 5.1 Repository & Package Layout  

```
src/
  integrations/
    _sdk/
      auth/
      http_client.ts
      rate_limiter.ts
      sync_engine.ts
      types.ts
    acc/
      auth.ts
      drive_client.ts
      sync_service.ts
    procore/
      ...
    sharepoint/
      auth.ts
      graph_client.ts
      documents_api.ts
      webhook_handler.ts
      sync_service.ts
      permissions_mapper.ts
```

* **`_sdk`** – shared abstractions:
  * `Connector` interface → `connect()`, `sync()`, `webhook()`.
  * `SyncEngine` orchestrates back-fill + delta + conflict resolution.
  * Built-in instrumentation wrapper exports Prometheus metrics.

### 5.2 Integration Gateway  

* Fastify API deployed as **`integration-gateway`** service.  
* Routes `/integrations/:system/*` delegate to respective connector.  
* Side-car **bullmq** worker pool executes scheduled sync jobs.  
* Publishes domain events (`document.synced`, `permission.updated`) to NATS.

### 5.3 Shared Concerns  

| Concern | SDK Module | Note |
|---------|------------|------|
| OAuth / token refresh | `auth/oauth2.ts` | Supports PKCE & client-secret flows |
| Rate-limit resilience | `rate_limiter.ts` | Token bucket + adaptive sleep |
| Error taxonomy | `errors.ts` | Maps external codes → `IntegrationError` |
| RBAC mapping | `permissions.ts` | Converts external ACL → Plexify roles |
| Telemetry | `observability.ts` | `integration_requests_total`, `sync_duration_seconds` |

### 5.4 Versioning & Compatibility  

* **SemVer** packages per connector (`@plexifyacc/sharepoint@1.x`).  
* *Compatibility matrix* in docs (`connector_version` ↔ API version).  
* Deprecation policy: ≥ 1 minor version overlap.

### 5.5 Testing Strategy  

* **Connector contract tests** run via **Pact** against mock servers.  
* **End-to-end smoke** (`make e2e`) boots local gateway + TestContainers for Postgres & Redis.  
* **Chaos suite** injects 429/5xx & network latency; check retry logic.  

### 5.6 Deployment & Ops  

* Each connector packaged as Docker image; chart displays **HPA** rules on CPU + `rate_limit_hits`.  
* Feature flags (`CONNECTOR_SHAREPOINT_ENABLED=true`) gate rollout.  
* Alerting: if `sync_error_rate >2%` for 10 min, page on-call.

## 6 Consequences  

* **Positive** – Uniform developer experience, risk containment, fast onboarding of SharePoint and future systems.  
* **Trade-off** – Slight startup complexity (SDK maintenance); gateway adds one hop latency (~3 ms p95).  

## 7 Follow-ups  

1. Migrate existing ACC connector to SDK (ticket **PH3-SDK-02**).  
2. Draft performance benchmark doc (`BENCH-001`) once three connectors live.  
3. Investigate plugin mechanism for serverless ingest (Phase IV).  

---

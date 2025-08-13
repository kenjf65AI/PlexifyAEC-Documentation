---
adr: "002"
title: "Persistence Strategy – Database & Caching"
status: "accepted"
date: "2025-08-13"
deciders: ["Architecture Guild", "Platform Lead", "Data Engineering"]
tags: ["persistence", "database", "cache", "postgres", "redis", "phase-2"]
---

## 1 Context  

Phase One stored UI state in **localStorage** with mock JSON.  
Phase Two must support:

* **Multi-tenant data durability** (projects, documents, evidence, chat).  
* **Transactional integrity** for compliance evidence & audit trail.  
* Sub-second lookup of compliance matrices & permissions.  
* Seamless migration to future **multi-project tenancy** (Phase IV).  

The stack will run in Kubernetes, with GitHub Actions CI/CD and AWS as primary cloud (RDS & ElastiCache).

## 2 Decision Drivers  

1. **Relational consistency** – evidence ↔ document ↔ regulation mapping.  
2. **Query flexibility** – complex joins & JSONB search on metadata.  
3. **Horizontal read scaling** – dashboards & report generation.  
4. **Operational familiarity** – team experience with Postgres/Redis.  
5. **Open-source & cloud-managed offerings** to minimise ops toil.  
6. **Strong ecosystem** – tooling for migrations, observability, backups.  

## 3 Considered Options  

| # | Option | Pros | Cons |
|---|--------|------|------|
| **A** | Postgres (RDS) + Redis (ElastiCache) | ACID, rich SQL/JSONB, mature fail-over; Redis <1 ms cache; managed services | Dual infra to operate; eventual cache invalidation issues |
| **B** | MongoDB Atlas only | Flexible, single tech, built-in change streams | Joins via $lookup (perf); requires extra ACID config; team learning curve |
| **C** | DynamoDB + DAX | Serverless scaling, pay-per-request | Complex data modelling; multi-key queries + joins painful; latency variance |
| **D** | CockroachDB + built-in KV cache | Distributed SQL, single layer | Higher ops complexity; still maturing feature set; cost |
| **E** | MySQL + Memcached | Familiar LAMP style | JSON querying weaker; Memcached lacks persistence & pub/sub |

## 4 Decision Outcome  

We **select Option A: Postgres (AWS RDS) for primary store plus Redis (AWS ElastiCache) for read-through caching & pub/sub.**

* Postgres provides relational integrity, JSONB for semi-structured metadata, and powerful full-text search.  
* Redis delivers sub-10 ms access for hot look-ups (RBAC rules, compliance matrices, JWT introspection).  
* Both are battle-tested, cloud-managed, fit current skill set, and integrate with Liquibase & RediSearch.

Status: **Accepted** for Phases II–IV; revisit in Phase V for sharding/partitioning.

## 5 Implementation Details  

### 5.1 Database Schema (v0.1)

* `projects(id uuid, name, tenant_id, created_at)`  
* `documents(id uuid, project_id, source_system, type, status, size, metadata jsonb, ...)`  
* `evidence(id uuid, document_id, regulation_id, location jsonb, created_at)`  
* `users(id uuid, email, tenant_id)` — ties into ADR-001 RBAC tables  
* `sharepoint_files(...)` — per SharePoint spec (§9)  
* Liquibase migration scripts version-controlled `/db/migrations`.

### 5.2 Caching Pattern  

* **Read-through**: API checks Redis → fallback Postgres → populate Redis (TTL = 5 min).  
* **Write-invalidate**: After DB update, publish `cache_invalidate:{key}` on Redis channel; side-cars evict.  
* Data groups & TTLs  
  | Key Pattern | TTL | Notes |  
  |-------------|-----|-------|  
  | `rbac:user:{id}` | 5 min | Roles & perms |  
  | `compliance:matrix:{reg}` | 60 min | Chapter 33 JSON |  
  | `doc:meta:{id}` | 10 min | Document metadata |  

### 5.3 Migrations & Rollbacks  

* **Liquibase** with tagged change-sets; auto-applied by Init Container.  
* Rollback via Liquibase `rollbackCount`.  
* Non-destructive schema evolution: JSONB columns for forward compatibility.

### 5.4 Back-ups & DR  

* RDS automated snapshots 15 min; PITR 7 days.  
* Redis configured with Multi-AZ replication; daily persistence (AOF).  
* Disaster recovery runbook covers cross-region restore in <2 h.

### 5.5 Observability  

* pg_stat_monitor → Grafana dashboard (`db_latency_p95`, `deadlocks`).  
* Redis INFO metrics → Grafana (`hit_rate`, `memory_usage`).  
* Slow query log threshold 200 ms; Sentry traces DB spans.

## 6 Consequences & Risks  

| Consequence | Impact |
|-------------|--------|
| Operational double-stack | Requires coordinated version upgrades & monitoring for two systems. |
| Cache consistency | Risk of stale data → mitigated by short TTL + pub/sub invalidation. |
| Cost | Managed Postgres + Redis clusters incur extra cost vs single DB; justified by performance SLA. |

## 7 Follow-ups  

* Implement **Liquibase guard CI** (PH2-DB-01).  
* Write integration tests with **TestContainers-Postgres + TestContainers-Redis**.  
* Evaluate **Citus** or read replicas for Phase IV scale.

---

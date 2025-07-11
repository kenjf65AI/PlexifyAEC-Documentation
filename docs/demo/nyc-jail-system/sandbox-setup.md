---
title: "Sandbox Setup – NYC Borough-Based Jail System Demo"
description: "Step-by-step guide to prepare a PlexifyAEC sandbox with BIM models, RFIs, and schedules for the 07/25/2025 demonstration."
author: "Ken D’Amato"
created: "2025-07-04"
updated: "2025-07-04"
version: "1.0.0"
status: "draft"
tags: ["demo","sandbox","setup","nyc-jail-system"]
---

# 1. Purpose  
Establish a **self-contained sandbox** that mirrors the document complexity of the NYC Borough-Based Jail System so we can reliably demo AI-powered intake, compliance checks, and report generation.

---

# 2. Prerequisites  

| Item | Details |
|------|---------|
| Factory.ai Org | `plexify-aec-demo` (or personal workspace with Droid Mode) |
| PlexifyAEC Build | `v0.5.0-demo` container image |
| Sample Dataset | Located in `./assets/nyc-jail-system-dataset.zip` |
| Autodesk ACC Sandbox | Project: **BBJ_Demo_2025** |
| Bluebeam Studio Sandbox | Session: **BBJ_Demo_Review** |
| Primavera P6 Sandbox | DB alias: **P6_BBJ_SANDBOX** |
| Credentials File | `.env.demo` populated per step 2.3 |

---

# 3. High-Level Workflow  

1. **Create Demo Project** in PlexifyAEC  
2. **Import Documents** (BIM, RFIs, Schedules)  
3. **Configure Integrations** (ACC, Bluebeam, P6)  
4. **Activate & Tune AI Agents**  
5. **Validate** with checklist  

---

# 4. Detailed Setup  

## 4.1  Create Demo Project  

1. Sign in to PlexifyAEC → *Projects* → **New Project**.  
2. Name: `NYC Borough-Based Jail – Demo`.  
3. Select Template: **Regulated Civic Infrastructure**.  
4. Roles:  

| Role | User |
|------|------|
| Product Owner | you@example.com |
| Demo Engineer | demo.engineer@example.com |
| Compliance Reviewer | compliance@example.com |

> Tip: Additional observers can be added later for live demo attendees.

---

## 4.2  Import Construction Documents  

### 4.2.1  BIM Models  

| Model | File | Upload Method | Tags |
|-------|------|---------------|------|
| Architectural | `BBJ_ARCH_v1.rvt` | Autodesk ACC sync | `discipline:arch` |
| Structural | `BBJ_STRUCT_v1.rvt` | Autodesk ACC sync | `discipline:struct` |
| MEP | `BBJ_MEP_v1.rvt` | Autodesk ACC sync | `discipline:mep` |

**Steps**  
1. Unzip dataset → `models/`.  
2. In PlexifyAEC UI: *Documents ▸ BIM Models ▸ Upload via ACC*.  
3. Follow OAuth flow; pick **BBJ_Demo_2025** project folder `/Shared/BIM`.  
4. Confirm each model is auto-classified and receives a unique **Doc-ID**.

### 4.2.2  RFIs  

Dataset file: `rfis/bbj_rfis_demo.csv`  

1. Navigate *Documents ▸ RFIs ▸ Bulk Import*.  
2. Upload CSV; map columns: `rfi_number`, `title`, `question`, `discipline`.  
3. The **RFI Triage Agent** triggers automatically, adding `status:pending-review`.

### 4.2.3  Schedules  

File: `schedules/bbj_baseline_plus_delay.xml` (Primavera P6 export)  

1. *Integrations ▸ Primavera P6 ▸ Import Schedule*.  
2. Select **P6_BBJ_SANDBOX** → choose XML file.  
3. System creates schedule version `v1.1-delay`, tagged `scenario:steel-delay`.

---

## 4.3  Configure Integrations  

### 4.3.1  Autodesk ACC  

| Field | Value |
|-------|-------|
| Client ID | `ACC_DEMO_CLIENT_ID` |
| Client Secret | `ACC_DEMO_SECRET` |
| Project ID | Auto-filled after OAuth |

Execute in terminal (optional CLI):

```bash
plexify cli integrations add acc \
  --client-id $ACC_ID \
  --client-secret $ACC_SECRET \
  --project BBJ_Demo_2025
```

### 4.3.2  Bluebeam Studio  

1. Generate Dev API token in Studio sandbox.  
2. *Integrations ▸ Bluebeam ▸ Connect*, paste token.  
3. Map Session `BBJ_Demo_Review` to PlexifyAEC folder `Reviews/2025_Q3`.

### 4.3.3  Primavera P6  

Fill `.env.demo`:

```
P6_URL=https://sandbox.p6.oracle.com
P6_USERNAME=demo_user
P6_PASSWORD=•••••
P6_DATABASE=P6_BBJ_SANDBOX
```

Run:

```bash
plexify cli integrations add p6 --env .env.demo
```

---

## 4.4  Activate AI Agents  

| Agent | Purpose | Config |
|-------|---------|--------|
| **Document Intake Agent** | Auto-classify & tag docs | Confidence ≥ 0.8 |
| **Trust-Oriented Lead Agent** | Compliance mapping | Matrix: `nyc_building_code.json` |
| **RFI Triage Agent** | Categorise & draft responses | Response tone: `formal` |
| **Schedule Optimiser Agent** | Detect delays & suggest fixes | Threshold: ≥ 3 days slip |
| **Report Generator Agent** | Produce PM & Inspection reports | Template: `report-template.md` |

Steps:  
1. *AI Agents ▸ Library* → toggle required agents **On** for this project.  
2. Click each agent → *Settings* → apply config above.  
3. Save & **Run Test** → ensure green status.

---

## 4.5  Validation Checklist  

| Item | Pass? |
|------|-------|
| All three BIM models appear under *BIM Models* with correct tags | ☐ |
| 25 RFIs imported, statuses `pending-review` | ☐ |
| Schedule version `v1.1-delay` visible in *Schedules* | ☐ |
| ACC, Bluebeam, and P6 integrations show *Connected* | ☐ |
| Test run of **Document Intake Agent** processed 50 docs in <30 s | ☐ |
| Compliance gaps list populates (expect 3 CEQR flags) | ☐ |
| PM report generated under 60 s & downloadable | ☐ |
| Chapter 33 Inspection report references BIM model IDs | ☐ |

Mark all items ✅ before live demo.

---

# 5. Troubleshooting  

| Symptom | Resolution |
|---------|------------|
| BIM upload hangs | Verify ACC OAuth token not expired; re-authenticate |
| RFIs missing fields | Check CSV mapping; `rfi_number` must be unique |
| P6 import fails | Ensure XML exported with **XER & XML** option enabled |
| Agent “stuck in queue” | Confirm project has at least `Small` compute plan; scale if needed |
| Compliance flags empty | Validate `nyc_building_code.json` matrix is attached to project |

---

# 6. Next Steps  

Proceed to:

* [`demo-flows/design-change-workflow.md`](demo-flows/design-change-workflow.md)  
* [`demo-flows/rfi-management.md`](demo-flows/rfi-management.md)  
* [`demo-flows/schedule-optimization.md`](demo-flows/schedule-optimization.md)  

for click-through scripts used during the live presentation.

*Happy building & demoing!*  

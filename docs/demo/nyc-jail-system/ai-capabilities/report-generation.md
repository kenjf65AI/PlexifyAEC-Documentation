---
title: "AI Report Generation – NYC Borough-Based Jail System Demo"
description: "How PlexifyAEC’s Report Generator Agent assembles Project Management and Inspection/Audit reports with embedded NYC regulatory evidence."
author: "Ken D’Amato"
created: "2025-07-04"
updated: "2025-07-04"
version: "1.0.0"
status: "draft"
tags: ["demo","ai-capabilities","report-generation","nyc-jail-system","compliance"]
related:
  - path: "../regulatory-framework.md"
    relationship: "references"
  - path: "../document-types.md"
    relationship: "references"
---

# 1  Overview
The **Report Generator Agent (RGA)** is the final synthesiser in PlexifyAEC’s agentic mesh.  
For the NYC Borough-Based Jail System demo it automatically crafts:

1. **Project Management (PM) Reports** – executive-level snapshots of schedule, cost, risk, and M/WBE KPIs.  
2. **Inspection / Audit Reports** – regulation-centric documents (e.g., Chapter 33 Site Safety, CEQR environmental compliance) ready for DOB/DOC submission.

Every report contains **traceable evidence links** (Doc-ID + page/element refs) so reviewers can drill down to primary sources without leaving the report.

# 2  Agent Workflow

| Step | Agent | Purpose | Output |
|------|-------|---------|--------|
| 1 | **Trigger Listener** | Detects user command, schedule, or rule breach | Report job token |
| 2 | **Data Aggregator Agent** | Pulls structured data (schedules, KPIs) & unstructured docs via `Doc-ID` list | Normalised JSON bundle |
| 3 | **Compliance Mapper (Trust Lead)** | Matches bundle to relevant regs (see R-01…R-07) | Evidence matrix with pass/fail flags |
| 4 | **Narrative Composer** | Uses LLM to generate prose, tables, charts | Markdown + chart JSON |
| 5 | **Formatter & Exporter** | Applies template (`report-template.md`) → renders to PDF/JSON/HTML | Multi-format artefacts |
| 6 | **Audit Logger** | Saves agent decisions, prompts, and sources | Immutable log entry |

> Average generation time in sandbox: **41 s** for 25 RFIs + 2 schedules + 3 BIM models.

# 3  Report Types & Sections

## 3.1 Project Management Report  
**Audience:** Owner’s rep, GC PM, City executives  
**Template Sections**

| § | Section | Source Agents |
|---|---------|---------------|
| 1 | Executive Summary | Narrative Composer |
| 2 | Schedule Variance (Gantt excerpt) | Schedule Optimiser |
| 3 | Cost & Change Orders | Data Aggregator |
| 4 | RFI Status Snapshot | RFI Triage |
| 5 | Risk & Mitigation Matrix | Compliance & Risk Agents |
| 6 | M/WBE Participation | Compliance Mapper |
| 7 | Upcoming Milestones | Schedule Optimiser |
| 8 | Evidence Appendix (hyperlinks) | Formatter |

## 3.2 Inspection / Audit Report  
**Audience:** DOB inspectors, Safety managers, Environmental reviewers  
**Template Sections**

| § | Section | Key Regulations |
|---|---------|-----------------|
| 1 | Compliance Overview | R-01 – R-07 |
| 2 | Chapter 33 Safety Checklist | R-03 |
| 3 | CEQR Mitigation Status | R-02 |
| 4 | Accessibility Findings | R-04 |
| 5 | Photo Log & BIM Location Map | Image Tagger |
| 6 | Non-conformance & Corrective Actions | Trust Lead |
| 7 | Sign-off & Certification | DocuSign API (stub) |
| 8 | Evidence Appendix | All |

# 4  Regulatory Evidence Inclusion

* Each compliance rule produces an **evidence tuple**:  
  `{"reg_id":"R-03","doc_id":"DOC-3308-002","page":4,"confidence":0.93}`
* The formatter converts tuples into endnotes & clickable anchors.
* Evidence packages are exported as ZIP (PDF report + CSV matrix + source docs).

# 5  Demo-Day Functionality

| Action | Presenter Flow | Visible Outcome |
|--------|----------------|-----------------|
| **Generate PM Report** | Type natural language command: “/report PM weekly” | Progress bar → PDF opens with coloured KPI gauges |
| **Drill-down Evidence** | Click CEQR flag | Side-panel shows EIS PDF p. 112 highlighted |
| **Generate Inspection Report** | Click *Inspection → Chapter 33* | Checklist auto-filled, photo thumbnails embedded |
| **Verify Audit Trail** | Open *Agent Log* | JSON showing prompt chain & doc references |

Timing script (for 10-min slot):

1. 00:00-01:00  Intro & goal  
2. 01:00-03:00  Upload missing daily reports (simulate)  
3. 03:00-05:30  Run PM report, navigate insights  
4. 05:30-08:00  Trigger Inspection report, show compliance flags  
5. 08:00-10:00  Q&A + call-to-action

# 6  Technical Specifications

| Parameter | Value |
|-----------|-------|
| LLM Model | GPT-4o (Factory.ai tier) |
| Token Budget | 8 k context, 4 k output |
| Template Engine | Jinja2 |
| Export Formats | PDF (wkhtmltopdf), HTML, JSON |
| Security | Evidence links respect RBAC; redacted view for public release |

# 7  Current Limitations & Roadmap

* **Multilingual narrative** limited to EN/ES; additional locales planned Q4.  
* BIM screenshot generation uses static camera presets; dynamic view selection in progress.  
* DocuSign integration stubbed for demo; full e-signature workflow slated Q3.  

---

*Prepared for the 07/25/2025 demonstration – iterate, review, and mark status **approved** once validated in sandbox.*

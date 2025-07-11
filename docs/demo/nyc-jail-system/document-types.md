---
title: "Document Types – NYC Borough-Based Jail System Demo Sandbox"
description: "Comprehensive list of construction document types included in the sandbox, the information PlexifyAEC AI agents extract, and their role in demo workflows."
author: "Ken D’Amato"
created: "2025-07-04"
updated: "2025-07-04"
version: "1.0.0"
status: "draft"
tags: ["demo","document-types","nyc-jail-system","ai-extraction"]
---

# Overview  
This reference lists **all document types pre-loaded into the NYC Borough-Based Jail System sandbox**.  
For each type we describe:

* **Purpose** – why it exists in real projects  
* **Key AI Extractions** – fields/insights PlexifyAEC agents target  
* **Demo Workflows** – where it is showcased (Design Change 🖉, RFI 📋, Schedule Opt ⏱, Reports 📑)  

Legend: 🖉 Design Change Workflow 📋 RFI Management ⏱ Schedule Optimisation 📑 PM / Inspection Reports  

---

## 1. Design & Planning Documents  

| Document Type | Purpose | Key AI Extractions | Workflows |
|---------------|---------|--------------------|-----------|
| **Architectural BIM Model (.rvt)** | 3-D representation of detention facility layout | • Element IDs<br>• Room names / areas<br>• Accessibility features<br>• Revision history | 🖉 📑 |
| **Structural BIM Model (.rvt)** | Structural framework (beams, columns, foundations) | • Load-bearing elements<br>• Material specs<br>• Clash locations vs MEP | 🖉 📑 |
| **MEP BIM Model (.rvt)** | Mechanical, Electrical & Plumbing systems | • Equipment schedules<br>• Routing conflicts<br>• Utility connection points | 🖉 📑 |
| **Civil / Site Plan (Civil 3D)** | Site grading, utilities, setbacks | • Utility corridors<br>• Parcel boundaries<br>• Zoning overlays | 🖉 |
| **Design Specifications (PDF/Docx)** | Performance & material standards | • Section numbers<br>• Material requirements<br>• Reference standards (ASTM, UL) | 📋 📑 |
| **Design Change Bulletin (PDF)** | Formal change to issued drawings | • Bulletin ID / date<br>• Affected sheets<br>• Change description | 🖉 📋 |

---

## 2. Construction Phase Documents  

| Document Type | Purpose | Key AI Extractions | Workflows |
|---------------|---------|--------------------|-----------|
| **Request for Information (RFI) (CSV/PDF)** | Clarify design ambiguities | • RFI number / status<br>• Question text<br>• Referenced drawing sheets<br>• Required response date | 📋 📑 |
| **Submittals (PDF)** | Product data & shop drawings for approval | • Submittal ID<br>• Spec section<br>• Approval status | 📋 |
| **Daily Field Report (PDF)** | Day-to-day site activity log | • Man-hours<br>• Weather<br>• Safety incidents<br>• Work completed | 📑 |
| **Change Order (PDF)** | Contract cost/time modification | • CO number<br>• Cost impact<br>• Schedule impact days | 📑 ⏱ |
| **Inspection Photos (JPEG)** | Visual evidence for quality/safety | • EXIF timestamp<br>• Location tags<br>• Safety compliance cues (PPE) | 📑 |

---

## 3. Regulatory & Compliance Documents  

| Document Type | Purpose | Key AI Extractions | Workflows |
|---------------|---------|--------------------|-----------|
| **NYC Building Permit (PDF)** | Official approval to build | • Permit number<br>• Issuing agency<br>• Expiry date | 📑 |
| **Chapter 33 Safety Plan (PDF)** | Site safety measures during construction | • Plan revision<br>• Responsible safety manager<br>• High-risk activities list | 📑 |
| **CEQR Environmental Impact Statement (EIS)** | Environmental compliance record | • Impact categories<br>• Mitigation measures<br>• Monitoring schedule | 📑 |
| **Zoning Resolution Approval Letter (PDF)** | Confirms zoning compliance | • Special permit ref.<br>• FAR limits<br>• Parking/loading provisions | 🖉 📑 |
| **M/WBE Participation Report (XLSX)** | Minority/Women business tracking | • Vendor list<br>• Contract values<br>• Participation % vs goal | 📑 |

---

## 4. Scheduling & Cost Documents  

| Document Type | Purpose | Key AI Extractions | Workflows |
|---------------|---------|--------------------|-----------|
| **Primavera P6 Baseline Schedule (.xml)** | Original critical path | • Activity IDs<br>• Durations & relationships<br>• Critical path | ⏱ 📑 |
| **Updated Schedule – Steel Delay (.xml)** | Scenario with material delay | • Affected activities<br>• Float erosion<br>• Predicted completion date shift | ⏱ 📑 |
| **Bill of Quantities (BoQ) (XLSX)** | Itemised materials & costs | • Line items<br>• Unit rates<br>• Cost totals | 📑 |
| **Resource Histogram (PDF)** | Labour/equipment demand curve | • Peak resources<br>• Trade breakdown | ⏱ |

---

## 5. Ancillary / Administrative Documents  

| Document Type | Purpose | Key AI Extractions | Workflows |
|---------------|---------|--------------------|-----------|
| **Design-Build Contract (PDF)** | Legal agreement incl. KPIs | • Milestone dates<br>• Liquidated damages<br>• Payment terms | 📑 |
| **Insurance Certificate (PDF)** | Proof of coverage | • Policy number<br>• Coverage limits<br>• Expiry | 📑 |
| **Meeting Minutes (Docx)** | Decisions & action items | • Attendees<br>• Assigned actions<br>• Due dates | 📑 |

---

## 6. AI Extraction Map (Quick Reference)  

| AI Agent | Primary Document Feeds | Key Outputs |
|----------|------------------------|-------------|
| **Document Intake Agent** | All docs | Classification tags, versioning, metadata |
| **RFI Triage Agent** | RFIs, Spec sections | RFI category, draft answer suggestion |
| **Compliance (Trust) Agent** | Permits, Safety & EIS docs, Zoning letters | Regulation mapping, gap flags |
| **Schedule Optimiser Agent** | Baseline & updated schedules, Change Orders | Delay analysis, mitigation scenarios |
| **Report Generator Agent** | Aggregated outputs above | PM status report, Inspection audit report |

---

## 7. Relationship to Demo Workflows  

1. **Design Change Workflow 🖉**  
   *BIM models + Design Change Bulletin + Zoning Letter* → AI validates zoning & accessibility impacts → updates schedule.

2. **RFI Management 📋**  
   *RFIs + Specs + BIM snippets* → AI extracts answers, proposes response → logs to RFI register.

3. **Schedule Optimisation ⏱**  
   *Baseline vs Delay Schedule + Change Orders* → AI recalculates critical path → suggests recovery plan.

4. **PM & Inspection Reports 📑**  
   *All above docs + Compliance records* → AI compiles executive PM report and Chapter 33 Inspection report with evidence links.

---

### Keep this file current  
Add new document types or fields as sandbox evolves. Update **tags** and **AI extraction targets** so Factory.ai Droids stay in sync with real project needs.

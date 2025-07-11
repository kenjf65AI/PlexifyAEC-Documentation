---
title: "Regulatory Framework – NYC Borough-Based Jail System Demo"
description: "Key New York City regulations addressed by PlexifyAEC during the July 25 2025 demonstration and how AI agents verify compliance."
author: "Ken D’Amato"
created: "2025-07-04"
updated: "2025-07-04"
version: "1.0.0"
status: "draft"
tags: ["demo","regulations","compliance","nyc-jail-system"]
---

# 1  Overview  
The Borough-Based Jail program is subject to one of the most demanding regulatory landscapes in U.S. construction. PlexifyAEC’s **Trust-Oriented Lead Agent** orchestrates specialised compliance agents to ingest project documents, map them to statutory requirements, flag gaps, and generate **audit-ready reports** in minutes.

This document lists the **principal NYC regulatory frameworks** showcased in the demo, the documentation each requires, and **how PlexifyAEC proves compliance live**.

---

# 2  Regulation Summary Matrix  

| Ref | Regulation / Standard | Primary Compliance Documents | AI Verification Method | Demo Evidence |
|-----|-----------------------|------------------------------|------------------------|---------------|
| R-01 | **NYC Zoning Resolution** (§ 74-904 special permits for detention facilities) | Zoning approval letter, Site plan, FAR calculations | NLP extraction of zoning parameters → rule engine comparison | AI flags correct FAR & parking ratios; links approval letter |
| R-02 | **CEQR – City Environmental Quality Review** | Final EIS, Dust/Noise mitigation plans | Document classifier + mitigation checklist match | CEQR agent highlights missing dust-control section (fixed) |
| R-03 | **NYC Building Code – Chapter 33: Safeguards During Construction** | Site Safety Plan, Daily Inspections, DOB permits | Image/OCR + checklist; gap detection on fall-protection §3308 | Inspection report cites Chapter 33 items with photo evidence |
| R-04 | **Accessibility Standards (ADA + NYC BC Chapter 11)** | BIM accessibility audit, Accessible route drawings | BIM parser checks door widths, ramp slopes; compares to specs | Design-change workflow shows automatic ADA impact analysis |
| R-05 | **Civic & Humane Design Guidelines** (DDC, DOC) | Design narrative, Daylight & acoustics studies | Semantic similarity to guideline corpus; score threshold ≥ 0.8 | Report highlights compliance score & excerpts from narrative |
| R-06 | **M/WBE Participation Tracking** (LL 1/2013) | Monthly M/WBE reports, Contract values | Spreadsheet ingestion → KPI calculator | PM report shows 35 % participation vs 30 % goal |
| R-07 | **OSHA / Site Safety (29 CFR Part 1926)** | Safety training logs, Incident reports | OCR + table extraction → training matrix completeness | AI flags missing fall-protection training for 2 subcontractors |

---

# 3  Detailed Frameworks  

## 3.1  NYC Zoning Resolution (R-01)  
**Scope** Detention facilities require City Planning Commission special permits governing use, bulk, FAR, parking, and loading.  

**Required Docs**  
* Special-Permit Approval Letter  
* Site/Civil drawings with zoning diagrams  
* Parking & loading calculations  

**AI Compliance Workflow**  
1. **Document Intake Agent** recognises zoning docs.  
2. **Zoning Rule Engine** parses permissible FAR, height, setbacks.  
3. Cross-references site plan BIM bounding box data.  
4. Flags variances → sends to **Compliance Report Generator**.

**Demo Highlight**  
Uploading a **design-change bulletin** triggers re-analysis; AI confirms FAR remains within 6.5 limit and displays green “Compliant” badge with citation to §74-904.

---

## 3.2  CEQR (R-02)  
**Scope** City agencies must assess and mitigate environmental impacts.  

**Required Docs**  
* Final Environmental Impact Statement (EIS)  
* Dust & noise mitigation plan  
* Monitoring schedule  

**AI Compliance Workflow**  
1. **Document Classifier** tags CEQR docs.  
2. **Mitigation Checklist Agent** verifies each impact category has a mitigation measure and schedule.  
3. Generates gap report.

**Demo Highlight**  
AI notices the dust-control appendix missing; marks red, suggests template paragraph, user accepts → compliance score turns green.

---

## 3.3  NYC Building Code – Chapter 33 (R-03)  
**Scope** Safety during construction and demolition.  

**Required Docs**  
* Site Safety Plan (§3303)  
* Daily Inspection Logs (§3301)  
* Fall-Protection Documentation (§3308)  

**AI Compliance Workflow**  
* OCR daily inspection PDFs; extract inspections & signatures.  
* **Safety Rule Agent** checks mandatory fall-protection equipment lists.  
* Links inspection photos to BIM locations.  

**Demo Highlight**  
Generating a **Chapter 33 Inspection Report** shows auto-population of §3308 checklist, embedded images, and DOB permit numbers.

---

## 3.4  Accessibility Standards (R-04)  
**Scope** ADA & NYC Building Code Chapter 11 ensure accessible routes, cells, and public areas.  

**Required Docs**  
* BIM model with accessibility parameters  
* Accessible route drawings (PDF)  
* Compliance narrative  

**AI Compliance Workflow**  
1. **BIM Accessibility Parser** reads door widths, slopes.  
2. Compares against ADA 2010 & BC Ch 11 thresholds.  
3. Outputs “Accessible Elements Matrix” for report.

**Demo Highlight**  
When user issues a design bulletin moving holding cells, AI instantly re-evaluates routes -> confirms 48 in min corridor width maintained.

---

## 3.5  Civic & Humane Design Guidelines (R-05)  
**Scope** NYC DDC principles for daylight, acoustics, and human-centred detention environments.  

**Required Docs**  
* Design narrative  
* Daylight factor study  
* Acoustic analysis  

**AI Compliance Workflow**  
* **Semantic Analyzer** scores narrative sentences against guideline corpus.  
* Any section scoring < 0.6 flagged for architect review.  

**Demo Highlight**  
Compliance scorecard shown in PM report with direct links to narrative paragraphs meeting “Access to daylight” requirement.

---

## 3.6  M/WBE Participation (R-06)  
**Scope** Local Law 1/2013 mandates participation goals for Minority & Women-Owned Business Enterprises.  

**Required Docs**  
* Monthly participation spreadsheet  
* Subcontract values & vendor certifications  

**AI Compliance Workflow**  
* CSV ingestion → calculates percentage vs contract value.  
* Alerts if rolling average < goal.  

**Demo Highlight**  
PM report dashboard displays 35 % attainment, green indicator; drill-down lists top M/WBE vendors.

---

## 3.7  OSHA & Site Safety (R-07)  
Although federal, OSHA standards integrate with Chapter 33 safety.  

**Required Docs**  
* Training logs (10-hr/30-hr)  
* Incident & near-miss reports  

**AI Compliance Workflow**  
* Table extraction → training matrix.  
* Cross-checks subcontractor roster.  

**Demo Highlight**  
AI flags two new workers lacking 30-hr training; issue appears in safety section of inspection report.

---

# 4  Evidence & Audit Trail  

Every compliance assertion in demo is traceable:  

* **Evidence Link** – Doc-ID with page/element reference  
* **Agent Decision Log** – Input data, rule matched, confidence  
* **Timestamp & User** – Immutable record for DOB/DOC audit  

A single click exports the full **Compliance Evidence Package** (PDF + JSON) satisfying legal discovery requirements.

---

# 5  Conclusion  

By automating verification across zoning, environmental, safety, accessibility, and equity mandates, PlexifyAEC turns regulatory overhead into a **proactive quality gate**.  
During the demo you’ll witness these checks execute in real-time, proving that complex public-sector projects can **deliver certainty, transparency, and speed** with AI-driven workflows.

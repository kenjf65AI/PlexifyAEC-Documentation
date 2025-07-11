---
title: "Presentation Guide – NYC Borough-Based Jail System Demo"
description: "Step-by-step script, timing, talking points, and engagement tactics for the 25 July 2025 PlexifyAEC demonstration."
author: "Ken D’Amato"
created: "2025-07-04"
updated: "2025-07-04"
version: "1.0.0"
status: "draft"
category: "demo"
tags: ["presentation","guide","nyc-jail-system","demo","ai-document-management","report-generation"]
related:
  - path: "./overview.md"
    relationship: "references"
  - path: "./sandbox-setup.md"
    relationship: "references"
  - path: "./demo-flows/design-change-workflow.md"
    relationship: "references"
  - path: "./demo-flows/rfi-management.md"
    relationship: "references"
  - path: "./demo-flows/schedule-optimization.md"
    relationship: "references"
---

# 1  Overview  

This guide equips presenters with a **minute-by-minute roadmap** for the 25 July 2025 demo showcasing PlexifyAEC’s AI-powered document management, compliance verification, and report generation for the NYC Borough-Based Jail System.  
Total runtime: **10–12 minutes** including Q&A.

# 2  Run-of-Show (High-Level Timeline)  

| Time (mm:ss) | Segment | Key Assets | Speaker Cues |
|--------------|---------|-----------|--------------|
| 00:00-00:30 | Intro & Context | Slide 1 | “Why Rikers replacement needs AI” |
| 00:30-01:30 | Pain Points & Goals | Slide 2 | Manual doc chaos → compliance risk |
| 01:30-02:00 | Solution Snapshot | Slide 3 (Architecture) | Three-tier agent mesh |
| 02:00-05:00 | **Live Demo Part 1 – Document Intake & Design Change** | UI live | Upload design bulletin → AI tags & runs zoning/ADA checks |
| 05:00-07:00 | **Live Demo Part 2 – RFI Management** | UI live | RFI triage agent drafts answer; approver click-through |
| 07:00-08:30 | **Live Demo Part 3 – Schedule Optimisation** | UI live | Steel delay scenario; AI proposes recovery path |
| 08:30-10:00 | **Live Demo Part 4 – Report Generation** | UI live → PDF | Generate PM & Chapter 33 inspection reports with evidence links |
| 10:00-11:00 | Value Recap & Poll | Slide 4 + Zoom poll | “How many hours/week could this save your team?” |
| 11:00-12:00 | CTA & Q&A | Slide 5 | Invite pilot; open floor |

# 3  Detailed Script & Cues  

## 3.1  Introduction (00:00-01:30)

1. **Slide 1 – Title + Rikers Replacement Graphic**  
   *Talking Point:* “NYC’s $9 B program, 10 000+ documents/month, zero tolerance for compliance gaps.”  
2. **Slide 2 – Pain Points**  
   • Document deluge & version chaos  
   • Regulatory maze (Zoning, CEQR, Chapter 33)  
   • Slow RFI cycles / schedule risk  

> **Engagement Cue:** Ask: “Show of hands – who spends >5 hrs/week hunting latest drawings?”

## 3.2  Solution Snapshot (01:30-02:00)

*Slide 3 – PlexifyAEC Agentic Mesh*  
Highlight Trust-, Integration-, Vision-oriented leads orchestrating task agents.

## 3.3  Live Demo Part 1 – Design Change Workflow (02:00-05:00)

1. **Action:** Drag-and-drop *Design Change Bulletin PDF* + *ARCH BIM rev-2* into Documents tab.  
2. **Narrate:** “Document Intake Agent classifies, versions, and triggers zoning & ADA checks.”  
3. **Point to UI:** Compliance panel turns **green** for FAR, **orange** for ADA ramp slope – AI suggests fix.  
4. **Talking Point:** 30-second processing vs hours of manual review.

## 3.4  Live Demo Part 2 – RFI Management (05:00-07:00)

1. **Action:** Open *Pending RFIs* list → click RFI-037.  
2. **Narrate:** “RFI Triage Agent extracted drawing ref, spec section, and drafted response using LLM + spec corpus.”  
3. **Action:** Click **Accept Draft** → status auto-updates, watcher notified.  
4. **Metric Callout:** “Average RFI cycle cut from 4 days to <1 day.”

## 3.5  Live Demo Part 3 – Schedule Optimisation (07:00-08:30)

1. **Action:** Compare *Baseline* vs *v1.1-delay* schedule (steel delivery slip).  
2. **Narrate:** “Schedule Optimiser Agent recalculates critical path, proposes 2-week recovery (overtime vs resequence).”  
3. **Engagement Cue:** Poll: “Which mitigation would you pick?” (Option A overtime, Option B resequence).

## 3.6  Live Demo Part 4 – Report Generation (08:30-10:00)

1. **Action:** Command bar `/report pm weekly`.  
2. **Narrate:** “Agents aggregate docs & data; compile PM report with KPI gauges, compliance scorecards, M/WBE stats.”  
3. **Show PDF:** Scroll to Evidence Appendix; click CEQR dust-mitigation link → side panel displays EIS page 112.  
4. **Action:** Generate *Chapter 33 Inspection Report*; note auto-filled fall-protection checklist & photo log.  
5. **Talking Point:** “Audit-ready in <60 s; evidence zip exports for DOB.”

## 3.7  Value Recap & Poll (10:00-11:00)

*Slide 4 – ROI Dashboard*  
• 4 hrs/report saved → $500k/year potential  
• 90 % RFI cycle reduction  
• Real-time compliance confidence

> **Poll Result Discussion** – read live poll on time saved; reinforce alignment.

## 3.8  Call to Action & Q&A (11:00-12:00)

*Slide 5 – Next Steps*  
1. Invite attendees to **Pilot** on next design package.  
2. Offer **Compliance Matrix Workshop** (free for first 3 firms).  
3. Open floor for questions. Capture in Slack for follow-up.

# 4  Audience Engagement Strategies  

| Moment | Technique | Goal |
|--------|-----------|------|
| Early show-of-hands | Relatability | Surface common pain |
| Live polls (Zoom/Teams) | Interaction | Quantify value perception |
| Evidence click-through | Wow factor | Prove traceability |
| Q&A chat + follow-up doc | Trust | Capture objections for roadmap |

# 5  Backup & Recovery Plan  

| Risk | Mitigation |
|------|------------|
| Sandbox hangs | Pre-recorded 90-sec video clip; switch instantly |
| Internet drop | Mobile hotspot fail-over |
| PDF render slow | Have pre-generated reports open in tab 2 |
| Time overrun | Skip Schedule Optimisation section (saves 90 sec) |

> Keep **Cheat-Sheet** (print) with command list & URLs.

# 6  Post-Demo Follow-Up  

*Within 2 hrs*:  
• Send thank-you email + link to recording + pilot signup form.  
• Share generated reports as attachments.  

*Within 24 hrs*:  
• Add Q&A to Confluence; tag product backlog items.  

---

*Prepared for live use – update `status: review` once dry-run approved.*

# Code Droid Prompt – PlexifyAEC UI / UX Alpha

You are a Factory.ai **Code Droid** operating in **Droid Mode** as a **Conversational AI UX Engineer** specialising in agentic Q&A interfaces for the construction industry.

Your mission is to deliver **Phase One** of the PlexifyAEC meta-prompt: an alpha UI/UX shell and foundational agent interface that powers an AI question-and-answer assistant for construction workflows.  
This implementation will be showcased in a live demo for the **NYC Borough-Based Jail System** on **25 July 2025**.

---

## 🎯 Goal

Build a functional, visually cohesive conversational interface that:

1. Ingests BIM drawings, RFIs and schedules  
2. Shows real-time compliance status for NYC regulations (Zoning, CEQR, Chapter 33, ADA, M/WBE)  
3. Generates Project Management and Inspection/Audit reports on demand  
4. Follows the 10-minute demo flow defined in `docs/demo/nyc-jail-system/presentation-guide.md`

---

## 🎨 Design Requirements

| Item | Requirement |
|------|-------------|
| **Primary Colour** | `#562ce6` |
| **Gradient** | Dark (#3a1ab9) → Light (#7d5dff), top-left → bottom-right |
| **Theme** | Dark UI, high contrast |
| **Logos** | Use assets in `assets/logos/` (light, dark, gradient variants) |
| **Dashboard Layout** | Card-based pattern shown in reference mockup |
| **Compliance Indicators** | Colour states: 🟢 compliant · 🟠 warning · 🔴 non-compliant |
| **Accessibility** | WCAG AA contrast ratios |
| **Responsive** | Desktop primary; tablet-friendly |

---

## ✅ Phase One Scope

### 1. UI / UX Prototype
- Chat interface with:
  - Message thread
  - File-upload drop zone (BIM, PDF, CSV, XML)
- Right-hand sidebar:
  - Compliance status cards (Zoning, CEQR, Chapter 33, ADA, M/WBE)
  - Integration health (ACC, Procore, P6, Bluebeam)
- Dashboard home:
  - Project stats (102 Projects · 38 Companies · 473 Users)
  - Processing-pipeline progress bars
  - Agent capability cards (Dynamic Task Allocation, Tool Use, Document Parsing, Semantic Analysis, Self-Learning Loop, Model Training, CAD Model Linking)
- Visual toasts: “Document analysis in progress…”, “Generating compliance report…”

### 2. Agent Shell
- Implement three lead agents (simulate with mocks):
  - **Trust-Oriented** – compliance & ethics
  - **Integration-Oriented** – external platform data
  - **Vision-Oriented** – design & innovation
- Mock task agents for:
  - Design-change compliance check
  - RFI triage / draft response
  - Schedule optimisation

### 3. Context & State Manager
- Persist user/project IDs, document IDs, prior Q&A turns  
- Expose context store via simple in-memory or localStorage layer

### 4. Prompt Framework
- Use JSON schema:

  ```json
  {
    "user_intent": "...",
    "contextual_facts": "...",
    "output_format": "markdown|json|summary"
  }
  ```

- Provide 3 few-shot examples:
  1. RFI analysis
  2. Compliance check question
  3. Schedule delay query

### 5. Integration Visualisation
- Simulated OAuth status chips for:
  - Autodesk ACC
  - Procore
  - Primavera P6
  - Bluebeam Studio
- Sync status: “Connected”, “Syncing…”, “Error”

---

## 📦 Deliverables

| Artefact | Location |
|----------|----------|
| Functional UI prototype | `/ui-design/prototype/` |
| High-fidelity mockups (PNG/Figma export) | `/ui-design/mockups/` |
| Prompt templates & few-shot examples | `/ui-design/prompt-templates/` |
| Context manager module | `/ui-design/context/` |
| Sample PM & Inspection reports (PDF/JSON) | `/ui-design/sample-reports/` |
| README for running the prototype | `/ui-design/README.md` |

---

## 🗒 Reference Documentation

Please read the following **before** implementation:

1. `docs/demo/nyc-jail-system/overview.md`
2. `docs/demo/nyc-jail-system/document-types.md`
3. `docs/demo/nyc-jail-system/regulatory-framework.md`
4. `docs/demo/nyc-jail-system/ai-capabilities/report-generation.md`
5. `docs/demo/nyc-jail-system/presentation-guide.md`

---

## 🛠 Development Notes

- Use any modern front-end stack (React + Vite recommended).  
- Keep components modular; theme variables driven by the colour palette.  
- Mock backend calls with Promise delays/resolved JSON.  
- Log all agent actions to console for traceability.  
- Commit work via Pull Request; include GIF or Loom link of prototype in action.

---

## 🚀 Kick-off

Begin by scaffolding the project in `/ui-design/prototype/` and committing an initial dashboard shell with brand colours and logos.  
Iterate until all Phase One deliverables are satisfied and demo-ready.  

*Build boldly – PlexifyAEC will revolutionise construction compliance with your UI.*  

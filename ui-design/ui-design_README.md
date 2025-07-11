# PlexifyAEC UI-Design Workspace

Welcome Code Droid!  
This folder is **your sandbox** for building the Phase-One alpha UI/UX that powers PlexifyAEC’s NYC Borough-Based Jail System demo (25 July 2025).

---

## 1  Purpose

* Implement a conversational dashboard that showcases:
  * AI-driven document intake & compliance checks  
  * Real-time status cards and processing pipeline  
  * On-demand PM & Chapter 33 inspection reports  
* Align strictly with design, branding, and workflow specs defined in `/docs/demo/nyc-jail-system`.

---

## 2  Directory Layout

| Path | Description |
|------|-------------|
| `prototype/` | Source code for the working UI (React + Vite suggested) |
| `mockups/` | High-fidelity screens (.png / .fig) – dark theme default |
| `components/` | Stand-alone UI components (cards, chat bubble, sidebar) |
| `context/` | Context & state-manager module (user, project, doc IDs) |
| `prompt-templates/` | JSON / markdown prompt examples for agents |
| `sample-reports/` | Generated PM & Inspection report artefacts (PDF/JSON) |
| `docs/` | Any developer notes produced during implementation |

Create sub-folders as needed; keep paths flat and intuitive.

---

## 3  Branding & Theme

Token | Value | Usage
------|-------|------
Primary-Base | `#562CE6` | Buttons, active icons, accents
Primary-Gradient | `linear-gradient(135deg,#3A1AB9 0%,#562CE6 40%,#6B4CFF 70%,#8F74FF 100%)` | Header banners, metric cards
Background-Dark | `#1A1A1A` | App shell
Success / Warning / Error | `#16C784` · `#F4B740` · `#FF4D4F` | Compliance states

Logos live in `assets/logos/`.  
Ensure **WCAG AA** contrast and color-blind safe indicators (icon + text).

---

## 4  Functional Scope (Phase One)

1. **Dashboard Home**  
   * Project stats (102 Projects / 38 Companies / 473 Users)  
   * Agent capability cards (Dynamic Task Allocation, Tool Use, etc.)  
2. **Chat Interface**  
   * Message history, markdown support, file-upload drop zone  
   * Sidebar compliance status (Zoning, CEQR, Ch 33, ADA, M/WBE)  
3. **Processing Pipeline** visual with animated progress bars  
4. **Integration Badges** – Autodesk ACC, Procore, Primavera P6, Bluebeam  
5. **Visual Feedback** toasts: “Tagging document…”, “Report ready”  
6. **Report Viewer** modal to display PDF/HTML output + evidence links

All workflows must support the 10-min run-of-show in `presentation-guide.md`.

---

## 5  Development Quick Start

```bash
# scaffold prototype
cd ui-design
npm create vite@latest prototype -- --template react
cd prototype
npm i
npm run dev          # localhost:5173
```

* Use CSS variables or SCSS for color tokens.  
* Store runtime context in a lightweight store (React Context or Zustand).  
* Mock backend calls (`/mocks/*.ts`) returning fixture JSON from `docs`.

---

## 6  Deliverables Checklist

- [ ] Working dashboard & chat prototype committed to `prototype/`
- [ ] Mockups for all screens in `mockups/`
- [ ] Prompt examples in `prompt-templates/`
- [ ] Context manager module in `context/`
- [ ] Sample PM & Inspection reports in `sample-reports/`
- [ ] README updates with build instructions

---

## 7  Contribution Workflow

1. **Branch**: `ui/feature-<slug>`  
2. **Commit**: Conventional commits (`feat(ui): add compliance card`)  
3. **Pull Request**: Tag **@ProductOwner** for review  
4. CI runs lint + markdown-link-check; fix before merge  
5. Merge → prototype auto-deploy (setup TBD)

---

## 8  Reference Docs

* Demo overview … `/docs/demo/nyc-jail-system/overview.md`
* Presentation script … `/docs/demo/nyc-jail-system/presentation-guide.md`
* Regulatory matrix … `/docs/demo/nyc-jail-system/regulatory-framework.md`
* Report specs … `/docs/demo/nyc-jail-system/ai-capabilities/report-generation.md`
* Full color palette … `assets/colors/palette.md`

---

### Build boldly – bring PlexifyAEC’s vision to life. 🔧🟣

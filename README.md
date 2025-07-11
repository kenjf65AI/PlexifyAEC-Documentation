# PlexifyAEC – Documentation & UI/UX Specs

Welcome to **PlexifyAEC**, an AI-powered construction management platform built with Factory.ai.  
This repository houses **all documentation, design assets, and implementation prompts** needed to deliver the NYC Borough-Based Jail System demo scheduled **25 July 2025**.

---

## 🌟 What’s Inside?

| Folder / File | Purpose |
|---------------|---------|
| `code-droid-prompt.md` | Implementation brief for Factory.ai **Code Droid** to build the alpha UI/UX |
| `assets/` | Logos, color palette, dashboard mockups |
| `docs/` | Full technical & demo documentation |
| `ui-design/` | Component specs, layouts, interaction flows (post-generation) |

---

## 🗂 Repository Structure (high-level)

```
.
├── README.md
├── code-droid-prompt.md
├── assets/
│   ├── logos/
│   ├── mockups/
│   └── colors/
└── docs/
    ├── demo/
    │   └── nyc-jail-system/
    │       ├── overview.md
    │       ├── sandbox-setup.md
    │       ├── document-types.md
    │       ├── regulatory-framework.md
    │       ├── presentation-guide.md
    │       ├── demo-flows/
    │       └── ai-capabilities/
    ├── architecture/
    ├── compliance/
    │   └── matrices/
    └── templates/
```

---

## 🎨 Brand & Design

* **Primary color:** `#562ce6`  
* **Gradient:** top-left (dark) → bottom-right (light) variation of the primary purple  
* **Logos:** see `assets/logos/` (light, dark, gradient variants)  
* **Dashboard inspiration:** `assets/mockups/plexify-dashboard.png`

---

## 🚀 Quick Start for Code Droid

1. **Review** `code-droid-prompt.md` – contains detailed Phase One scope & deliverables.  
2. **Read** key demo docs:  
   * `docs/demo/nyc-jail-system/overview.md` – business context & objectives  
   * `docs/demo/nyc-jail-system/presentation-guide.md` – 10-minute run-of-show  
   * `docs/demo/nyc-jail-system/ai-capabilities/report-generation.md` – report specs  
3. **Follow** the color palette and logo guidelines from `assets/`.  
4. **Output** UI/UX artifacts into `/ui-design/` and commit via PR.  
5. Ensure the prototype supports the workflows in `presentation-guide.md`.

---

## 🔗 Key Resources

| Document | Link |
|----------|------|
| Demo Overview | `docs/demo/nyc-jail-system/overview.md` |
| Sandbox Setup | `docs/demo/nyc-jail-system/sandbox-setup.md` |
| Regulatory Framework | `docs/demo/nyc-jail-system/regulatory-framework.md` |
| AI Report Generation Spec | `docs/demo/nyc-jail-system/ai-capabilities/report-generation.md` |
| Presentation Script | `docs/demo/nyc-jail-system/presentation-guide.md` |
| Code Droid Prompt | `code-droid-prompt.md` |

---

## 📜 Contributing

All changes occur via Pull Request.  
1. Fork or create a feature branch.  
2. Follow naming conventions & template front-matter.  
3. Pass CI checks (markdown lint, link validate).  
4. Obtain approval from the Product Owner.

---

## 📅 Demo Milestone

**Target date:** 25 July 2025  
Success = live demo of automated document intake, compliance checks, and report generation in < 10 min using the UI delivered from this repo.

Let’s build the future of AI-driven construction management!  

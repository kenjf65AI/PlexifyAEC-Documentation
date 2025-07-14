# PlexifyAEC UI Prototype

Alpha UI/UX shell for the **NYC Borough-Based Jail System** demo (25 July 2025).  
Built with React + Vite, it showcases how PlexifyAEC brings AI-driven document intake, real-time compliance, conversational Q&A and report generation to construction projects.

---

## ✨ Key Features

| Area | Highlights |
|------|------------|
| Dashboard | • Project KPIs (Projects / Companies / Users) • Agent capability cards • Processing-pipeline progress • Integration health chips (Autodesk ACC, Procore, P6, Bluebeam) |
| Compliance | Right-hand sidebar with per-regulation score, evidence links & issue drill-down (Zoning, CEQR, Chapter 33, ADA, M/WBE) |
| Chat | Conversational interface with drag-&-drop upload (BIM, PDF, CSV, XML) • Markdown rendering • Typing indicators • Action buttons |
| Report Generator | Wizard to create PM, Chapter 33, Inspection & M/WBE reports • Live generation progress • Recent-report downloads |
| Theme | Dark UI, WCAG-AA contrast • Primary purple `#562ce6` gradient • Semantic success / warning / error states |
| State | Lightweight global store with Zustand + localStorage persistence |
| Mock Backend | All data served from `/src/mocks` with Promise delays for realistic latency |

---

## 🏗 Tech Stack

* **React 18** + **Vite** for lightning-fast dev server & HMR  
* **Material-UI v5** (MUI) for accessible component library  
* **Zustand** for global state & persistence  
* **React Router v6** for page routing  
* **Emotion** (CSS-in-JS) for theming + dynamic styles  
* **React-Markdown** for rich chat rendering  

_No backend required – everything runs in the browser with mock data._

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
cd ui-design/prototype
npm install            # or: pnpm install / yarn

# 2. Start the dev server
npm run dev            # Vite ⇢ http://localhost:5173
```

The app should open automatically. Login screens are not implemented – you’re immediately dropped into the Dashboard.

#### Production build

```bash
npm run build          # Creates dist/ for static hosting
npm run preview        # Local preview of production build
```

---

## 📂 File Structure

```
ui-design/
└── prototype/
    ├── public/                 # Static assets (favicon, manifest)
    ├── src/
    │   ├── assets/             # Logos & images copied from repo assets/
    │   ├── components/         # Re-usable UI pieces
    │   │   ├── layout/         # MainLayout (app shell & nav)
    │   │   ├── dashboard/      # Metric & capability cards
    │   │   ├── chat/           # ChatInterface (+ bubbles, upload)
    │   │   ├── compliance/     # ComplianceSidebar & helpers
    │   │   ├── reports/        # ReportGenerator & widgets
    │   │   └── common/         # Generic controls / icons
    │   ├── context/            # Zustand global store
    │   ├── mocks/              # JSON & JS fixtures (dashboardData, chatData …)
    │   ├── pages/              # Route-level components (Dashboard, Chat, Reports)
    │   ├── styles/             # theme.js (MUI palette & gradient)
    │   ├── utils/              # Helpers (formatting, status maps)
    │   ├── App.jsx             # Entry after refactor (unused but kept)
    │   └── main.jsx            # React root + router + ThemeProvider
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🧩 Component Organisation

* **MainLayout** – AppBar + collapsible Drawer navigation  
* **Dashboard/** – StatsCard, AgentCapabilityCard, IntegrationCard, PipelineProgress  
* **Chat/** – ChatInterface (MessageBubble, FileUploadArea, AttachmentCard)  
* **Compliance/** – ComplianceSidebar + collapsible regulation details  
* **Reports/** – ReportGenerator with ReportTypeCard & GenerationProgress  
* **Context/store.js** – Centralised state (user, project, chat, compliance, reports)

Each component is **isolation-friendly**: styling via Emotion/STyled-API, no hidden global CSS.

---

## 🔧 Configuration / Customisation

| Item | How to change |
|------|---------------|
| Brand colours & gradient | `src/styles/theme.js` |
| Initial mock data | `src/mocks/*.js` (dashboardData, complianceData …) |
| Navigation routes | `src/main.jsx` (`<Routes>`) |
| Persistence key | `context/store.js → persist({ name: 'plexifyaec-storage' })` |
| Port | `vite.config.js` or `npm run dev -- --port 3000` |

---

## 📜 Next Steps

1. Replace mocks with live API calls (GraphQL/REST)  
2. Connect Factory.ai agents via WebSocket for real-time streaming  
3. Implement authentication & RBAC (e.g. Clerk, Auth0)  
4. Add tests with Vitest + React Testing Library  
5. Configure CI/CD → Netlify / Vercel preview deployments  

---

### © 2025 San Francisco AI Factory – Demo use only

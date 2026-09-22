<div align="center">

<br/>

```
███████╗██╗     ███████╗██╗  ██╗    ███████╗ ██████╗ ███╗   ██╗███████╗
██╔════╝██║     ██╔════╝╚██╗██╔╝    ╚══███╔╝██╔═══██╗████╗  ██║██╔════╝
█████╗  ██║     █████╗   ╚███╔╝       ███╔╝ ██║   ██║██╔██╗ ██║█████╗  
██╔══╝  ██║     ██╔══╝   ██╔██╗      ███╔╝  ██║   ██║██║╚██╗██║██╔══╝  
██║     ███████╗███████╗██╔╝ ██╗    ███████╗╚██████╔╝██║ ╚████║███████╗
╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝    ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
```

### *Your All-In-One Fitness & Gym Management Platform*

<br/>

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=flat-square&logo=reactivex&logoColor=white)](https://rxjs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

<br/>

[**🚀 Live Demo**](#) · [**📖 Docs**](#-getting-started) · [**🐛 Report Bug**](issues) · [**✨ Request Feature**](issues)

<br/>

> **FlexZone** is a production-ready Angular SPA for gym management — featuring member dashboards, workout plans, class booking, an AI-powered fitness assistant (FlexBot), a supplement store, a nutrition planner, and a full admin control panel.

<br/>

---

</div>

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Demo Accounts](#-demo-accounts)
- [Project Structure](#-project-structure)
- [FlexBot — AI Assistant](#-flexbot--ai-assistant)
- [Route Guards & Security](#-route-guards--security)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

FlexZone reimagines how fitness platforms are built. Instead of a clunky monolith, it's a clean, component-driven Angular 22 application powered by:

- **Signals-first state** — no NgRx boilerplate, reactive UX out of the box
- **Standalone components** — zero NgModules, fully tree-shakable
- **Feature-based architecture** — scales cleanly as the product grows
- **Mock REST API** — `json-server` makes it fully runnable without any backend setup

Whether you're a developer exploring Angular patterns or evaluating a base for a real gym SaaS, FlexZone is designed to be readable, extendable, and impressive.

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🧑 Member Experience
- 🔐 **Auth** — Register, Login, persistent sessions via `localStorage`
- 🏠 **Dashboard** — Personalized welcome with name, goal & fitness level
- 👤 **Profile** — Edit account details, live-saved to the API
- 🏋️ **Workout Plans** — Browse 6 plans, filter by level, search, sort by rating or calories
- 📅 **Class Booking** — Book spots with real-time availability tracking
- 🥗 **Nutrition** — Goal-based meal plans + macro breakdowns + food library
- 🛒 **Supplement Store** — 37 products across 4 categories with star ratings
- 🤖 **FlexBot** — Floating AI chat assistant powered by RAG

</td>
<td width="50%" valign="top">

### 🛠️ Admin Control Panel
- 📊 **Dashboard** — Live KPIs: total users, trainers, plans, classes, bookings
- 👥 **User Management** — Full CRUD with role assignment
- 🏅 **Trainer Management** — Specialties, ratings, experience
- 📋 **Plan Management** — Categories, difficulty levels, tags
- 🗓️ **Class Management** — Schedules, capacity, trainer assignment
- 🔎 **Search & Pagination** — Every table is searchable with 5-per-page pagination
- 🛡️ **Admin Guard** — Separate role-based route protection

</td>
</tr>
</table>

---

## 🛠 Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| **Framework** | Angular 22 | Standalone components, Signals, `@if`/`@for` |
| **Language** | TypeScript 6 | Type-safe development |
| **Styling** | Bootstrap 5.3 + CSS Variables | Responsive dark-purple design system |
| **Icons** | Font Awesome 7 | UI iconography |
| **State Management** | Angular Signals + `computed()` | Reactive state without NgRx |
| **HTTP Layer** | `HttpClient` + RxJS 7.8 | API communication, `forkJoin`, `map` |
| **Forms** | Angular Reactive Forms | Validated inputs with real-time errors |
| **Routing** | Angular Router | Lazy-loaded routes + `CanActivate` guards |
| **Mock Backend** | json-server 0.17 | Full REST API from a single JSON file |
| **Concurrency** | concurrently | Run Angular + json-server with one command |
| **Testing** | Vitest | Unit testing |
| **Formatting** | Prettier | Consistent code style |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│                                                         │
│  ┌─────────┐   ┌──────────────────────────────────┐    │
│  │  Navbar │   │         Router Outlet             │    │
│  │ (sticky)│   │                                   │    │
│  └─────────┘   │  Public        Member    Admin    │    │
│                │  ───────       ──────    ─────    │    │
│  ┌─────────┐   │  Home          Dash.    Dashboard │    │
│  │FlexBot  │   │  About         Profile  Users     │    │
│  │(floating│   │  Contact       Plans    Trainers  │    │
│  │ widget) │   │                Classes  Plans     │    │
│  └─────────┘   │                Nutrition Classes  │    │
│                │                Store              │    │
│                └──────────────────────────────────┘    │
│                                                         │
└───────────────────────┬─────────────────────────────────┘
                        │ HttpClient
                        ▼
            ┌───────────────────────┐
            │   json-server :3000   │
            │                       │
            │  /users               │
            │  /trainers            │
            │  /plans               │
            │  /classes             │
            │  /bookings            │
            │  /knowledgeBase       │
            └───────────────────────┘
```

### State Flow

```
User Action → Component Signal → Service (HTTP) → Signal Update → Template re-renders
```

No `ChangeDetectionStrategy.OnPush` hacks. No manual `markForCheck()`. Signals handle everything.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

| Tool | Version |
|---|---|
| Node.js | `v24.15.0` or higher |
| npm | `v8.0.0` or higher |

> ⬇️ Download Node.js from [nodejs.org](https://nodejs.org/en/download)

---

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/flex-zone.git

# 2. Navigate into the project
cd flex-zone

# 3. Install all dependencies
npm install
```

### Running the App

```bash
# Start both Angular (port 4200) + json-server (port 3000) simultaneously
npm run dev
```

Then open your browser at **[http://localhost:4200](http://localhost:4200)** 🎉

<details>
<summary>Run servers separately</summary>

```bash
# Terminal 1 — Mock API
npm run api

# Terminal 2 — Angular Dev Server
npm run start
```

</details>

<details>
<summary>Production build</summary>

```bash
npm run build
# Output → dist/flex-zone/browser/
```

</details>

---

## 🔑 Demo Accounts

Two accounts are pre-seeded in `db.json`. No setup required — just click and explore:

| Role | Email | Password | Access |
|---|---|---|---|
| 👑 **Admin** | `admin@flexzone.com` | `admin123` | Everything including `/admin` |
| 🏃 **Member** | `user@flexzone.com` | `user123` | All member pages |

> 💡 You can register a completely new account via `/register` — it gets saved live to `db.json`.

---

## 📁 Project Structure

```
flex-zone/
│
├── db.json                          # 📦 Mock database — single source of truth for all API data
├── package.json
│
└── src/
    ├── styles.css                   # 🎨 Global design system (CSS variables, shared utilities)
    └── app/
        │
        ├── app.ts                   # Root component
        ├── app.html                 # Shell: Navbar + RouterOutlet + FlexBot
        ├── app.routes.ts            # All routes (lazy-loaded + guarded)
        ├── app.config.ts            # provideRouter, provideHttpClient
        │
        ├── components/              # ─── Shared / Public UI ───────────────────────────────
        │   ├── navbar/              # Sticky navbar with mobile offcanvas drawer
        │   ├── footer/              # Reusable site footer
        │   ├── home/                # Landing page (hero, pricing, testimonials, FAQ)
        │   ├── about-as/            # Mission, timeline, team grid
        │   ├── contact-us/          # Contact info + form
        │   └── chatbot/             # 🤖 FlexBot — floating AI chat widget
        │       ├── chatbot.ts
        │       ├── chatbot.html
        │       └── chatbot.css
        │
        ├── core/                    # ─── App Infrastructure ───────────────────────────────
        │   ├── models/
        │   │   └── models.ts        # All interfaces: User, Trainer, WorkoutPlan, GymClass,
        │   │                        # Booking, KnowledgeEntry, ChatMessage
        │   ├── guards/
        │   │   ├── auth.guard.ts    # Protects member routes → redirects to /login
        │   │   └── admin.guard.ts   # Protects /admin/** → redirects to /unauthorized
        │   ├── services/
        │   │   ├── auth.service.ts          # Signal-based auth, localStorage persistence
        │   │   ├── ai-assistant.service.ts  # RAG pipeline for FlexBot
        │   │   ├── plan.service.ts          # CRUD for /plans
        │   │   ├── class.service.ts         # CRUD + booking logic for /classes
        │   │   └── trainer.service.ts       # CRUD for /trainers
        │   └── pages/
        │       ├── not-found/       # 404 page
        │       └── unauthorized/    # 403 page
        │
        └── features/                # ─── Feature Modules ──────────────────────────────────
            │
            ├── auth/
            │   ├── login/           # Login form with demo credential hints
            │   └── register/        # Registration with duplicate email check
            │
            ├── user/                # All protected behind authGuard
            │   ├── dashboard/       # Welcome + quick-links
            │   ├── profile/         # Edit profile (PUT /users/:id)
            │   ├── plans/           # Workout plans (search + filter + sort)
            │   ├── classes/         # Class listing + booking flow
            │   ├── nutrition/       # Meal plans + food library
            │   └── supplement-store/# Product catalog with category filter
            │
            └── admin/               # All protected behind adminGuard
                ├── admin-layout/    # Sidebar shell with <router-outlet>
                ├── dashboard/       # KPI stats via forkJoin
                ├── users/           # CRUD table: Users
                ├── trainers/        # CRUD table: Trainers
                ├── plans/           # CRUD table: Plans
                └── classes/         # CRUD table: Classes
```

---

## 🤖 FlexBot — AI Assistant

FlexBot is a persistent floating chat widget that lives on every page. It runs a full **RAG (Retrieval-Augmented Generation)** pipeline — no external API key, no paid service, no backend code needed.

### Pipeline

```
┌──────────────────────────────────────────────────────────────┐
│                      FlexBot RAG Pipeline                    │
│                                                              │
│  1. USER INPUT                                               │
│     "How much protein should I eat?"                         │
│                │                                             │
│                ▼                                             │
│  2. TOKENIZE                                                 │
│     ["how", "much", "protein", "should", "eat"]              │
│                │                                             │
│                ▼                                             │
│  3. RETRIEVE   GET /knowledgeBase                            │
│     Score each entry by keyword overlap                      │
│     → Top 3 matches selected                                 │
│                │                                             │
│                ▼                                             │
│  4. GENERATE                                                 │
│     Compose structured answer from retrieved entries         │
│     Show source chips for full transparency                  │
│                │                                             │
│                ▼                                             │
│  5. RESPOND                                                  │
│     Animated typing indicator → formatted response           │
└──────────────────────────────────────────────────────────────┘
```

### FlexBot Features

| Feature | Detail |
|---|---|
| 💬 Persistent widget | Floating button on all pages, no route change needed |
| ⚡ Typing animation | 3-dot bounce while "thinking" |
| 🎯 Quick suggestions | 6 one-tap topic chips |
| 📚 Source transparency | Every answer shows which KB entries were used |
| 🔄 Clear chat | Reset button in the header |
| 🔴 Unread badge | Pulsing dot when a reply arrives while chat is closed |
| 📱 Responsive | Full-width bottom sheet on mobile |
| 🌍 Arabic-aware | Tokenizer handles Arabic + English queries |

### Knowledge Base (8 topics)

```
Protein Intake          Beginner Training Frequency    Class Booking Policy
Weight Loss Nutrition   Recovery & Rest                Choosing a Workout Plan
Hydration Guidelines    Membership Plans
```

### Upgrade to a Real LLM

The retrieval layer is completely decoupled. Swap in GPT-4, Claude, or Gemini by replacing a single method:

```typescript
// ai-assistant.service.ts
private generateAnswer(query: string, context: KnowledgeEntry[]): string {
  // Replace this body with a call to your LLM API
  // context = the top retrieved KB entries (already fetched & ranked)
  // Return the LLM's response string
}
```

Everything else — the floating UI, typing animation, source chips, signal state — stays unchanged.

---

## 🔐 Route Guards & Security

```
/                    → Public
/about               → Public
/contact-us          → Public
/login               → Public
/register            → Public
                     
/dashboard           → 🔒 authGuard  (must be logged in)
/profile             → 🔒 authGuard
/plans               → 🔒 authGuard
/classes             → 🔒 authGuard
/supplement-store    → 🔒 authGuard
/nutrition           → 🔒 authGuard
                     
/admin               → 🛡️ adminGuard (must be logged in AND role === 'admin')
/admin/users         → 🛡️ adminGuard
/admin/trainers      → 🛡️ adminGuard
/admin/plans         → 🛡️ adminGuard
/admin/classes       → 🛡️ adminGuard
                     
/unauthorized        → Public (shown when adminGuard fails)
/**                  → 404 NotFound page
```

---

## 📡 API Reference

All endpoints are served by `json-server` at **`http://localhost:3000`**.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/users` | List all users |
| `POST` | `/users` | Register new user |
| `PUT` | `/users/:id` | Update user profile |
| `GET` | `/trainers` | List all trainers |
| `POST` | `/trainers` | Create trainer |
| `PUT` | `/trainers/:id` | Update trainer |
| `DELETE` | `/trainers/:id` | Delete trainer |
| `GET` | `/plans` | List workout plans |
| `POST` | `/plans` | Create plan |
| `PUT` | `/plans/:id` | Update plan |
| `DELETE` | `/plans/:id` | Delete plan |
| `GET` | `/classes` | List gym classes |
| `POST` | `/classes` | Create class |
| `PATCH` | `/classes/:id` | Update spots / partial update |
| `DELETE` | `/classes/:id` | Delete class |
| `GET` | `/bookings` | List bookings |
| `POST` | `/bookings` | Book a class |
| `GET` | `/knowledgeBase` | FlexBot knowledge source |

> All endpoints support `?field=value` query params for filtering (e.g. `GET /users?email=user@flexzone.com`).

---

## 🤝 Contributing

Contributions are welcome and appreciated!

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m 'feat: add AmazingFeature'

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

<br/>

**Built with 💜 by [MahmoudBahnsey ](https://github.com/mahmoudbahnsey)**

<br/>

⭐ If you found this project helpful, please consider giving it a star!

<br/>

[![GitHub stars](https://img.shields.io/github/stars/your-username/flex-zone?style=social)](https://github.com/your-username/flex-zone)
[![GitHub forks](https://img.shields.io/github/forks/your-username/flex-zone?style=social)](https://github.com/your-username/flex-zone/fork)

</div>

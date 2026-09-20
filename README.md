# FlexZone 🏋️

FlexZone is a fitness & wellness platform built with Angular — workout plans, bookable classes,
an AI assistant (FlexBot) grounded in a real knowledge base, and a full admin dashboard.
Data is served by a mock REST API (`json-server`) instead of a real backend, as required for this
graduation project.

## Tech Stack

- **Angular 22** — standalone components, signals, `@if`/`@for` control flow, lazy-loaded routes, route guards
- **json-server** — mock REST API (`db.json`) for Users, Trainers, Plans, Classes, Bookings, Knowledge Base
- **Reactive Forms** — validated forms across auth, profile, and every admin CRUD screen

## Getting Started

```bash
npm install
npm run dev
```

`npm run dev` starts **both** the Angular dev server (`http://localhost:4200`) and the mock API
(`http://localhost:3000`) together. If you'd rather run them separately:

```bash
npm run api     # json-server on :3000
npm run start   # ng serve on :4200
```

## Demo Accounts

| Role  | Email                | Password  |
|-------|-----------------------|-----------|
| Admin | admin@flexzone.com    | admin123  |
| User  | user@flexzone.com     | user123   |

You can also register a brand-new account from `/register` — it's saved to `db.json` via json-server.

## App Structure

```
src/app/
├── components/        # Public marketing pages (Home, About, Navbar)
├── core/
│   ├── models/         # Shared TypeScript interfaces
│   ├── services/       # AuthService, TrainerService, PlanService, ClassService, AiAssistantService
│   ├── guards/          # authGuard, adminGuard
│   └── pages/           # 404, Unauthorized
├── features/
│   ├── auth/            # Login, Register
│   ├── user/            # Dashboard, Profile, Plans, Classes, AI Assistant
│   └── admin/           # Admin layout + Dashboard + CRUD (Users, Trainers, Plans, Classes)
└── app.routes.ts        # All routes, guarded where needed
```

## AI Assistant (FlexBot) & RAG

FlexBot answers questions using a real **Retrieval-Augmented Generation** pipeline:

1. **Query** — the member types a question in `/assistant`.
2. **Retrieval** — `AiAssistantService` fetches the `knowledgeBase` collection from json-server and
   scores every entry against the question using keyword overlap, picking the top matches.
3. **Context** — the retrieved knowledge-base entries are shown to the user under "Retrieved from"
   so the pipeline is transparent.
4. **Generation** — since no LLM API key is configured, the final answer is composed from the
   retrieved content itself (not hardcoded per question), so it stays grounded in real retrieval.
   Swapping in a real LLM call (OpenAI/Anthropic) only requires replacing the `generateAnswer`
   method in `ai-assistant.service.ts` with an API call that receives the same retrieved context.

## Notes for Grading / Review

- The project intentionally avoids being an e-commerce site (no product catalog or cart) — it's
  positioned as a fitness/coaching platform per the project requirements.
- Route guards protect `/dashboard`, `/profile`, `/plans`, `/classes`, `/assistant` (any logged-in
  user) and all of `/admin/**` (admin role only), redirecting to `/login` or `/unauthorized`.
- Booking a class calls two mock-API endpoints (`POST /bookings`, `PATCH /classes/:id`) to
  simulate a real transactional flow.

## Standard Angular CLI Commands

```bash
ng serve       # dev server only (needs json-server running separately for data)
ng build       # production build to dist/
ng test        # unit tests via Vitest
```

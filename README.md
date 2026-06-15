# ExSell Academy

**The career launchpad for future sales professionals.**

ExSell Academy is one ecosystem with three connected engines:

1. **ExSell Academy** — a self-service online sales training platform (courses, quizzes, CPD certificates).
2. **ExSell Foundation** — a funded learner / scholarship programme.
3. **ExSell Talent Network** — an employer recruitment and placement portal.

This repository contains the platform built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

---

## Tech stack

| Area        | Choice                                             |
| ----------- | -------------------------------------------------- |
| Framework   | Next.js 16 (App Router) + React 19                 |
| Language    | TypeScript                                         |
| Styling     | Tailwind CSS v4 (CSS `@theme` tokens), custom design system |
| Animation   | Framer Motion + CSS keyframes                      |
| Icons       | Lucide + inline brand SVGs                          |
| Forms       | React Hook Form + Zod                              |
| Database    | PostgreSQL + Prisma (schema defined; wiring in a later phase) |

Planned integrations (placeholders in `.env.example`): Clerk (auth), Stripe (payments), Mux (video), S3/R2 (storage).

---

## Getting started

```bash
npm install
cp .env.example .env      # fill in values as needed
npm run dev               # http://localhost:3000
```

### Scripts

| Script                  | Description                          |
| ----------------------- | ------------------------------------ |
| `npm run dev`           | Start the dev server                 |
| `npm run build`         | Production build                     |
| `npm run start`         | Start the production server          |
| `npm run lint`          | ESLint                               |
| `npm run prisma:generate` | Generate the Prisma client         |
| `npm run db:push`       | Push the Prisma schema to your DB    |
| `npm run db:studio`     | Open Prisma Studio                   |

---

## Project structure

```
src/
  app/
    layout.tsx              # root layout (fonts, metadata)
    globals.css             # design system (Tailwind v4 @theme tokens)
    (marketing)/            # public site — shares Navbar + Footer
      page.tsx              # homepage
      courses/              # catalogue + course detail ([slug])
      funded-training/      # ExSell Foundation
      apply/                # funded application flow
      employers/ sponsors/ about/ contact/
      verify/[id]/          # public certificate verification
    (app)/                  # learner dashboard preview (own shell)
      dashboard/
    (auth)/                 # login / register (UI placeholders)
    api/                    # applications + contact endpoints
  components/
    ui/                     # Button, Badge, Card, Section, Accordion, form controls
    layout/                 # Navbar, Footer, sticky CTA, WhatsApp button
    home/                   # homepage hero
    courses/ dashboard/ forms/
    icon.tsx reveal.tsx logo.tsx social-icons.tsx course-card.tsx stat-card.tsx
  lib/
    data/                   # courses + marketing content (authored for the MVP)
    validations/            # Zod schemas (application, contact)
    site.ts types.ts utils.ts
prisma/
  schema.prisma             # full platform data model
```

## Design system

Defined in `src/app/globals.css` via Tailwind v4 `@theme`:

- **Colours** — `brand-*` (deep professional blue), `accent-*` (growth green), `navy`, `ink`, plus standard slate.
- **Type** — Plus Jakarta Sans (display) + Inter (body) via `next/font`.
- **Utilities** — `container-page`, `text-gradient`, `glass`, `shadow-soft`, `shadow-glow`, `bg-grid`.
- **Motion** — `animate-fade-up`, `animate-float`, plus a `<Reveal>` scroll component; honours `prefers-reduced-motion`.

## Data model

`prisma/schema.prisma` models the full platform: users & role profiles (learner / employer / sponsor), courses → modules → lessons → progress, quizzes & attempts, certificates, funded applications, jobs, the candidate pipeline, placements, payments, donations, sponsorships and audit logs.

The MVP UI currently reads authored content from `src/lib/data`. Connecting these models via the Prisma client is the next phase of work.

---

## Roadmap (MVP build order)

- **MVP 1 — Public site + learner platform** _(in progress)_: marketing site, course catalogue & detail, funded application flow, learner dashboard preview, certificate verification, full DB schema.
- **MVP 2 — Foundation**: persist applications, admin review workflow, sponsor allocation.
- **MVP 3 — Employer recruitment portal**: employer accounts, talent pool, candidate filters, interview requests, placement CRM.
- **MVP 4 — Advanced**: real auth, payments, video lessons, AI role-play, LinkedIn badge sharing, team/corporate accounts.

> Note: public-facing statistics and testimonials are intentionally presented as the model / case studies until real outcome data exists — no fabricated numbers.

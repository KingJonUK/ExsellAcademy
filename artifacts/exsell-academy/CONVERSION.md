# ExSell Academy — Next.js → Vite + React conversion conventions

This app was a Next.js 16 App Router project. It is being migrated **in place**
to a client-only **Vite + React + wouter** app with **full visual and functional
parity**. The ORIGINAL DESIGN MUST BE PRESERVED EXACTLY — do not redesign, do not
restyle, do not "improve". Only mechanically convert Next.js constructs to their
client-side equivalents.

Use `// @ts-ignore` freely wherever types fight you. Runtime correctness > types.

## Foundation already built (do NOT recreate)
- `next/link`, `next/image`, `next/navigation`, `next/font/google`, `next/headers`
  are aliased to shims in `src/lib/next-shims/` (via `vite.config.ts` + `tsconfig.json`).
  **Keep existing `import ... from "next/link" | "next/image" | "next/navigation"`
  lines as-is — they resolve to the shims and work.**
- Auth: `src/lib/auth.tsx` exports `useAuth()`, `AuthProvider`, `RequireAuth`,
  and type `Role = "learner" | "admin" | "employer"`. `useAuth()` returns
  `{ authed, signIn(role,password), signOut(role) }`. Route gating is done in
  `App.tsx` via `<RequireAuth>`, so **do not** add redirect-on-unauthed logic in pages.
- Theme/design system lives in `src/index.css` (all original tokens + classes:
  `.glass`, `.glass-card`, `.text-hero`, `.text-display`, `.text-gradient`,
  `.gradient-border`, `.shadow-soft/md/elevated/glow`, `.bg-grid`, `.bg-aurora`,
  `.marquee-mask`, `.container-page`, brand/accent/violet color tokens, animations).
- `src/lib/data/courses.ts`, `src/lib/data/content.ts`, `src/lib/types.ts`,
  `src/lib/site.ts`, `src/lib/validations/*` already exist — reuse them.
- The router in `src/App.tsx` is owned by the main agent. **Do not edit App.tsx.**
  Just make sure every page file has a **default export** component.

## Per-page conversion rules
1. **Convert in place** — edit the existing files under `src/app/...`. Do not move them.
2. Remove `"use client"` and `"use server"` directive strings.
3. **Server components → client components**: remove `async` from the component
   function. Replace any `await prisma.*` / DB calls with reads from your area's
   static demo-data module (see below). The component returns JSX synchronously.
   If a page needs interactivity (forms, toggles, tabs state), use React hooks.
4. **Route params**: replace Next's `{ params }` / `{ searchParams }` page props
   with `useParams()` / `useSearchParams()` imported from `next/navigation`
   (the shim). `params` are now sync objects (no `await params`).
5. **metadata / generateMetadata exports**: delete them. Optionally set
   `document.title` in a `useEffect` if you want, but it is not required.
6. **redirect()** for auth gating: delete — gating is handled by `<RequireAuth>`
   in App.tsx. For navigation after an action (e.g. after login) use
   `useRouter().push(path)` from the `next/navigation` shim, or wouter's `useLocation`.
   For a "not found" record, render the page's existing not-found UI inline.
7. **Server actions** (`actions.ts` files and `<form action={fn}>`):
   - Convert each action into a plain client function (can live in the same
     `actions.ts`, but it must be a normal client function — no `"use server"`).
   - For **contact** and **apply** form submissions: validate with the existing
     zod schemas in `src/lib/validations/`, then simulate success on the client
     (no backend). For applications, generate a reference like
     `EXS-APP-${randomId(8).toUpperCase()}`. Show the existing success UI / toast.
   - For **portal mutations** (admin application status changes, placement
     updates, learner enroll / mark-lesson-complete / quiz submit, employer
     pipeline stage moves): mutate an in-memory copy in your area's demo module
     and reflect it with local React state (`useState`) so the UI updates. Use
     the existing toast (`useToast` from `@/hooks/use-toast`) for feedback.
   - Replace `<form action={fn}>` with a controlled `<form onSubmit={...}>` that
     calls the function and updates state. Preserve all markup/styling.
8. **Auth/session libs** (`getSessionLearner`, `getSessionEmployer`, `isAdmin`,
   etc.): replace with your demo persona object from the demo-data module
   (learner = Sofia Ahmed; employer = Acme Sales Co). For sign in/out on the
   login pages call `useAuth().signIn(role, password)` / `signOut(role)`.

## Layouts
Convert each `layout.tsx` to a normal component `export default function XLayout({ children }: { children: React.ReactNode })`:
- `src/app/layout.tsx` (root): it currently renders `<html><body>` + fonts +
  metadata + providers. **Do NOT render `<html>`/`<body>`** (index.html owns those,
  and `AuthProvider`/`QueryClientProvider`/`Toaster` are mounted in App.tsx).
  Keep only any genuinely shared wrapper markup (usually none) — if it adds no
  wrapper markup, you can skip exporting it / leave a passthrough. Keep JSON-LD if present.
- `(marketing)/layout.tsx`: renders the Navbar + `{children}` + Footer. Keep exactly.
- `(app)/layout.tsx`, `admin/(dashboard)/layout.tsx`,
  `employer/(dashboard)/layout.tsx`: sidebar/header chrome around `{children}`.
  Remove server-side auth checks (handled by RequireAuth). Sign-out buttons call
  `useAuth().signOut(role)` then navigate to the area login.

## Demo data
Source of truth for realistic seed data: `.migration-backup/prisma/seed.ts`
(also `src/lib/data/courses.ts` + `content.ts`). Build ONE demo module for your
area and import it from your pages:
- Marketing: mostly uses existing `content.ts` / `courses.ts`. Add a small
  `src/lib/data/marketing-demo.ts` only if a page needs extra static data
  (e.g. sponsors list, a verifiable certificate for `/verify/:id`).
- Learner: `src/lib/data/learner-demo.ts` — Sofia's enrollments (prospecting-
  essentials 40% IN_PROGRESS, ai-for-sales 20% IN_PROGRESS, interview-readiness
  NOT_STARTED), lessonProgress (first lessons completed), certificates, the final
  quiz for prospecting-essentials (5 questions).
- Admin: `src/lib/data/admin-demo.ts` — ~6 applications (varied statuses),
  3 sponsors, placements (incl. Sofia £3500 PENDING).
- Employer: `src/lib/data/employer-demo.ts` — ~10 candidates (talent pool w/
  scores + certs), 3 job roles, a pipeline (Chloe / Marcus / Sofia at stages),
  placements. Acme Sales Co is the demo employer.
Match the shapes the original pages expect (check each page's prisma query/usage).
Keep types in/near `src/lib/types.ts`.

## Verify your area
After converting, run `pnpm --filter @workspace/exsell-academy exec tsc --noEmit`
is NOT required (types may be loose). Instead ensure there are no obvious runtime
import errors and the pages render. The main agent runs the dev server + e2e tests.

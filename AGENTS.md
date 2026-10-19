# Project instructions

## Review before pushing

The user must review changes before they are pushed to GitHub. Keep edits local,
run the relevant checks, and present the result for review. Push only after the
user explicitly approves the push following that review. Earlier authorization
to create or push this repository does not authorize future pushes.

## Project and setup

This is Mark Julius's static portfolio and resume: React 18, TypeScript, Vite,
React Router 7, and Tailwind CSS 4. There is no application backend. Use Node.js
22.13+ and npm, with `npm ci` to install the committed lockfile.

Read `README.md` for development and PDF export, `SEO.md` for indexing and hosting,
and `AGENT_SETUP.md` for coding-tool entry points and reusable workflows.

## Commands

Run commands from the repository root.

| Command                | Purpose                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run dev`          | Development at `http://127.0.0.1:5173/`                           |
| `npm run check`        | Formatting, lint, SEO tests, TypeScript/build, and built-site SEO |
| `npm run typecheck`    | TypeScript without generating output                              |
| `npm run lint`         | ESLint with zero warnings                                         |
| `npm run test:seo`     | Node tests for configuration, metadata, and serialization         |
| `npm run build`        | TypeScript, Vite bundle, and static prerendering into `dist/`     |
| `npm run seo:check`    | Validate the current build against its environment                |
| `npm run build:public` | Build and validate public indexing settings locally               |
| `npm run build:vercel` | Public production build or noindex Vercel preview                 |
| `npm run preview`      | Serve `dist/` at `http://127.0.0.1:4173/`                         |
| `npm run format:check` | Check Prettier formatting                                         |

Format changed files with `npx --no-install prettier --write <paths>` rather than
formatting unrelated files. There is no general `npm test` script; use
`npm run test:seo`. On PowerShell, use `npm.cmd`/`npx.cmd` when required.

## Where changes belong

- `src/data/`: typed public content. Identity and contacts live in `profile.ts`;
  resume content in `resume.ts`; projects and case studies in their matching files;
  page metadata in `metadata.ts`; page copy in `pages.ts`.
- `src/components/` and `src/pages/`: shared UI and routed screens. Keep content
  in the existing data modules rather than duplicating it in JSX.
- `src/styles/`: shared styling; use `tokens.css` for theme values and
  `resume.css` for print layout. Follow the existing CSS and component patterns.
- `src/hooks/`: theme, metadata, and motion behavior. Browser globals must stay
  safe during server rendering; effects must clean up listeners and animations.
- `src/types/`: content interfaces. Keep strict TypeScript; avoid `any` and
  suppression comments used to hide errors.
- `src/utils/seo.ts` and `src/utils/siteConfig.ts`: shared metadata and public
  environment validation. Keep prerendered and client metadata consistent.
- `scripts/`: prerendering, build checks, social-card composition, and PDF export.
- `public/`: maintained assets. `dist/` is generated and must not be edited.

## Project invariants

- Preserve the supplied identity, employment details, contribution boundaries, and
  claims. Do not invent achievements, statistics, client names, or AI experience.
  Client projects use generic public titles; private source and review evidence
  stay out of the repository. `/docs/` is deliberately ignored for local notes.
- Use `profile.name` (Mark Julius) for website display and `profile.fullName`
  (Mark Julius P. Mella) for the resume and formal author/structured-data identity.
- Case studies need matching project slugs and 200–400 words of paragraph text.
  When changing routes or slugs, update client routing, prerendering, metadata,
  internal links, preview handling, and Vercel redirects as applicable.
- Production serves prerendered HTML and hydrates it. Preserve useful content and
  links without JavaScript, and avoid server/client first-render differences.
- Preserve keyboard access, visible focus, both themes, responsive layouts, and
  reduced-motion behavior. Motion is finite and must not block navigation or print.
- The resume must fit two A4 pages with selectable text. Changes affecting its
  content or print layout need a regenerated, reviewed PDF; use the existing
  exporter and instructions in `README.md`.
- Public builds use a validated root HTTPS origin. Unconfigured local builds and
  Vercel previews remain noindex; preview builds must not inherit public canonicals
  or a sitemap. Missing routes return the custom HTTP 404, not the home page.
- Serialize JSON-LD through the existing safe helper. All `VITE_` values are public;
  keep credentials out of them and out of tracked files. Contact actions open an
  email draft; there is no form submission service.
- Keep personal phone numbers out of the public website and resume, including
  source data, generated HTML/JavaScript, metadata, and the downloadable PDF.
  Publish email and professional profile links for contact instead.

## Working and validation

Inspect `git status` and the relevant code before editing. Preserve existing user
changes and keep the diff focused on the request. Use the existing dependencies
and lockfile unless a dependency change is necessary for the task.

For application or tooling changes, run `npm run check`. For documentation-only
changes, formatting and link/command verification are usually sufficient. Add
behavioral tests when changing validation or metadata logic; visual changes also
need targeted browser review. Use the production preview for routing, static HTML,
and hydration checks. Record checks actually performed and any unavailable browser
or PDF checks without claiming they passed.

Before handing back changes, inspect the final diff and summarize the behavior,
validation results, and remaining limitations. Keep changes local for review;
building locally does not authorize publishing or deployment.

## Review guidelines

Prioritize reproducible regressions: hydration failures, broken static routes or
links, incorrect public/preview indexing, inaccessible interactions, print overflow,
and exposed private content. Cite the affected file and line with each finding,
describe the triggering condition and user impact, and distinguish confirmed bugs
from unverified concerns. Report no findings when none are supported by evidence.

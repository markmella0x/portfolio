---
name: portfolio-check
description: Validate portfolio changes with repository checks and targeted browser review before a local handoff.
---

# Validate the portfolio

Read `AGENTS.md` and inspect the working diff, including untracked files. Run all
commands from the repository root. Install dependencies with `npm ci` if missing.

For application or tooling changes, run `npm run check`. It stops on the first
failure: fix failures introduced by the change, then rerun the affected checks.
Report pre-existing failures separately. For documentation-only work, use
`npm run format:check` and verify referenced files, links, and commands.

The build and SEO check must use the same environment. `npm run check` validates
the configured local build. When public URL, metadata, routing, or hosting behavior
changes, also run `npm run build:public`; it builds and checks public output without
deploying. For Vercel preview changes, run `npm run build:vercel` with
`VERCEL_ENV=preview` and a valid `VITE_SITE_URL` set in the process environment to
verify that the public origin is cleared. Do not run builds concurrently: they
share `dist/`.

For visible UI, navigation, or motion changes, serve the completed build with
`npm run preview` and use available browser tooling to review affected routes:

- Phone and desktop layouts, light and dark themes, keyboard navigation and focus.
- Reduced motion, console/hydration errors, and meaningful HTML without JavaScript.
- Direct route loads, expected redirects, anchors, and a missing route's HTTP 404
  when route handling changes.
- Print layout and the downloadable PDF when resume output changes; follow
  `README.md` for export.

Stop only servers started for this task. Inspect `git diff --check` and the final
diff. Report commands and results, the build mode left in `dist/`, and any browser
or PDF checks that were unavailable. Leave tracked changes local for user review.

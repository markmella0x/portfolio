# Portfolio coding instructions

Read [AGENTS.md](../AGENTS.md) for the shared project rules and
[AGENT_SETUP.md](../AGENT_SETUP.md) for reusable workflows.

- This is a static React 18 / TypeScript / Vite portfolio using React Router 7
  and Tailwind CSS 4. Use Node.js 22.13+ and npm; install with `npm ci`.
- Run `npm run check` for application or tooling changes. It checks formatting,
  lint, SEO tests, TypeScript, the production build, and built-site metadata/links.
  `npm run dev` uses port 5173; `npm run preview` uses port 4173.
- Edit typed public content in `src/data/`, UI in `src/components/` and `src/pages/`,
  and shared theme values in `src/styles/tokens.css`. Follow existing patterns.
- Preserve prerendering, hydration, useful HTML without JavaScript, keyboard access,
  both themes, reduced motion, and the two-page A4 resume. Resume changes that
  affect the PDF need the existing export procedure in `README.md`.
- Route changes must keep client routes, prerendering, metadata, links, preview
  handling, and Vercel redirects consistent. Local unconfigured builds and Vercel
  previews stay noindex; unknown paths must return HTTP 404.
- Use supplied facts and generic client-project titles. Never include private
  client source, review evidence, credentials, or secrets in public `VITE_` values.
- Preserve unrelated user edits, report checks actually performed, and keep the
  final diff available for review. Do not publish or deploy without authorization.
- The user must review changes before any GitHub push, then explicitly approve
  that push. Earlier repository or push approval does not authorize future pushes.

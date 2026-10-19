---
name: portfolio-resume
description: Update portfolio resume content or print layout and regenerate the matching selectable-text two-page A4 PDF.
---

# Update the resume and PDF

Read `AGENTS.md` and the resume export section of `README.md`. Resume content lives
in `src/data/resume.ts`, with identity and contacts in `src/data/profile.ts`;
`src/components/ResumeDocument.tsx` and `src/styles/resume.css` define print output.
Check related About, timeline, and project copy only when the requested change
affects their consistency. Use supplied facts and keep contribution claims precise.

Keep the web preview, text, links, and PDF aligned. Start the dev server if needed,
then use the documented Playwright CLI commands with Chrome and
`scripts/export-resume.js` from the repository root. Reuse that exporter: it checks
two A4 sheets for overflow, waits for fonts, and writes the selectable-text PDF to
`public/resume/Mark-Julius-P-Mella-Resume.pdf`.

Inspect both exported pages for clipping, overlap, page breaks, and legible text.
Use PDF text extraction when available to check selectable content and updated
facts. Rebuild after export so `dist/` contains the updated download, then run
`npm run check`. Review the web resume in both themes if its visible layout changed.

If Chrome, browser tooling, or PDF inspection is unavailable, complete the source
work and state precisely that PDF regeneration or review remains incomplete. Do
not describe a stale PDF as synchronized or bypass the exporter's overflow check.
Stop only browser sessions and servers started for this task. Present source and
PDF changes locally for user review before any push.

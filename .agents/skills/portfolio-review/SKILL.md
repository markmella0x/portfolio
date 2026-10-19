---
name: portfolio-review
description: Review a portfolio diff for concrete functional, accessibility, SEO, hydration, and resume regressions without editing source files.
---

# Review portfolio changes

Read `AGENTS.md`. Honor a supplied comparison target. Otherwise inspect staged and
unstaged changes against `HEAD`, plus relevant untracked files; state the scope.
Read affected files and their callers before making a finding. Review source
without applying fixes or formatting unless the user also requests edits.

Focus on behavior changed by the diff:

- Client routing and static prerendering agree; links, slugs, redirects, and custom
  404 behavior remain correct. Case studies still match projects and word limits.
- Initial rendering hydrates cleanly; browser APIs do not break server rendering.
- Public metadata and sitemap agree, previews stay noindex, and JSON-LD uses the
  safe serializer. No private content or credentials are introduced.
- Theme, keyboard and screen-reader behavior, reduced motion, and responsive
  layouts remain usable. Effects release listeners and animations.
- Resume content stays consistent with the supplied facts and downloadable PDF;
  print changes fit the existing two A4 pages.

Use targeted existing checks to verify suspected bugs. A local build writes to
ignored `dist/`; record that side effect when relevant. Do not present a passing
build as proof of browser, accessibility, or PDF behavior.

Return findings by severity with a file and line, concrete trigger, impact, and
supporting evidence. Skip cosmetic preferences and speculative problems. If no
actionable issues are found, say so and identify material verification gaps.
Keep review output in the conversation; local editorial evidence belongs outside
tracked public documentation. Do not commit, push, or deploy as part of a review.

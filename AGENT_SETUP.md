# Coding agents

This repository supports Codex, Claude Code, and GitHub Copilot. Shared rules live
in [AGENTS.md](AGENTS.md); keep architecture, commands, validation requirements, and
the review-before-push policy there. Tool entry points refer back to those rules.

## Start working

Use Node.js 22.13+ and npm. From the repository root:

```sh
npm ci
npm run check
```

Open your coding tool in this directory and give it a concrete task. Tool
installation and account authentication are managed on your machine; this setup
needs no API keys, hosted agent service, or additional npm dependencies.

| Tool           | Project instructions                                                          | Reusable workflows                                                                         |
| -------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Codex          | `AGENTS.md`                                                                   | `.agents/skills/`; mention `$portfolio-check`, `$portfolio-review`, or `$portfolio-resume` |
| Claude Code    | `CLAUDE.md` imports `AGENTS.md`                                               | `/portfolio-check`, `/portfolio-review`, `/portfolio-resume` via `.claude/commands/`       |
| GitHub Copilot | `.github/copilot-instructions.md` and `AGENTS.md` in supported agent surfaces | `.agents/skills/`; ask it to use a workflow by name                                        |

Codex discovers repository instructions and skills from the project tree. Claude's
small command adapters read the shared skill files, so workflows stay in one place
and work without filesystem symlinks. Copilot supports the shared skill directory;
instruction and skill availability can depend on the client and its settings.
If a workflow is missing, reopen the project/session and ask the tool to read its
`SKILL.md` directly. In Claude, `/memory` can show loaded instruction files.

For discovery details, see the official [OpenAI AGENTS.md documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
and [skills documentation](https://learn.chatgpt.com/docs/build-skills),
[Claude memory](https://code.claude.com/docs/en/memory) and
[commands/skills](https://code.claude.com/docs/en/skills), and
[Copilot instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions)
and [skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills).

## Workflows

- [portfolio-check](.agents/skills/portfolio-check/SKILL.md) runs relevant checks,
  handles build modes, and guides targeted browser review.
- [portfolio-review](.agents/skills/portfolio-review/SKILL.md) reviews a diff for
  reproducible regressions and returns findings without editing source.
- [portfolio-resume](.agents/skills/portfolio-resume/SKILL.md) updates the web resume
  and matching two-page A4 PDF using the existing exporter.

Example requests:

```text
Add a project card using the existing data model and styling. Follow AGENTS.md.
Use portfolio-check to validate the current changes and report anything unverified.
Use portfolio-review to review the staged and unstaged diff against HEAD.
Use portfolio-resume to update the resume with these supplied details: ...
```

In Codex, `$portfolio-review` explicitly selects that skill. In Claude Code,
`/portfolio-review` selects the matching command. In Copilot, ask it to use
`portfolio-review`, or point it at the linked `SKILL.md`.

## Checks and handoff

`npm run check` runs Prettier, ESLint, the existing Node SEO tests, TypeScript and
the production bundle/prerenderer, then checks the generated HTML, metadata, links,
and assets. `npm run typecheck` provides a quicker TypeScript-only check. Neither
command publishes the site. See [README.md](README.md) for individual commands,
browser preview, and PDF export; see [SEO.md](SEO.md) for public indexing.

Builds share `dist/`, so run them sequentially. The standard check uses the current
local environment. `npm run build:public` separately builds and validates public
SEO. Use `npm run build:vercel` with `VERCEL_ENV=preview` to check a noindex Vercel
preview. A local build cannot verify the deployed host's HTTP responses or indexing.

The GitHub validation workflow runs checks for pull requests and pushes, plus
public and Vercel preview builds. It uses read-only repository permissions and does
not deploy or run a paid AI service. It starts running on GitHub only after this
setup has been reviewed and an approved push makes it available there.

Before any push, the agent presents the local diff, checks run, and remaining
limitations. The user reviews that result and then explicitly approves the push.
Approval of an earlier push does not authorize another one. Changes to the reviewed
result need another review and push approval. The PR template records that handoff.
Repository instructions guide agents; they do not enforce Git permissions or
replace hosting/account controls.

## Maintenance and personal configuration

Keep tool-specific entry points short. Maintain shared workflows in `.agents/skills/`;
update a Claude command adapter only when its workflow name or entry path changes.
Use ordinary Markdown with `name` and `description` YAML frontmatter in each skill;
no generated adapters or global skill installation are required.

Personal Claude instructions belong in ignored `CLAUDE.local.md`; local settings
belong in `.claude/settings.local.json`. Keep model choices, tool permissions,
credentials, and personal MCP integrations in your tool's own local configuration.
This repository does not alter those settings. Local editorial evidence remains
in the existing ignored `docs/` directory.

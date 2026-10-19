# Mark Julius - Portfolio

Personal portfolio for **Mark Julius**, a software engineer with 6+ years across freelance and product development, transitioning into agentic AI engineering. The resume uses the full name **Mark Julius P. Mella**. The headline is **Software Engineer | Agentic AI Engineer**. The site presents frontend development, API integration, performance, SEO, and agentic AI workflows.

Built with React 18, TypeScript, Vite, Tailwind CSS 4, and React Router 7. The build produces static HTML for the home, About, Contact, resume, three case studies, and error pages.

Public website: [markjulius.vercel.app](https://markjulius.vercel.app/).

## Features

- Twelve project summaries with personal contributions, technology stacks, and results; three detailed case studies.
- A dedicated About page and Contact page, with direct email enquiries for clients and recruiters, LinkedIn, GitHub, and resume links.
- Responsive light and dark themes, keyboard navigation, visible focus, and reduced-motion support.
- A skippable first-visit introduction and finite project illustrations.
- A two-page, selectable-text A4 resume with a web preview and PDF download.
- Route-specific metadata, social cards, connected Person/ProfilePage JSON-LD, and breadcrumbs.
- Validated public SEO settings, a production sitemap, Search Console verification support, and checks for broken links and launch configuration.
- Self-hosted Archivo font, with its license in `public/fonts/LICENSE.txt`.

Client projects use generic titles and original descriptions and diagrams. Client source code, private repository links, internal identifiers, credentials, and contribution-review evidence are excluded. Employment history includes approved employer and product names.

## Run locally

Use Node.js **22.13 or newer** and npm.

```sh
npm ci
npm run dev
```

Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/).

To review a production build:

```sh
npm run build
npm run preview
```

Open [http://127.0.0.1:4173/](http://127.0.0.1:4173/). On Windows PowerShell, use `npm.cmd` and `npx.cmd` if script execution policy blocks the ordinary commands.

## Commands

| Command                | Purpose                                                |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Start the local development server                     |
| `npm run build`        | Check TypeScript, bundle, and prerender static pages   |
| `npm run build:public` | Build and validate SEO for the confirmed public URL    |
| `npm run build:vercel` | Build public production or a noindex Vercel preview    |
| `npm run preview`      | Serve the production build with redirects and 404s     |
| `npm run check`        | Run formatting, lint, SEO tests, build, and SEO checks |
| `npm run typecheck`    | Check strict TypeScript without generating output      |
| `npm run lint`         | Check ESLint rules with zero warnings allowed          |
| `npm run seo:check`    | Validate the built pages, metadata, links and assets   |
| `npm run test:seo`     | Test public/preview indexing and configuration guards  |
| `npm run format:check` | Check formatting                                       |
| `npm run format`       | Apply formatting                                       |

## Coding agents

Codex, Claude Code, and GitHub Copilot share the project rules in
[AGENTS.md](AGENTS.md). The setup includes reusable validation, code review, and
resume workflows, Claude commands, Copilot instructions, and GitHub validation.
See [AGENT_SETUP.md](AGENT_SETUP.md) for entry points, example requests, and usage.
Agent changes stay local until reviewed; each push needs explicit approval after
that review.

## Project structure

```text
src/
  components/    Shared sections, navigation, illustrations, and resume document
  data/          Profile, projects, skills, career, resume, and SEO configuration
  hooks/         Theme, metadata, and finite diagram motion
  pages/         Home, About, Contact, resume, case study, and not found
  styles/        Theme tokens, responsive layouts, motion, and print styles
  types/         Content interfaces
  utils/         Shared SEO generation and safe JSON-LD serialization
scripts/         Prerendering, social-image composition, and PDF export
public/          Favicon, font and license, social image, and resume PDF
```

Build output, dependencies, local browser artifacts, environment files, and editorial review notes are gitignored.

## Edit content

Update `src/data/profile.ts` for identity and contacts, `resume.ts` for employment and resume copy, and `projects.ts` and `caseStudies.ts` for selected work. Skills, career milestones, workflow copy, and labels have their own files in `src/data/`.

Public contact uses email and professional profile links. Personal phone numbers
are excluded from the website, source data, metadata, and downloadable resume PDF;
share a number privately when appropriate after an initial conversation.

The full biography lives at `/about/`; `/contact/` offers email enquiries for projects and recruitment. Contact links open a Gmail compose tab on desktop, or the visitor's email app on phones and tablets. Project and recruitment links include the recipient and subject, with a blank message body. The main email link includes an editable greeting. Gmail may require sign-in; the visitor writes and sends the message. Static HTML without JavaScript and résumé PDF contacts retain standard email links. Edit the draft text and page-specific copy in `src/data/pages.ts`. These pages have unique metadata and AboutPage/ContactPage structured data. Home-page previews link to them, while existing `/#about` and `/#contact` links still reach the corresponding previews. There is no message-submission service to configure.

A case study must have a matching project slug and 200-400 words of body text. The build validates its length and generates its route and sitemap entry. Theme colors live in `src/styles/tokens.css`.

## Regenerate the resume PDF

After editing resume content, start the dev server and run the following in a second terminal from the project root. Chrome must be installed.

```sh
npx --yes --package @playwright/cli playwright-cli --session resume-export open http://127.0.0.1:5173/resume/ --browser chrome
npx --yes --package @playwright/cli playwright-cli --session resume-export run-code --filename scripts/export-resume.js
npx --yes --package @playwright/cli playwright-cli --session resume-export close
npm run build
```

The export checks that content fits two A4 pages before writing `public/resume/Mark-Julius-P-Mella-Resume.pdf`. Rebuild afterward to update the production download.

## Website hosting

The confirmed public address is `https://markjulius.vercel.app/`, stored in `profile.contact.website` and included in the résumé. `npm run build:public` uses it by default; an explicit `VITE_SITE_URL` can override it. The same build setting controls prerendered and client-side metadata, canonical links, structured-data URLs, social images, robots, and the seven-page sitemap. Invalid public settings stop the build. Ordinary local builds remain noindex unless a public URL is configured in their environment. Use `npm run seo:check -- --public` to recheck a public build, or `npm run seo:check` for an unconfigured preview build.

`vercel.json` selects `npm run build:vercel` and the `dist` output directory. Production deployments use the confirmed public address. Preview and development deployments explicitly clear the public SEO origin, even if a production URL was configured on the host; they remain noindex without public canonicals or a sitemap. The configuration also normalizes known URL variants and provides an HTTP canonical header for the PDF pointing to the HTML résumé. Existing generated routes and the custom HTTP 404 page use Vercel's static file serving. No catch-all rewrite to the home page is added. Repository changes must be reviewed before any push or deployment; the hosting configuration takes effect only after deployment.

`VITE_GOOGLE_SITE_VERIFICATION` optionally adds the actual Search Console HTML verification token. Leave it empty when using DNS verification. Both environment values are public website configuration; never place credentials in `VITE_` variables. See [SEO.md](SEO.md) for the complete launch and Google Search Console setup.

The site expects hosting at the domain root. Configure the host to serve each generated route's `index.html`, including `about/index.html`, `contact/index.html`, and `resume/index.html`; normalize URL variants; and return `404.html` with HTTP 404 for missing paths. The local Vite preview implements these behaviors; a static host needs equivalent configuration. A repository subpath requires additional base-path and router configuration and is rejected by the current public URL setting.

## Validation

Checks cover strict TypeScript, production build, lint, formatting, dependency audit, route metadata, and resume text extraction. Automated browser review covers Chrome, Firefox, and WebKit, both themes, phone through desktop layouts, enlarged text, keyboard and touch emulation, section anchors, downloads, and JavaScript-disabled pages.

Accessibility scans cover WCAG A/AA rules through 2.2; automated scans do not establish complete accessibility compliance. Physical-device behavior and a specific applicant-tracking system's resume parsing remain unverified.

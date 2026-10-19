# Search setup and launch

The confirmed public website is [https://markjulius.vercel.app/](https://markjulius.vercel.app/), hosted on Vercel. The portfolio has seven prerendered content pages plus a noindex error page. Search engines receive the page content and metadata in HTML without needing JavaScript. Production builds use this address for canonical links, structured data, social images, robots and the sitemap. Local and Vercel review builds remain noindex. Configuration changes affect the live site only after a reviewed production deployment.

## Identity and page information

The public display name is **Mark Julius**; the résumé and formal identity use **Mark Julius P. Mella**. Person structured data connects the full name and display-name alias to the supplied GitHub and LinkedIn profiles. The headline remains **Software Engineer | Agentic AI Engineer**, with supporting copy explaining the transition into agentic AI engineering and the 6+ years of software development experience.

| Page                                   | Search information                                                                                    |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `/`                                    | Full name, engineering roles, experience and API/frontend focus; ProfilePage, Person and WebSite data |
| `/about/`                              | Biography and career direction; AboutPage/ProfilePage and Person data                                 |
| `/contact/`                            | Project and recruitment contact options; ContactPage and Person data                                  |
| `/resume/`                             | Full name, software engineer résumé, experience and downloadable PDF; ProfilePage and Person data     |
| `/projects/design-token-system`        | Generic project title, contribution summary, skills and authored CreativeWork data                    |
| `/projects/retail-betting-application` | Generic project title, contribution summary, skills and authored CreativeWork data                    |
| `/projects/frontend-performance`       | Generic project title, contribution summary, skills and authored CreativeWork data                    |
| Missing pages                          | Noindex, no canonical link and no profile markup; must return HTTP 404                                |

Each content page has a distinct title and description, one H1, crawlable internal links, a language declaration, and Open Graph/Twitter card information with a 1200 × 630 PNG and alternative text. Secondary pages include breadcrumb structured data. The favicon is an existing square SVG. Public builds add absolute canonical URLs and a matching sitemap; the error page is excluded.

Structured data uses supplied facts. There is no supplied portrait, so the text-based social card is page imagery and is not presented as a Person profile photo. No additional personal details are required to enable the current markup. Google may choose a different title, snippet or site name, and structured data does not guarantee enhanced search results. See Google's [profile-page guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page) and [site-name guidance](https://developers.google.com/search/docs/appearance/site-names).

## Set the real public address

1. The canonical address is `https://markjulius.vercel.app/`, stored in `profile.contact.website`. `npm run build:public` defaults to that confirmed address. The résumé includes the same public portfolio link.
2. An explicit `VITE_SITE_URL` can override the public-build address. Use a real root HTTPS address with no repository subpath, query or fragment. `.env.example` documents the supplied Vercel address and optional verification setting. Keep any actual environment files local or configure them on the host.
3. The build passes the same URL to Vite and static rendering. This populates canonical links, social image URLs, structured-data identifiers, `sitemap.xml`, and the sitemap entry in `robots.txt`.
4. If verifying Search Console with an HTML tag, set `VITE_GOOGLE_SITE_VERIFICATION` to only the token inside the tag's `content` attribute. Leave it empty for DNS verification. Do not put the full tag in this field. Verification tokens are public; these variables must never contain passwords or API keys.
5. Run `npm run test:seo`, then `npm run build:public`. The public build rejects empty explicit settings, local addresses, reserved example addresses, and unsupported subpaths. It validates the generated SEO output before it can be used as a reviewed release artifact. Use `npm run seo:check -- --public` to recheck that artifact.
6. Review `dist/` and the website before publishing. `vercel.json` selects `npm run build:vercel`, which enables public indexing only when `VERCEL_ENV=production`; preview and development builds explicitly clear the public SEO origin. Vercel previews therefore stay noindex even if the host has a production `VITE_SITE_URL` value. Keep Vercel's automatically exposed system environment variables enabled so the build receives `VERCEL_ENV`; an absent value keeps the build noindex. The output directory is `dist`. Review and fresh push approval are required before publishing changes.

Use `npm run build` for local review. Without `VITE_SITE_URL`, pages are `noindex`, canonical links are omitted, and no sitemap is generated. Robots allow crawling so a crawler can read the noindex instruction. After changing environment values, rebuild; they are embedded at build time. Vercel's production/preview distinction uses its documented [system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables). Vite's [environment configuration](https://vite.dev/guide/env-and-mode) describes how build-time values are embedded.

## Hosting requirements

Publish the complete `dist` directory. Vercel uses `npm run build:vercel` from `vercel.json`; standalone public builds use `npm run build:public`. No server-side application or contact backend is needed.

The local preview implements the route behavior below. `vercel.json` adds permanent redirects for known URL variants and an HTTP canonical header for the PDF; Vercel serves the generated HTML and custom `404.html` as static files. These host-specific rules must be checked on the live site after deployment. The configuration follows Vercel's [static configuration reference](https://vercel.com/docs/project-configuration/vercel-json).

| Request                                                                        | Expected response                                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `/`, `/about/`, `/contact/`, `/resume/`                                        | Their generated HTML, HTTP 200                                           |
| Each extensionless `/projects/<slug>`                                          | Its generated `projects/<slug>/index.html`, HTTP 200                     |
| `/about`, `/contact`, `/resume`                                                | Permanent redirect to the corresponding trailing-slash URL               |
| `/index.html`, known route `/index.html` variants, case-study trailing slashes | Permanent redirect to the canonical route; preserve query parameters     |
| Unknown page, including a nested unknown route                                 | `404.html` with HTTP 404, rather than a home-page response with HTTP 200 |
| `/robots.txt`, `/sitemap.xml`, `/og-image.png`, `/favicon.svg`                 | Publicly accessible files with correct content types                     |
| `/resume/Mark-Julius-P-Mella-Resume.pdf`                                       | Publicly accessible PDF download                                         |

Redirect HTTP to HTTPS and alternate domain names to the selected canonical hostname. Serve every HTML route independently; do not rewrite all unknown paths to `/index.html`. Assets, metadata and page content must remain accessible without authentication. Check that the hosting service adds no production `X-Robots-Tag: noindex` header. For the résumé PDF, the host can optionally send an HTTP `Link` header with `rel="canonical"` pointing to the absolute `/resume/` address, so the HTML résumé is the preferred search version. Google's [canonical URL guide](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) covers PDF headers.

After deployment, verify the responses above on the actual hostname and check the rendered canonical tags, robots and sitemap. Local checks cannot establish production HTTP behavior or Google indexing.

## Connect Google Search Console

1. Add a URL-prefix property for `https://markjulius.vercel.app/` in [Google Search Console](https://search.google.com/search-console/). This is a hosting subdomain; use an available URL-prefix verification method rather than attempting DNS verification for the Vercel-owned parent domain.
2. For HTML-tag verification, add Google's actual token through `VITE_GOOGLE_SITE_VERIFICATION`, rebuild, review, and deploy. Confirm the token appears in the live homepage source before clicking **Verify**. Retain the token afterward. DNS verification does not require the HTML token. Follow Google's [ownership verification instructions](https://support.google.com/webmasters/answer/9008080).
3. After deployment, submit `https://markjulius.vercel.app/sitemap.xml` in the Sitemaps report. Its seven URLs must match the confirmed canonical hostname. A sitemap supports discovery; it does not guarantee indexing or ranking. See Google's [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
4. Inspect the live home, About, Contact, résumé and project URLs. Run the live URL test, resolve any crawl/indexing errors, and request indexing for the important pages. Check ProfilePage/Breadcrumb markup with the [Rich Results Test](https://search.google.com/test/rich-results) and WebSite markup with the [Schema Markup Validator](https://validator.schema.org/).
5. The résumé now links to the supplied public address; regenerate the two-page PDF whenever that link changes. The website fields of existing professional profiles can use the same address. Profile updates are separate actions requiring the user's authorization.
6. Monitor Page indexing and Performance reports for searches using **Mark Julius** and **Mark Julius P. Mella**, including impressions, clicks and the landing pages. Use the [Search Console getting-started guide](https://developers.google.com/search/docs/monitor-debug/search-console-start). Google ownership verification, sitemap submission and indexing have not been performed by the local build. No Search Console verification token was supplied, so none is fabricated.

## Repeatable checks

`npm run seo:check` validates the current build against the configured production environment. It checks unique metadata, static headings, page types and identity links, canonical consistency, indexing directives, verification-tag configuration, all seven sitemap URLs, crawlable navigation and section anchors, social image dimensions, favicon and résumé PDF. `npm run build:public` runs this check in public mode after building.

`npm run test:seo` checks configuration rejection, preview/public indexing, the profile identity connection, error-page behavior and safe JSON-LD serialization. A passing local check establishes the generated site's technical setup; it does not promise a particular Google position or validate a hosting provider that has not been configured.

# Search setup and launch

The portfolio has seven prerendered content pages plus a noindex error page. Search engines receive the page content and metadata in HTML without needing JavaScript. The public website address and hosting provider have not been supplied yet; Google cannot discover a local preview as a public portfolio.

## Identity and page information

The public display name is **Mark Julius**. The full identity is **Mark Julius P. Mella**, matching the résumé. Person structured data connects these names to the supplied GitHub and LinkedIn profiles. The headline remains **Software Engineer | Agentic AI Engineer**, with supporting copy explaining the transition into agentic AI engineering and the 6+ years of software development experience.

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

1. Choose the final HTTPS domain or hosting address. Use the domain root, with no repository subpath, query or fragment. Decide whether the canonical hostname includes `www` and redirect the other version to it.
2. Copy `.env.example` to `.env.production.local`, or add the same variables in the hosting service's production build settings.
3. Set `VITE_SITE_URL` to that actual address. This single setting populates canonical links, social image URLs, structured-data identifiers, `sitemap.xml`, and the sitemap entry in `robots.txt`.
4. If verifying Search Console with an HTML tag, set `VITE_GOOGLE_SITE_VERIFICATION` to only the token inside the tag's `content` attribute. Leave it empty for DNS verification. Do not put the full tag in this field. Verification tokens are public; these variables must never contain passwords or API keys.
5. Run `npm run test:seo`, then `npm run build:public`. The public build stops if the URL is missing, local, a reserved example address, or an unsupported subpath. It also validates the generated SEO output before it can be used as a reviewed release artifact.
6. Review `dist/` and the website before publishing. Deploy that reviewed output using the selected host. Publishing is a separate step from building or pushing a repository.

Use `npm run build` for local review. Without `VITE_SITE_URL`, pages are `noindex`, canonical links are omitted, and no sitemap is generated. Robots allow crawling so a crawler can read the noindex instruction. Keep public URL settings unset on any publicly reachable staging deployment that should stay out of search. After changing environment values, rebuild; they are embedded at build time. This follows [Vite's environment configuration](https://vite.dev/guide/env-and-mode).

## Hosting requirements

Publish the complete `dist` directory. The build command is `npm run build:public`; the output directory is `dist`. No server-side application or contact backend is needed.

The hosting service must implement these behaviors. The local preview already demonstrates them; hosting configuration will depend on the chosen provider.

| Request                                                                        | Expected response                                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `/`, `/about/`, `/contact/`, `/resume/`                                        | Their generated HTML, HTTP 200                                           |
| Each extensionless `/projects/<slug>`                                          | Its generated `projects/<slug>/index.html`, HTTP 200                     |
| `/about`, `/contact`, `/resume`                                                | Permanent redirect to the corresponding trailing-slash URL               |
| `/index.html`, known route `/index.html` variants, case-study trailing slashes | Permanent redirect to the canonical route; preserve query parameters     |
| Unknown page, including a nested unknown route                                 | `404.html` with HTTP 404, rather than a home-page response with HTTP 200 |
| `/robots.txt`, `/sitemap.xml`, `/og-image.png`, `/favicon.svg`                 | Publicly accessible files with correct content types                     |
| `/resume/Mark-Julius-Mella-Resume.pdf`                                         | Publicly accessible PDF download                                         |

Redirect HTTP to HTTPS and alternate domain names to the selected canonical hostname. Serve every HTML route independently; do not rewrite all unknown paths to `/index.html`. Assets, metadata and page content must remain accessible without authentication. Check that the hosting service adds no production `X-Robots-Tag: noindex` header. For the résumé PDF, the host can optionally send an HTTP `Link` header with `rel="canonical"` pointing to the absolute `/resume/` address, so the HTML résumé is the preferred search version. Google's [canonical URL guide](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) covers PDF headers.

After deployment, verify the responses above on the actual hostname and check the rendered canonical tags, robots and sitemap. Local checks cannot establish production HTTP behavior or Google indexing.

## Connect Google Search Console

1. Add the website in [Google Search Console](https://search.google.com/search-console/). For a domain you control, use a Domain property and the DNS verification record Google supplies. For a hosting subdomain, use a URL-prefix property matching the final HTTPS address and an available verification method.
2. For HTML-tag verification, add Google's actual token through `VITE_GOOGLE_SITE_VERIFICATION`, rebuild, review, and deploy. Confirm the token appears in the live homepage source before clicking **Verify**. Retain the token afterward. DNS verification does not require the HTML token. Follow Google's [ownership verification instructions](https://support.google.com/webmasters/answer/9008080).
3. Submit the production `/sitemap.xml` in the Sitemaps report. Its seven URLs must match the final canonical hostname. A sitemap supports discovery; it does not guarantee indexing or ranking. See Google's [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
4. Inspect the live home, About, Contact, résumé and project URLs. Run the live URL test, resolve any crawl/indexing errors, and request indexing for the important pages. Check ProfilePage/Breadcrumb markup with the [Rich Results Test](https://search.google.com/test/rich-results) and WebSite markup with the [Schema Markup Validator](https://validator.schema.org/).
5. Once the final address is live, add that address to the résumé and the website fields of the existing professional profiles. Regenerate the two-page résumé PDF after adding the real link. The current PDF has no invented portfolio address.
6. Monitor Page indexing and Performance reports for searches using **Mark Julius** and **Mark Julius P. Mella**, including impressions, clicks and the landing pages. Use the [Search Console getting-started guide](https://developers.google.com/search/docs/monitor-debug/search-console-start). Public hosting, Google ownership verification, sitemap submission and indexing remain launch steps; they have not been performed locally.

## Repeatable checks

`npm run seo:check` validates the current build against the configured production environment. It checks unique metadata, static headings, page types and identity links, canonical consistency, indexing directives, verification-tag configuration, all seven sitemap URLs, crawlable navigation and section anchors, social image dimensions, favicon and résumé PDF. `npm run build:public` runs this check in public mode after building.

`npm run test:seo` checks configuration rejection, preview/public indexing, the profile identity connection, error-page behavior and safe JSON-LD serialization. A passing local check establishes the generated site's technical setup; it does not promise a particular Google position or validate a hosting provider that has not been configured.

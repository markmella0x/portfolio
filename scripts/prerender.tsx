import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderToString } from 'react-dom/server';
import { Route, Routes, StaticRouter } from 'react-router-dom';
import { SiteShell } from '../src/components/SiteShell';
import { StartupIntro } from '../src/components/StartupIntro';
import { Home } from '../src/pages/Home';
import { CaseStudy } from '../src/pages/CaseStudy';
import { Resume } from '../src/pages/Resume';
import { NotFound } from '../src/pages/NotFound';
import { caseStudies } from '../src/data/caseStudies';
import { homeMetadata } from '../src/data/profile';
import { getCaseStudyMetadata, notFoundMetadata, resumeMetadata } from '../src/data/metadata';
import { site } from '../src/data/site';
import { getPageSeo, serializeStructuredData } from '../src/utils/seo';
import type { PageMetadata } from '../src/types';

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const replacements: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return replacements[character];
  });
}

function renderPage(template: string, path: string, metadata: PageMetadata): string {
  const body = renderToString(
    <StaticRouter location={path}>
      {path === '/' ? <StartupIntro /> : null}
      <SiteShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SiteShell>
    </StaticRouter>,
  );
  const seo = getPageSeo(path, metadata);
  const head = [
    '<title>' + escapeHtml(metadata.title) + '</title>',
    ...seo.tags.map(
      (tag) =>
        '<meta ' +
        tag.attribute +
        '="' +
        tag.key +
        '" content="' +
        escapeHtml(tag.content) +
        '" />',
    ),
  ];
  if (seo.canonical)
    head.push('<link rel="canonical" href="' + escapeHtml(seo.canonical) + '" />');
  if (seo.structuredData) {
    head.push(
      '<script id="portfolio-structured-data" type="application/ld+json">' +
        serializeStructuredData(seo.structuredData) +
        '</script>',
    );
  }
  return template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(
      /<meta (?:name="(?:description|author|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,
      '',
    )
    .replace('</head>', head.join('\n') + '\n</head>')
    .replace('<div id="root"></div>', '<div id="root">' + body + '</div>');
}

async function prerender(): Promise<void> {
  for (const study of caseStudies) {
    const text = study.sections.flatMap((section) => section.paragraphs).join(' ');
    const words = text.trim().split(/\s+/).length;
    if (words < 200 || words > 400)
      throw new Error(study.slug + ' must contain 200–400 words.');
  }
  const output = resolve('dist');
  const template = await readFile(resolve(output, 'index.html'), 'utf8');
  const pages = [
    { path: '/', metadata: homeMetadata, file: 'index.html' },
    { path: '/resume/', metadata: resumeMetadata, file: 'resume/index.html' },
    ...caseStudies.map((study) => ({
      path: '/projects/' + study.slug,
      metadata: getCaseStudyMetadata(study),
      file: 'projects/' + study.slug + '/index.html',
    })),
    { path: '/404.html', metadata: notFoundMetadata, file: '404.html' },
  ];
  for (const page of pages) {
    const destination = resolve(output, page.file);
    await mkdir(resolve(destination, '..'), { recursive: true });
    await writeFile(destination, renderPage(template, page.path, page.metadata));
  }
  const origin = site.origin ?? site.previewOrigin;
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    pages
      .filter((page) => !page.metadata.noIndex)
      .map(
        (page) =>
          '  <url><loc>' + escapeHtml(new URL(page.path, origin).href) + '</loc></url>',
      )
      .join('\n') +
    '\n</urlset>\n';
  await writeFile(resolve(output, 'sitemap.xml'), sitemap);
  await writeFile(
    resolve(output, 'robots.txt'),
    'User-agent: *\nAllow: /\nSitemap: ' + origin + '/sitemap.xml\n',
  );
  process.stdout.write(
    'Prerendered home, résumé, three case studies, and 404; generated sitemap and robots.\n',
  );
}

await prerender();

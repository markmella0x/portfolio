import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { caseStudies } from '../src/data/caseStudies';
import { profile } from '../src/data/profile';
import { getProductionSiteConfig } from './site-environment';

const config = getProductionSiteConfig(process.argv.includes('--public'));
const output = resolve('dist');
const pages = [
  { path: '/', file: 'index.html' },
  { path: '/about/', file: 'about/index.html' },
  { path: '/contact/', file: 'contact/index.html' },
  { path: '/resume/', file: 'resume/index.html' },
  ...caseStudies.map((study) => ({
    path: '/projects/' + study.slug,
    file: 'projects/' + study.slug + '/index.html',
  })),
];
const titles = new Set<string>();
const descriptions = new Set<string>();
const htmlByPath = new Map<string, string>();
const linksByPath = new Map<string, string[]>();

function attribute(tag: string, name: string): string | null {
  return tag.match(new RegExp('\\b' + name + '="([^"]*)"'))?.[1] ?? null;
}

for (const page of [...pages, { path: '/404.html', file: '404.html' }]) {
  const html = await readFile(resolve(output, page.file), 'utf8');
  htmlByPath.set(page.path, html);
  const label = page.path + ': ';
  assert.match(html, /<html lang="en">/, label + 'language');
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, label + 'one static H1');
  assert.equal((html.match(/<title>/g) ?? []).length, 1, label + 'one title');
  const title = html.match(/<title>([^<]+)<\/title>/)![1];
  assert.equal(titles.has(title), false, label + 'unique title');
  titles.add(title);

  const meta = new Map<string, string>();
  for (const tag of html.match(/<meta\b[^>]+>/g) ?? []) {
    const key = attribute(tag, 'name') ?? attribute(tag, 'property');
    if (!key) continue;
    assert.equal(meta.has(key), false, label + 'duplicate meta ' + key);
    meta.set(key, attribute(tag, 'content') ?? '');
  }
  const description = meta.get('description');
  assert.ok(description && description.length > 50, label + 'substantive description');
  assert.equal(descriptions.has(description), false, label + 'unique description');
  descriptions.add(description);
  assert.equal(meta.get('twitter:card'), 'summary_large_image', label + 'social card');
  assert.equal(meta.get('og:image:type'), 'image/png', label + 'social image type');
  assert.ok(meta.get('og:image:alt'), label + 'social image alternative');
  assert.equal(
    meta.get('google-site-verification') ?? null,
    config.googleSiteVerification,
    label + 'verification setting',
  );
  const missing = page.path === '/404.html';
  const indexable = Boolean(config.origin) && !missing;
  const canonicalTags = (html.match(/<link\b[^>]+>/g) ?? []).filter(
    (tag) => attribute(tag, 'rel') === 'canonical',
  );
  assert.equal(canonicalTags.length, indexable ? 1 : 0, label + 'canonical count');
  assert.equal(/\bnoindex\b/.test(meta.get('robots') ?? ''), !indexable, label + 'indexing');
  if (indexable) {
    const canonical = config.origin + page.path;
    assert.equal(attribute(canonicalTags[0], 'href'), canonical, label + 'canonical URL');
    assert.equal(meta.get('og:url'), canonical, label + 'Open Graph URL');
    assert.equal(meta.get('og:image'), config.origin + '/og-image.png', label + 'image URL');
    assert.equal(html.includes('127.0.0.1'), false, label + 'no local URLs');
  } else {
    assert.equal(meta.has('og:url'), false, label + 'no invented public URL');
  }
  const schemas = [
    ...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([^<]+)<\/script>/g),
  ];
  assert.equal(schemas.length, missing ? 0 : 1, label + 'structured data count');
  if (!missing) {
    const schema = JSON.parse(schemas[0][1]);
    assert.equal(schema['@context'], 'https://schema.org');
    const graph = schema['@graph'] as Record<string, unknown>[];
    const person = graph.find((node) => node['@type'] === 'Person')!;
    assert.equal(person.name, profile.fullName, label + 'person identity');
    assert.equal(person.alternateName, profile.name, label + 'public name');
    assert.deepEqual(person.sameAs, [profile.contact.github, profile.contact.linkedin]);
    const webpage = graph.find((node) => String(node['@id']).endsWith('#webpage'))!;
    const types = [webpage['@type']].flat();
    const requiredType =
      page.path === '/contact/'
        ? 'ContactPage'
        : page.path === '/about/'
          ? 'AboutPage'
          : page.path.startsWith('/projects/')
            ? 'WebPage'
            : 'ProfilePage';
    assert.ok(types.includes(requiredType), label + 'page schema type');
    if (config.origin) {
      assert.equal(webpage.url, config.origin + page.path, label + 'schema URL');
      assert.equal(person.url, config.origin + '/', label + 'consistent identity URL');
    }
    if (page.path !== '/') {
      const breadcrumb = graph.find((node) => node['@type'] === 'BreadcrumbList');
      assert.ok(breadcrumb, label + 'breadcrumb schema');
    }
  }
  linksByPath.set(
    page.path,
    [...html.matchAll(/\bhref="([^"<>]+)"/g)].map((match) => match[1]),
  );
}

// Follow real HTML links, including section fragments, rather than relying on JS navigation.
const visited = new Set(['/']);
const queue = ['/'];
while (queue.length) {
  const path = queue.shift()!;
  for (const href of linksByPath.get(path) ?? []) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url = new URL(href, 'https://local-check.invalid' + path);
    if (url.hostname !== 'local-check.invalid') continue;
    const target = pages.find((page) => page.path === url.pathname);
    const file = target?.file ?? decodeURIComponent(url.pathname).replace(/^\//, '');
    const absolute = resolve(output, file);
    assert.ok(absolute.startsWith(output + sep), 'Local link must stay in build output');
    assert.ok((await stat(absolute)).isFile(), path + ': broken local link ' + href);
    if (target) {
      if (url.hash) {
        assert.ok(
          htmlByPath
            .get(target.path)!
            .includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"'),
          path + ': missing section anchor ' + href,
        );
      }
      if (!visited.has(target.path)) {
        visited.add(target.path);
        queue.push(target.path);
      }
    }
  }
}
assert.equal(visited.size, pages.length, 'Every content page must be reachable from home');
const robots = await readFile(resolve(output, 'robots.txt'), 'utf8');
assert.match(robots, /User-agent: \*\nAllow: \/\n/);
if (config.origin) {
  assert.ok(robots.includes('Sitemap: ' + config.origin + '/sitemap.xml'));
  const sitemap = await readFile(resolve(output, 'sitemap.xml'), 'utf8');
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(locations.sort(), pages.map((page) => config.origin + page.path).sort());
} else {
  assert.equal(robots.includes('Sitemap:'), false, 'No local sitemap advertised');
  await assert.rejects(stat(resolve(output, 'sitemap.xml')), { code: 'ENOENT' });
}
const image = await readFile(resolve(output, 'og-image.png'));
assert.equal(image.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
const favicon = await readFile(resolve(output, 'favicon.svg'), 'utf8');
assert.match(favicon, /<svg\b/);
assert.ok(profile.contact.resume);
const pdf = await readFile(resolve(output, profile.contact.resume.slice(1)));
assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
process.stdout.write(
  'SEO checks passed: seven crawlable HTML pages, unique metadata, schema, internal links and anchors, social image, favicon, PDF, and noindex 404. ' +
    (config.origin
      ? 'Public canonical URLs, robots and sitemap are consistent.\n'
      : 'Preview pages are noindex; public launch needs VITE_SITE_URL.\n'),
);

import assert from 'node:assert/strict';
import test from 'node:test';
import { getSiteConfig } from '../src/utils/siteConfig';
import { getPageSeo, serializeStructuredData } from '../src/utils/seo';
import { homeMetadata, profile } from '../src/data/profile';
import { aboutMetadata, notFoundMetadata } from '../src/data/metadata';

const publicOrigin = 'https://portfolio-fixture.example.dev';

test('public settings accept a root HTTPS address and optional verification token', () => {
  assert.deepEqual(
    getSiteConfig({
      VITE_SITE_URL: ' ' + publicOrigin + '/ ',
      VITE_GOOGLE_SITE_VERIFICATION: 'verification_fixture-123',
    }),
    { origin: publicOrigin, googleSiteVerification: 'verification_fixture-123' },
  );
  assert.deepEqual(getSiteConfig({}), { origin: null, googleSiteVerification: null });
});

test('launch settings reject local, placeholder and unsupported subpath addresses', () => {
  for (const address of [
    'not a URL',
    'http://portfolio-fixture.example.dev',
    'https://localhost',
    'https://127.0.0.1',
    'https://192.168.1.10',
    'https://[::1]',
    'https://preview.local',
    'https://portfolio.test',
    'https://example.com',
    'https://www.example.org',
    publicOrigin + '/portfolio/',
    publicOrigin + '?tracking=1',
    publicOrigin + '#home',
    publicOrigin + ':4173',
    'https://user:password@portfolio-fixture.example.dev',
  ]) {
    assert.throws(() => getSiteConfig({ VITE_SITE_URL: address }), /VITE_SITE_URL/);
  }
  assert.throws(
    () => getSiteConfig({ VITE_GOOGLE_SITE_VERIFICATION: '<meta name="verification" />' }),
    /only the content value/,
  );
});

test('preview and public builds use different indexing instructions', () => {
  const preview = getPageSeo('/', homeMetadata, null, null);
  assert.equal(preview.canonical, null);
  assert.match(preview.tags.find((tag) => tag.key === 'robots')!.content, /\bnoindex\b/);
  assert.equal(
    preview.tags.some((tag) => tag.key === 'og:url'),
    false,
  );
  const published = getPageSeo('/', homeMetadata, publicOrigin, 'verification_fixture');
  assert.equal(published.canonical, publicOrigin + '/');
  assert.equal(
    published.tags.find((tag) => tag.key === 'robots')!.content,
    'index, follow, max-image-preview:large',
  );
  assert.equal(
    published.tags.find((tag) => tag.key === 'og:image')!.content,
    publicOrigin + '/og-image.png',
  );
  assert.equal(
    published.tags.find((tag) => tag.key === 'google-site-verification')!.content,
    'verification_fixture',
  );
});

test('About identifies the same person without invented profile imagery or statistics', () => {
  const seo = getPageSeo('/about/', aboutMetadata, publicOrigin, null);
  const graph = seo.structuredData!['@graph'] as Record<string, unknown>[];
  const person = graph.find((node) => node['@type'] === 'Person')!;
  const page = graph.find((node) => Array.isArray(node['@type']))!;
  assert.deepEqual(page['@type'], ['AboutPage', 'ProfilePage']);
  assert.deepEqual(page.mainEntity, { '@id': person['@id'] });
  assert.equal(person.name, profile.fullName);
  assert.equal(person.alternateName, profile.name);
  assert.match(String(person.description), /transitioning into agentic AI engineering/);
  assert.equal(person.image, undefined);
  assert.equal(person.interactionStatistic, undefined);
  assert.equal(person.address, undefined);
});

test('missing pages remain noindex and have no canonical or person schema', () => {
  for (const origin of [null, publicOrigin]) {
    const seo = getPageSeo('/does-not-exist', notFoundMetadata, origin, null);
    assert.equal(seo.canonical, null);
    assert.equal(seo.structuredData, null);
    assert.match(seo.tags.find((tag) => tag.key === 'robots')!.content, /\bnoindex\b/);
  }
});

test('structured data cannot terminate its HTML script element', () => {
  const input = { text: '</script><script>alert(1)</script>&\u2028\u2029' };
  const serialized = serializeStructuredData(input);
  assert.equal(/[<>&\u2028\u2029]/.test(serialized), false);
  assert.deepEqual(JSON.parse(serialized), input);
});

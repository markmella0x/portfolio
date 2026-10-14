import { profile } from '../data/profile';
import { site } from '../data/site';
import { skillGroups } from '../data/skills';
import { ui } from '../data/ui';
import type { PageMetadata, PageSeo, SeoMetaTag } from '../types';

export function getPageSeo(
  pathname: string,
  metadata: PageMetadata,
  publicOrigin: string | null = site.origin,
): PageSeo {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const path = normalizedPath === '/resume' ? '/resume/' : normalizedPath;
  const origin = publicOrigin ?? site.previewOrigin;
  const url = new URL(path, origin).href;
  const homeUrl = new URL('/', origin).href;
  const image = new URL(site.socialImage, origin).href;
  const tags: SeoMetaTag[] = [
    { attribute: 'name', key: 'description', content: metadata.description },
    { attribute: 'name', key: 'author', content: profile.fullName },
    {
      attribute: 'name',
      key: 'robots',
      content: metadata.noIndex ? 'noindex' : 'index, follow, max-image-preview:large',
    },
    { attribute: 'property', key: 'og:type', content: 'website' },
    { attribute: 'property', key: 'og:site_name', content: profile.name },
    { attribute: 'property', key: 'og:title', content: metadata.title },
    { attribute: 'property', key: 'og:description', content: metadata.description },
    { attribute: 'property', key: 'og:image', content: image },
    { attribute: 'property', key: 'og:image:width', content: String(site.socialImageWidth) },
    { attribute: 'property', key: 'og:image:height', content: String(site.socialImageHeight) },
    { attribute: 'property', key: 'og:image:alt', content: site.socialImageAlt },
    { attribute: 'name', key: 'twitter:card', content: 'summary_large_image' },
    { attribute: 'name', key: 'twitter:title', content: metadata.title },
    { attribute: 'name', key: 'twitter:description', content: metadata.description },
    { attribute: 'name', key: 'twitter:image', content: image },
    { attribute: 'name', key: 'twitter:image:alt', content: site.socialImageAlt },
  ];
  const canonical = publicOrigin && !metadata.noIndex ? url : null;
  if (canonical) tags.push({ attribute: 'property', key: 'og:url', content: canonical });
  if (metadata.noIndex) return { canonical, tags, structuredData: null };

  const personId = homeUrl + '#person';
  const websiteId = homeUrl + '#website';
  const pageId = url + '#webpage';
  const sameAs = [profile.contact.github, profile.contact.linkedin].filter(
    (value): value is string => Boolean(value),
  );
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Person',
      '@id': personId,
      name: profile.fullName,
      alternateName: profile.name,
      jobTitle: profile.role,
      description: profile.summary,
      url: homeUrl,
      knowsAbout: skillGroups.flatMap((group) => group.skills.map((skill) => skill.name)),
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: profile.name,
      url: homeUrl,
      inLanguage: 'en',
      author: { '@id': personId },
    },
    {
      '@type': metadata.caseStudy ? 'WebPage' : 'ProfilePage',
      '@id': pageId,
      url,
      name: metadata.title,
      description: metadata.description,
      inLanguage: 'en',
      isPartOf: { '@id': websiteId },
      mainEntity: { '@id': metadata.caseStudy ? url + '#work' : personId },
      ...(metadata.caseStudy ? { breadcrumb: { '@id': url + '#breadcrumbs' } } : {}),
    },
  ];
  if (metadata.caseStudy) {
    graph.push(
      {
        '@type': 'CreativeWork',
        '@id': url + '#work',
        name: metadata.caseStudy.title,
        description: metadata.description,
        url,
        author: { '@id': personId },
        keywords: metadata.caseStudy.skills,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': url + '#breadcrumbs',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: ui.workTitle, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: metadata.caseStudy.title, item: url },
        ],
      },
    );
  }
  return {
    canonical,
    tags,
    structuredData: { '@context': 'https://schema.org', '@graph': graph },
  };
}

export function serializeStructuredData(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/[<>&\u2028\u2029]/g, (character) => {
    return '\\u' + character.charCodeAt(0).toString(16).padStart(4, '0');
  });
}

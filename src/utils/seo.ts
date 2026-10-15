import { profile } from '../data/profile';
import { site } from '../data/site';
import { skillGroups } from '../data/skills';
import { ui } from '../data/ui';
import type { PageMetadata, PageSeo, SeoMetaTag } from '../types';

export function getPageSeo(
  pathname: string,
  metadata: PageMetadata,
  publicOrigin: string | null = site.origin,
  googleSiteVerification: string | null = site.googleSiteVerification,
): PageSeo {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const path = ['/resume', '/about', '/contact'].includes(normalizedPath)
    ? normalizedPath + '/'
    : normalizedPath;
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
      content:
        metadata.noIndex || !publicOrigin
          ? 'noindex, follow'
          : 'index, follow, max-image-preview:large',
    },
    { attribute: 'property', key: 'og:type', content: 'website' },
    { attribute: 'property', key: 'og:site_name', content: profile.name },
    { attribute: 'property', key: 'og:title', content: metadata.title },
    { attribute: 'property', key: 'og:description', content: metadata.description },
    { attribute: 'property', key: 'og:image', content: image },
    { attribute: 'property', key: 'og:image:type', content: 'image/png' },
    { attribute: 'property', key: 'og:image:width', content: String(site.socialImageWidth) },
    { attribute: 'property', key: 'og:image:height', content: String(site.socialImageHeight) },
    { attribute: 'property', key: 'og:image:alt', content: site.socialImageAlt },
    { attribute: 'name', key: 'twitter:card', content: 'summary_large_image' },
    { attribute: 'name', key: 'twitter:title', content: metadata.title },
    { attribute: 'name', key: 'twitter:description', content: metadata.description },
    { attribute: 'name', key: 'twitter:image', content: image },
    { attribute: 'name', key: 'twitter:image:alt', content: site.socialImageAlt },
  ];
  if (googleSiteVerification) {
    tags.push({
      attribute: 'name',
      key: 'google-site-verification',
      content: googleSiteVerification,
    });
  }
  const canonical = publicOrigin && !metadata.noIndex ? url : null;
  if (canonical) tags.push({ attribute: 'property', key: 'og:url', content: canonical });
  if (metadata.noIndex) return { canonical, tags, structuredData: null };

  const personId = homeUrl + '#person';
  const websiteId = homeUrl + '#website';
  const pageId = url + '#webpage';
  const breadcrumbLabel = metadata.breadcrumb;
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
      ...(profile.contact.email ? { email: profile.contact.email } : {}),
      knowsAbout: skillGroups.flatMap((group) => group.skills.map((skill) => skill.name)),
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: profile.name,
      alternateName: profile.fullName,
      url: homeUrl,
      inLanguage: 'en',
      author: { '@id': personId },
      publisher: { '@id': personId },
    },
    {
      '@type':
        metadata.pageType === 'AboutPage'
          ? ['AboutPage', 'ProfilePage']
          : (metadata.pageType ?? (metadata.caseStudy ? 'WebPage' : 'ProfilePage')),
      '@id': pageId,
      url,
      name: metadata.title,
      description: metadata.description,
      inLanguage: 'en',
      isPartOf: { '@id': websiteId },
      about: { '@id': personId },
      primaryImageOfPage: { '@id': homeUrl + '#social-image' },
      mainEntity: { '@id': metadata.caseStudy ? url + '#work' : personId },
      ...(breadcrumbLabel ? { breadcrumb: { '@id': url + '#breadcrumbs' } } : {}),
    },
    {
      '@type': 'ImageObject',
      '@id': homeUrl + '#social-image',
      contentUrl: image,
      width: site.socialImageWidth,
      height: site.socialImageHeight,
      caption: site.socialImageAlt,
    },
  ];
  if (metadata.caseStudy) {
    graph.push({
      '@type': 'CreativeWork',
      '@id': url + '#work',
      name: metadata.caseStudy.title,
      description: metadata.description,
      url,
      author: { '@id': personId },
      keywords: metadata.caseStudy.skills,
    });
  }
  if (breadcrumbLabel) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': url + '#breadcrumbs',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: ui.homeBreadcrumb,
          item: homeUrl,
        },
        { '@type': 'ListItem', position: 2, name: breadcrumbLabel, item: url },
      ],
    });
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

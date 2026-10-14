import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { PageMetadata } from '../types';
import { getPageSeo, serializeStructuredData } from '../utils/seo';

export function useMetadata(metadata: PageMetadata): void {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = getPageSeo(pathname, metadata);
    document.title = metadata.title;
    for (const { attribute, key, content } of seo.tags) {
      let element = document.querySelector('meta[' + attribute + '="' + key + '"]');
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (seo.canonical) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', seo.canonical);
    } else {
      canonical?.remove();
      document.querySelector('meta[property="og:url"]')?.remove();
    }
    let schema = document.getElementById('portfolio-structured-data');
    if (seo.structuredData) {
      if (!schema) {
        schema = document.createElement('script');
        schema.id = 'portfolio-structured-data';
        schema.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schema);
      }
      schema.textContent = serializeStructuredData(seo.structuredData);
    } else {
      schema?.remove();
    }
  }, [metadata, pathname]);
}

import { loadEnv } from 'vite';
import { getSiteConfig } from '../src/utils/siteConfig';
import { profile } from '../src/data/profile';

export function getProductionSiteConfig(requirePublic = false) {
  const environment = loadEnv('production', process.cwd(), 'VITE_');
  const config = getSiteConfig({
    ...environment,
    VITE_SITE_URL:
      environment.VITE_SITE_URL ?? (requirePublic ? profile.contact.website : undefined),
  });
  if (requirePublic && !config.origin) {
    throw new Error(
      'Set VITE_SITE_URL to your real public HTTPS website address in .env.production.local or your hosting environment before building for publication.',
    );
  }
  return config;
}

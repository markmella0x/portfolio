import { loadEnv } from 'vite';
import { getSiteConfig } from '../src/utils/siteConfig';

export function getProductionSiteConfig(requirePublic = false) {
  const config = getSiteConfig(loadEnv('production', process.cwd(), 'VITE_'));
  if (requirePublic && !config.origin) {
    throw new Error(
      'Set VITE_SITE_URL to your real public HTTPS website address in .env.production.local or your hosting environment before building for publication.',
    );
  }
  return config;
}

import { getProductionSiteConfig } from './site-environment';

const config = getProductionSiteConfig(true);
process.stdout.write('Public SEO origin configured: ' + config.origin + '\n');

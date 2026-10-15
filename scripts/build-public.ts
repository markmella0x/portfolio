import { spawnSync } from 'node:child_process';
import { loadEnv } from 'vite';
import { profile } from '../src/data/profile';
import { getSiteConfig } from '../src/utils/siteConfig';

// Vercel previews must stay noindex even when a public URL is set on the host.
const publicBuild =
  !process.argv.includes('--vercel') || process.env.VERCEL_ENV === 'production';
const siteEnvironment = loadEnv('production', process.cwd(), 'VITE_');
const environment = {
  ...process.env,
  ...siteEnvironment,
  VITE_SITE_URL: publicBuild ? (siteEnvironment.VITE_SITE_URL ?? profile.contact.website) : '',
};
const config = getSiteConfig(environment);
if (publicBuild && !config.origin) throw new Error('A public build requires VITE_SITE_URL.');
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Run this build through npm run build:public or build:vercel.');

function run(args: string[]): void {
  const result = spawnSync(process.execPath, [npmCli!, 'run', ...args], {
    env: environment,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

process.stdout.write(
  publicBuild
    ? 'Building public SEO for ' + config.origin + '\n'
    : 'Building a noindex Vercel preview.\n',
);
run(['build']);
run(publicBuild ? ['seo:check', '--', '--public'] : ['seo:check']);

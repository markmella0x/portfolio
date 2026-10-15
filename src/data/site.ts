import { profile } from './profile';
import { getSiteConfig } from '../utils/siteConfig';

// Vite replaces these public environment values in the browser bundle.
// Prerendering loads the same production environment explicitly.
export const site = {
  ...getSiteConfig(import.meta.env ?? {}),
  previewOrigin: 'http://127.0.0.1:4173',
  socialImage: '/og-image.png',
  socialImageWidth: 1200,
  socialImageHeight: 630,
  socialImageAlt:
    profile.name +
    ' — ' +
    profile.title +
    '. ' +
    profile.headline.join(' ') +
    ' ' +
    profile.focus.join(', ') +
    '.',
};

import { profile } from './profile';

// Set the approved public origin before publishing. Until then, SEO files use the local preview.
export const site = {
  origin: null as string | null,
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

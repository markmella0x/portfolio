export interface PublicSiteConfig {
  origin: string | null;
  googleSiteVerification: string | null;
}

export function getSiteConfig(
  environment: Record<string, string | undefined>,
): PublicSiteConfig {
  const value = environment.VITE_SITE_URL?.trim();
  let origin: string | null = null;
  if (value) {
    let url: URL;
    try {
      url = new URL(value);
    } catch {
      throw new Error('VITE_SITE_URL must be the real public HTTPS website address.');
    }
    const hostname = url.hostname;
    const reservedHost =
      !hostname.includes('.') ||
      /^[\d.]+$/.test(hostname) ||
      hostname.includes(':') ||
      /(?:^|\.)(?:localhost|local|internal|test|invalid|example)$/.test(hostname) ||
      /(?:^|\.)example\.(?:com|net|org)$/.test(hostname);
    if (
      url.protocol !== 'https:' ||
      reservedHost ||
      url.username ||
      url.password ||
      url.port ||
      url.pathname !== '/' ||
      url.search ||
      url.hash
    ) {
      throw new Error(
        'VITE_SITE_URL must be a public HTTPS domain or hosting address at the domain root, without a path, port, credentials, query, or fragment.',
      );
    }
    origin = url.origin;
  }

  const googleSiteVerification = environment.VITE_GOOGLE_SITE_VERIFICATION?.trim() || null;
  if (googleSiteVerification && /[\s<>"']/.test(googleSiteVerification)) {
    throw new Error(
      'VITE_GOOGLE_SITE_VERIFICATION must contain only the content value from Google’s verification meta tag.',
    );
  }
  return { origin, googleSiteVerification };
}

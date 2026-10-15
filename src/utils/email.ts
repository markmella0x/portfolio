export interface EmailDraft {
  subject?: string;
  body?: string;
}

export function prefersNativeEmail(): boolean {
  if (typeof window === 'undefined') return true;
  const { userAgent, maxTouchPoints } = window.navigator;
  return (
    /Android|iPhone|iPad|iPod|Mobi/i.test(userAgent) ||
    (/Macintosh/i.test(userAgent) && maxTouchPoints > 1)
  );
}

export function createEmailHref(
  email: string,
  { subject, body }: EmailDraft,
  nativeEmail: boolean,
): string {
  const message = body?.replace(/\r?\n/g, '\r\n');
  if (nativeEmail) {
    const query = [
      subject ? 'subject=' + encodeURIComponent(subject) : '',
      message ? 'body=' + encodeURIComponent(message) : '',
    ]
      .filter(Boolean)
      .join('&');
    return 'mailto:' + email + (query ? '?' + query : '');
  }
  const url = new URL('https://mail.google.com/mail/');
  url.searchParams.set('view', 'cm');
  url.searchParams.set('fs', '1');
  url.searchParams.set('to', email);
  if (subject) url.searchParams.set('su', subject);
  if (message) url.searchParams.set('body', message);
  return url.href;
}

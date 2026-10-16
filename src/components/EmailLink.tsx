import { useState } from 'react';
import { ui } from '../data/ui';
import { useClientLayoutEffect } from '../hooks/useClientLayoutEffect';
import { createEmailHref, prefersNativeEmail } from '../utils/email';
import type { EmailDraft } from '../utils/email';

export function EmailLink({
  email,
  subject,
  body,
  className,
  children,
}: EmailDraft & {
  email: string;
  className?: string;
  children: string;
}): JSX.Element {
  const [nativeEmail, setNativeEmail] = useState(true);
  useClientLayoutEffect(() => setNativeEmail(prefersNativeEmail()), []);
  return (
    <a
      className={className}
      href={createEmailHref(email, { subject, body }, nativeEmail)}
      target={nativeEmail ? undefined : '_blank'}
      rel={nativeEmail ? undefined : 'noopener noreferrer'}
      aria-label={nativeEmail ? undefined : children + ' — ' + ui.gmailNewTab}
    >
      {children}
    </a>
  );
}

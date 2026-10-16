import { Link } from 'react-router-dom';
import { ResumeDocument } from '../components/ResumeDocument';
import { profile } from '../data/profile';
import { resumeMetadata } from '../data/metadata';
import { ui } from '../data/ui';
import { useMetadata } from '../hooks/useMetadata';

export function Resume(): JSX.Element {
  useMetadata(resumeMetadata);
  return (
    <div className="resume-page">
      <div className="container resume-toolbar">
        <Link className="text-link resume-back" to="/">
          {ui.resumeBack}
        </Link>
        <p className="resume-format">{ui.resumeFormat}</p>
        <a
          className="button button-primary resume-download"
          href={profile.contact.resume ?? undefined}
          download={profile.contact.resume?.split('/').pop()}
        >
          {ui.downloadResume}
        </a>
      </div>
      <div className="container resume-preview">
        <ResumeDocument />
      </div>
    </div>
  );
}

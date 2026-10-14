import { Link } from 'react-router-dom';
import { ui } from '../data/ui';
import { notFoundMetadata } from '../data/metadata';
import { useMetadata } from '../hooks/useMetadata';
export function NotFound(): JSX.Element {
  useMetadata(notFoundMetadata);
  return (
    <section className="container not-found">
      <p className="not-found-code">{ui.notFoundCode}</p>
      <h1>{ui.notFoundTitle}</h1>
      <p>{ui.notFoundDescription}</p>
      <Link className="button button-primary" to="/">
        {ui.backHome}
      </Link>
    </section>
  );
}

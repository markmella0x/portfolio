import { Link } from 'react-router-dom';
import { ui } from '../data/ui';

export function PageHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}): JSX.Element {
  return (
    <header className="page-header">
      <nav className="page-breadcrumbs" aria-label={ui.breadcrumbLabel}>
        <ol>
          <li>
            <Link to="/">{ui.homeBreadcrumb}</Link>
          </li>
          <li>
            <span aria-current="page">{label}</span>
          </li>
        </ol>
      </nav>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

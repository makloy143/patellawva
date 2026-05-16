import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import JsonLd from './JsonLd';
import { breadcrumbListSchema } from '../lib/schema';

export type Crumb = {
  /** Display label for the breadcrumb. */
  label: string;
  /** Pathname (e.g. `/practice`). Omit on the current page. */
  to?: string;
};

type Props = {
  items: ReadonlyArray<Crumb>;
};

/**
 * Visible breadcrumb trail + matching BreadcrumbList JSON-LD.
 *
 * Keeps the existing `.breadcrumbs` flex layout (direct children with
 * `gap`); the last entry is rendered with `aria-current="page"`.
 */
export default function Breadcrumbs({ items }: Props) {
  if (!items.length) return null;

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              {item.to && !isLast ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
              {!isLast && <span className="sep" aria-hidden="true">/</span>}
            </Fragment>
          );
        })}
      </nav>
      <JsonLd
        id={`breadcrumbs-${items.map((c) => c.label).join('-').toLowerCase().replace(/\s+/g, '-')}`}
        data={breadcrumbListSchema(
          items.map((c) => ({ name: c.label, path: c.to })),
        )}
      />
    </>
  );
}

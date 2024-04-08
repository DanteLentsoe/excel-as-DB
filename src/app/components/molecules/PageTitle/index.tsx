import classNames from 'classnames';
import React, { FC } from 'react';

export type PageTitleProps = {
  /** The main title of the page. */
  title: string;
  /** A brief description or subtitle for the page. */
  subtitle: string;

  /** styling classname. */
  className?: string;
};

/**
 * Renders a page title section with a title and subtitle.
 *
 * @param {PageTitleProps} props The component props.
 * @param {string} title The main title of the page.
 * @param {string} subtitle A brief description or subtitle for the page.
 * @returns {JSX.Element} The PageTitle component.
 *
 * @example
 * <PageTitle
 *   title="Main title"
 *   subtitle="Sub heading"
 * />
 */
export const PageTitle: FC<PageTitleProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  return (
    <section className={classNames(className, 'py-[70px] dark:bg-dark')}>
      <div className="mx-auto px-4 sm:container">
        <div className="border-b border-stroke border-dark-3">
          <h2 className="mb-2 text-2xl font-semibold text-dark dark:text-white">
            {title}
          </h2>
          <p className="mb-6 text-sm font-medium text-body-color dark:text-dark-6">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

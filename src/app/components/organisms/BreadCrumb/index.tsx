import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = {
  items: Array<BreadcrumbItem>;
  className?: string;
};

/**
 * Breadcrumb component for navigation.
 *
 * @param {BreadcrumbProps} props - The props for the breadcrumb component.
 * @returns {JSX.Element} - The rendered breadcrumb component.
 *
 * @example
 * <BreadCrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Templates', href: '/templates' },
 *     { label: 'Flowbite' }
 *   ]}
 * />
 */
export const BreadCrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
}) => {
  return (
    <nav
      className={classNames(
        className,
        'flex px-5 py-3 text-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700'
      )}
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items?.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="inline-flex items-center text-sm font-medium text-white hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <svg
                className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

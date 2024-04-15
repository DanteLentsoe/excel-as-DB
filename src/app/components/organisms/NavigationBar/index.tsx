import { FC } from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/editor', current: false },
  { name: 'Sheets Analytics', href: '/sheet-stats', current: false },
  { name: 'Settings', href: '#', current: false },
];

const classNames = (...classes: (string | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

type NavigationProps = {
  handleFile?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export const NavigationBar: FC<NavigationProps> = ({ handleFile }) => {
  const currentPathName = usePathname();

  return (
    <Disclosure
      as="nav"
      className="bg-black/70 backdrop-blur-lg shadow-lg border-b border-gray-700"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={'/'}>
                    <img
                      className="h-8 w-auto rotate-35 transform shadow-lg rounded-full border-2 border-blue-500"
                      src="/SheetWise.png"
                      alt="SheetWise logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(({ current, href, name }) => (
                      <a
                        key={name}
                        href={href}
                        className={classNames(
                          currentPathName === href
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={current ? 'page' : undefined}
                      >
                        {name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <label className="group relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-50 cursor-pointer">
                  <span className="absolute inset-0 group-hover:animate-spin bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></span>
                  <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    <span className="mr-2">+</span>
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFile}
                      className="hidden"
                    />
                  </span>
                </label>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <UserButton afterSignOutUrl="/" />
                    </Menu.Button>
                  </div>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

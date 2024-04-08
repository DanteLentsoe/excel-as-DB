'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { FC } from 'react';

export type FAQItemProps = {
  question: string;
  answer: string;
};

/**
 * A reusable FAQ item component.
 *
 * @component
 * @param {FAQItemProps} props - The props for the FAQ item component.
 * @returns {JSX.Element} - The FAQ item element.
 *
 * @example
 * <FAQItem
 *   question="What is your refund policy?"
 *   answer="If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked."
 * />
 */
export const FAQItem: FC<FAQItemProps> = ({ question, answer }) => (
  <Disclosure
    as="div"
    className="mt-2 bg-slate-800/[0.8] border border-white/[0.2] rounded-lg"
  >
    {({ open }) => (
      <>
        <Disclosure.Button className="flex w-full justify-between border text-white border-white/[0.2] rounded-lg bg-black px-4 py-2 text-left text-sm font-medium  hover:bg-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
          <span>{question}</span>
          <ChevronUpIcon
            className={`${
              open ? 'rotate-180 transform' : ''
            } h-5 w-5 text-purple-500`}
          />
        </Disclosure.Button>
        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-400">
          {answer}
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
);

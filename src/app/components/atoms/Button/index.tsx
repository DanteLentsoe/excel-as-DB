'use client';
import React from 'react';
import classNames from 'classnames';
export type ButtonProps = {
  variant: 'tailwindConnect' | 'borderMagic' | 'brutal' | 'shimmer';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'reset' | 'submit';
};

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className,
  onClick,
  type = 'button',
}) => {
  switch (variant) {
    case 'tailwindConnect':
      return (
        <button
          onClick={onClick}
          type={type}
          className={classNames(
            'bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block',
            className
          )}
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
            <span>{children}</span>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
        </button>
      );
    case 'borderMagic':
      return (
        <button
          onClick={onClick}
          type={type}
          className={classNames(
            'relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50',
            className
          )}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {children}
          </span>
        </button>
      );
    case 'brutal':
      return (
        <button
          onClick={onClick}
          type={type}
          className={classNames(
            'px-8 py-0.5  border-2 border-black dark:border-white uppercase bg-white text-neutarl-700 transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]',
            className
          )}
        >
          {/* Button content */}
          {children}
        </button>
      );
    case 'shimmer':
      return (
        <button
          onClick={onClick}
          type={type}
          className={classNames(
            'inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50',
            className
          )}
        >
          {/* Button content */}
          {children}
        </button>
      );
    default:
      return <button>{children}</button>;
  }
};

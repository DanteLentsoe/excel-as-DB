'use client';
import React from 'react';
import { SparklesCore } from '../../UI/sparkles';
import { Button } from '../../atoms/Button';
import { useRouter } from 'next/navigation';

export function SparklesPreview() {
  const route = useRouter();
  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        SheetWise
      </h1>
      <h2 className="md:text-2xl text-xl lg:text-3xl font-medium text-center text-white relative z-20 mt-4 mb-4">
        Excel Data Management Simplified
      </h2>

      <div className="mt-8 mb-4 flex space-x-8">
        <Button
          onClick={() => {
            route.push('/editor');
          }}
          className=" text-white"
          variant={'shimmer'}
        >
          Get Started
        </Button>
        <Button variant={'shimmer'} className=" text-white">
          Learn More
        </Button>
      </div>

      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}

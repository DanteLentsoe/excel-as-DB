'use client';
import React from 'react';
import { NavigationBar } from '../../organisms/NavigationBar';
import { Button } from '../../atoms/Button';
import { DataAnalytics } from '../../organisms/DataAnalytics';
import { Footer } from '../../molecules/Footer';
import { PageTitle } from '../../molecules/PageTitle';
export const SheetStats = () => {
  return (
    <div className="min-h-screen overflow-auto">
      <NavigationBar />

      <section id="about" className="min-h-screen px-4 lg:px-48">
        <PageTitle
          title={'Data Analyics'}
          subtitle={'Data Visualization Sheetwise'}
          className="mt-24"
        />

        <DataAnalytics />
      </section>
      <Footer />
    </div>
  );
};

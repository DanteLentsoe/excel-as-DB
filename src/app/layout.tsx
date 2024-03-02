import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import { ClerkProvider } from '@clerk/nextjs';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SheetWise - Excel Data Management',
  description:
    'Manage and manipulate Excel data with ease using SheetWise. Edit, filter, and perform bulk actions on your spreadsheet data within a web interface.',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <>
            <meta
              name="keywords"
              content="excel, spreadsheet, data management, web application, ag-grid, next.js"
            />
            <meta name="author" content="Dante Lehlohonolo Lentsoe" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://yourwebsite.com" />
            <meta
              property="og:image"
              content="https://yourwebsite.com/image.png"
            />

            <link rel="icon" href="/favicon.ico" />
          </>
        </Head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}

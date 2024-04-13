'use client';

import { appInfo } from '@/contants';
import { SparklesPreview } from './components/Templates/SparklesPreview';
import { InfoCard } from './components/UI/info-card';
import { FAQItem, FAQItemProps } from './components/molecules/FAQItem';
import { Footer } from './components/molecules/Footer';
import { PageTitle } from './components/molecules/PageTitle';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
const FAQs: Array<FAQItemProps> = [
  {
    question: 'How It Works',
    answer:
      "Start by uploading your Excel file to Sheetwise. Use our dynamic table to view, edit, and manage your data with ease. Once you're done, easily save your changes back to your Excel file.",
  },
  {
    question: 'Can I integrate Google Sheets?',
    answer:
      'Yes, you can integrate your Google Sheets and manage your data directly within Sheetwise. Any changes you make are instantly reflected in your Google Sheets, keeping everything up-to-date.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Your data stays on your device, with no need to send it to a server. You have complete control over your data without worrying about privacy or security concerns.',
  },
];

const sheetWiseCloudinaryImgs = [
  'SheetWise_Form_Example_bma5uo',
  'sheetwise_table_view_vhakum',
  'SheetWise_Excel_Sheet_zasc7c',
];

export default function Home() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const cld = new Cloudinary({ cloud: { cloudName: cloudName } });

  return (
    <main className="min-h-screen overflow-auto">
      <section className="min-h-screen flex flex-col justify-center items-center">
        <SparklesPreview />
      </section>
      <section className="min-h-screen flex flex-col md:px-8 lg:px-48">
        <PageTitle
          title={'Using SheetWise'}
          subtitle={'How to use SheetWise'}
          className="mt-24"
        />

        {FAQs.map(({ answer, question }, index) => {
          // Instantiate a CloudinaryImage object for the image with the public ID, 'SheetWise/{file.name}'.
          const imgConfig = cld
            .image(`SheetWise/${sheetWiseCloudinaryImgs[index]}`)
            .resize(fill().width(1800).height(600));
          return (
            <FAQItem key={question} question={question} answer={answer}>
              <AdvancedImage cldImg={imgConfig} className="h-76  w-full" />
            </FAQItem>
          );
        })}
      </section>
      <section id="about" className="min-h-screen lg:px-48">
        <PageTitle
          title={'About SheetWise'}
          subtitle={'Key features of found within Sheetwise'}
          className="mt-24"
        />
        <InfoCard items={appInfo} />
      </section>
      <Footer />
    </main>
  );
}

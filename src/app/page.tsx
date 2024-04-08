import { appInfo } from '@/contants';
import { SparklesPreview } from './components/Templates/SparklesPreview';
import { InfoCard } from './components/UI/info-card';
import { FAQItem, FAQItemProps } from './components/molecules/FAQItem';
import { Footer } from './components/molecules/Footer';
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

export default function Home() {
  return (
    <main className="min-h-screen">
      <SparklesPreview />
      <div className="max-w-5xl min-h-screen mx-auto lg:px-8">
        {FAQs.map(({ answer, question }) => {
          return <FAQItem key={question} question={question} answer={answer} />;
        })}
        <InfoCard items={appInfo} />
      </div>
      <Footer />
    </main>
  );
}

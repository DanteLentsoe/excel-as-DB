import { Footer } from '../components/molecules/Footer';
import { PageTitle } from '../components/molecules/PageTitle';
import { BreadCrumb } from '../components/organisms/BreadCrumb';
import { PrivacyPolicyContent } from '../components/organisms/PrivacyPolicyContent';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen overflow-auto">
      <BreadCrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Privacy and Policy', href: '/privacy-policy' },
        ]}
        className="mt-8 ml-8 w-80"
      />
      <section id="about" className="min-h-screen px-4 lg:px-48">
        <PageTitle
          title={'Privacy Policy for Sheetwise'}
          subtitle={'Key features of found within Sheetwise'}
          className="mt-24"
        />
        <PrivacyPolicyContent />
      </section>
      <Footer />
    </main>
  );
}

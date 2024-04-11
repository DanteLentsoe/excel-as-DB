import { Footer } from '../components/molecules/Footer';
import { PageTitle } from '../components/molecules/PageTitle';
import { BreadCrumb } from '../components/organisms/BreadCrumb';
import { Contact } from '../components/Templates/ContactUs';

export default function ContactUs() {
  return (
    <main className="min-h-screen overflow-auto">
      <BreadCrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact Me', href: '/contact' },
        ]}
        className="mt-8 ml-8 w-80"
      />
      <section id="about" className="min-h-screen px-4 lg:px-48">
        <PageTitle
          title={'Contact Me'}
          subtitle={'Get in touch'}
          className="mt-24"
        />
        <Contact />
      </section>
      <Footer />
    </main>
  );
}

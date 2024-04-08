import Link from 'next/link';

export const PrivacyPolicyContent = () => (
  <div>
    <i className="mb-4">Last updated: 2024-04-06</i>
    <p className="mt-4">
      This Privacy Policy describes how Sheetwise ("we," "us," or "our")
      collects, uses, and protects your personal information when you use our
      application ("Service"). By using the Service, you agree to the collection
      and use of information in accordance with this policy.
    </p>
    <h2 className="mt-8 mb-2 text-xl">Information Collection and Use</h2>
    <p className="mb-1">
      We collect information that you provide directly to us when you use our
      Service. This may include:
    </p>
    <ul>
      <li>
        Personal information: such as your name and email address, when you
        register for an account or contact us for support.
      </li>
      <li>
        Data files: We allow you to upload Excel files and access your data in a
        web-friendly format. Your files remain on your device and are not
        transmitted to our servers.
      </li>
    </ul>
    <h2 className="mt-8 mb-2 text-xl">Use of Data</h2>
    <p>We use the information we collect for various purposes, including to:</p>
    <ul>
      <li>Provide and maintain our Service.</li>
      <li>Notify you about changes to our Service.</li>
      <li>Provide customer support.</li>
      <li>Monitor the usage of our Service.</li>
      <li>Detect, prevent, and address technical issues.</li>
    </ul>
    <h2 className="mt-8 mb-2 text-xl">Data Storage and Security</h2>
    <ul>
      <li>
        Local Storage: Your data, including Excel files and custom forms, stays
        on your device. We do not store your data on our servers, ensuring your
        privacy and security.
      </li>
      <li>
        Google Sheets Integration: If you choose to integrate with Google
        Sheets, your data will be managed within Google's infrastructure. We do
        not have access to your Google Sheets data.
      </li>
    </ul>
    <h1 className="mt-8 mb-2 text-xl">Data Retention</h1>
    <p>
      We retain your information for as long as necessary to provide you with
      our Service and for our legitimate business purposes. Since your data is
      stored locally on your device, you have control over its retention and can
      delete it at any time.
    </p>
    <h2 className="mt-8 mb-2 text text-xl">Changes to This Privacy Policy</h2>
    <p>
      We may update our Privacy Policy from time to time. We will notify you of
      any changes by posting the new Privacy Policy on this page. You are
      advised to review this Privacy Policy periodically for any changes.
    </p>
    <h2 className="mt-8 mb-2 text-xl">Contact Us</h2>
    <p>
      If you have any questions about this Privacy Policy, please contact me at
      <Link href="mailto:dllentsoe@gmail.com" passHref>
        {' '}
        dllentsoe@gmail.com
      </Link>
      .
    </p>
  </div>
);

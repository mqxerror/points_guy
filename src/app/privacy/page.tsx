import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Points Guy x Mercan',
};

export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#0A1628] mb-8 tracking-[-0.02em]">
          Privacy Policy
        </h1>

        <div className="prose prose-sm text-[#475569] space-y-6">
          <p className="text-sm text-[#94A3B8]">Last updated: January 2026</p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">1. Information We Collect</h2>
          <p>
            When you submit an inquiry through our website, we collect the information you provide, including your name,
            email address, phone number, country of residence, and investment preferences. We also collect standard
            analytics data such as browser type, device information, and pages visited.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">2. How We Use Your Information</h2>
          <p>
            We use your information to respond to your inquiries, connect you with Mercan Group advisors, and provide
            information about investment immigration programs. We may also use your information to improve our website
            and services.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">3. Information Sharing</h2>
          <p>
            Your information is shared with Mercan Group for the purpose of providing investment immigration advisory
            services. We do not sell your personal information to third parties. We may share information with service
            providers who assist in operating our website and services.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. All data
            transmission is encrypted using SSL/TLS protocols.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. To exercise these rights, please
            contact us through the form on our website or email us directly.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">6. Cookies</h2>
          <p>
            We use essential cookies for website functionality and analytics cookies to understand how visitors interact
            with our website. You can control cookie settings through your browser.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">7. Contact</h2>
          <p>
            For privacy-related inquiries, please use the contact form on our website. This website is operated in
            partnership with Mercan Group.
          </p>
        </div>
      </div>
    </section>
  );
}

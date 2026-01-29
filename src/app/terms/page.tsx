import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | The Points Guy x Mercan',
};

export default function TermsPage() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#0A1628] mb-8 tracking-[-0.02em]">
          Terms of Service
        </h1>

        <div className="prose prose-sm text-[#475569] space-y-6">
          <p className="text-sm text-[#94A3B8]">Last updated: January 2026</p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">1. Overview</h2>
          <p>
            This website is operated by The Points Guy in partnership with Mercan Group. By accessing and using this
            website, you agree to these terms and conditions.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">2. Information Purpose</h2>
          <p>
            The information on this website is provided for general informational purposes only. It does not constitute
            legal, financial, or immigration advice. Investment immigration programs are subject to government
            regulations and may change without notice.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">3. No Guarantee</h2>
          <p>
            While we strive to provide accurate and up-to-date information, we make no representations or warranties of
            any kind about the completeness, accuracy, or reliability of the information provided. Past performance is
            not indicative of future results. Investment returns are not guaranteed.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">4. Professional Advice</h2>
          <p>
            You should consult with qualified legal, financial, and immigration professionals before making any
            investment decisions. The content on this website should not be relied upon as a substitute for professional
            advice tailored to your specific circumstances.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">5. Third-Party Services</h2>
          <p>
            This website may contain links to third-party websites or reference third-party services. We are not
            responsible for the content, policies, or practices of any third-party websites or services.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">6. Intellectual Property</h2>
          <p>
            All content on this website, including text, images, logos, and design elements, is the property of The
            Points Guy and Mercan Group or their respective licensors. Unauthorized use is prohibited.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, The Points Guy and Mercan Group shall not be liable for any indirect,
            incidental, or consequential damages arising from the use of this website or reliance on information provided.
          </p>

          <h2 className="text-lg font-semibold text-[#0A1628] mt-8">8. Changes</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance
            of any changes.
          </p>
        </div>
      </div>
    </section>
  );
}

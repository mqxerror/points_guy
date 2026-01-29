import { Hero } from '@/components/sections/Hero';
import { ProgramDetail } from '@/components/sections/ProgramDetail';
import { ProgramCards } from '@/components/sections/ProgramCards';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm';
import { FAQPageJsonLd, ProductJsonLd } from '@/components/seo/JsonLd';
import { UrgencyBanner } from '@/components/ui/UrgencyBanner';
import { PROGRAMS } from '@/lib/constants';
import { PortugalProperties } from '@/components/sections/PortugalProperties';
import { PortugalTimeline } from '@/components/sections/PortugalTimeline';
import Image from 'next/image';
import { BadgeCheck, Clock, Shield } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portugal Golden Visa | The Points Guy x Mercan',
  description:
    'Gain EU residency through Portugal\'s Golden Visa program. Invest €500,000 in Mercan\'s CMVM-regulated hospitality fund with 2% fixed returns and buyback guarantee.',
  openGraph: {
    title: 'Portugal Golden Visa | The Points Guy x Mercan',
    description: 'EU residency from €500,000. 2% fixed returns, buyback guarantee, path to citizenship.',
    images: [{ url: '/images/portugal/hero.jpg', width: 1200, height: 630 }],
  },
};

const OUTCOMES = [
  { title: 'EU Residency for Your Family', detail: 'Permits for spouse, children, and dependent parents', timeline: 'Within 18 months' },
  { title: 'Visa-Free Schengen Travel', detail: '26 European countries, no visa applications needed', timeline: 'Upon approval' },
  { title: 'Fixed 2% Annual Returns', detail: 'Consistent income with capital security', timeline: 'Every year' },
  { title: '7 Free Hotel Nights Annually', detail: 'Complimentary stays at premium Mercan properties', timeline: 'Every year' },
  { title: 'Capital Protection', detail: 'Buyback option for your investment', timeline: 'Year 6 to year 12' },
  { title: 'Path to EU Citizenship', detail: 'Portuguese passport, full EU citizenship', timeline: 'After 5 years' },
];

const PROPERTIES = [
  {
    name: 'Hotel Indigo Albufeira',
    brand: 'IHG',
    location: 'Algarve, Portugal',
    status: 'Operating',
    features: ['80 Premium Rooms', 'Restaurant', 'Outdoor Pool', 'Bar & Lounge'],
    image: '/images/portugal/hotel-indigo.jpg',
    fundInvestment: '€21M',
  },
  {
    name: 'Quinta da Praia',
    brand: 'Residence Inn by Marriott',
    location: 'Alvor, Algarve',
    status: 'Under Development',
    features: ['197 Units', 'Restaurant', 'Fitness Center', 'Pool Complex'],
    image: '/images/portugal/quinta-da-praia.png',
    fundInvestment: '€55M',
  },
  {
    name: 'Corfu Acharavi Hotel Collection',
    brand: 'Wyndham',
    location: 'Corfu, Greece',
    status: 'Operating',
    features: ['150+ Rooms', 'Fine Dining', 'Spa & Wellness', 'Beach Access'],
    image: '/images/portugal/corfu-resort.jpg',
    fundInvestment: '€45M',
  },
];

const PROCESS_STEPS = [
  { step: 1, title: 'Free Consultation', description: 'Discuss your goals and eligibility with a Mercan advisor.', duration: '30 min' },
  { step: 2, title: 'Documentation', description: 'We guide you through all required documents.', duration: '2-4 weeks' },
  { step: 3, title: 'Fund Investment', description: 'Complete your €500,000 MPEF II fund subscription.', duration: '1-2 weeks' },
  { step: 4, title: 'Application Filing', description: 'Your Golden Visa application is submitted to SEF.', duration: '2-4 weeks' },
  { step: 5, title: 'Approval & Residency', description: 'Receive your Portugal residency permit.', duration: '12-18 months' },
];

const FAQS = [
  { q: 'How long does the entire process take?', a: '18-24 months total. Fund subscription and application prep takes 4-8 weeks, then government processing approximately 12-18 months.' },
  { q: 'Can my family be included?', a: 'Yes — spouse, dependent children (including over 18 if in education), and dependent parents. No additional investment cost. Each family member gets their own permit.' },
  { q: 'What are the residency requirements?', a: 'Minimal stay: 7 days in year one, then 14 days per subsequent two-year period. No need to live in Portugal full-time.' },
  { q: 'How does the buyback work?', a: 'From year 6 to year 12, Mercan offers to buy back your fund units at 100% of the original investment value.' },
  { q: 'What returns will I receive?', a: 'Fixed 2% annual return paid yearly, plus 7 complimentary hotel nights once your Golden Visa is approved. No subscription fees — management fees are paid by the fund.' },
  { q: 'When can I apply for citizenship?', a: 'After 5 years of maintaining residency and meeting minimal stay requirements. Grants an EU passport with visa-free travel to 180+ countries.' },
];

export default function PortugalPage() {
  const program = PROGRAMS.find((p) => p.slug === 'portugal')!;

  return (
    <>
      <FAQPageJsonLd faqs={FAQS} />
      <ProductJsonLd name="Portugal Golden Visa" description="EU residency through CMVM-regulated hospitality fund investment" price="500000" currency="EUR" />
      <Hero
        headline="Give Your Family the Freedom of Europe"
        badges={['From €500,000', '18-Month Residency', 'Full Family Included', '2% Fixed Returns']}
        imageSrc={program.heroImage}
      />

      {/* Trust Bar */}
      <section className="bg-[#0A1628] py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-[#C9A84C]">€1.3B+</p>
              <p className="text-white/60 text-xs mt-0.5">Invested Since 1988</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#C9A84C]">4,100+</p>
              <p className="text-white/60 text-xs mt-0.5">Families Served</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#C9A84C]">100%</p>
              <p className="text-white/60 text-xs mt-0.5">Visa Approval Rate</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#C9A84C]">35+</p>
              <p className="text-white/60 text-xs mt-0.5">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Achieve */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-4 tracking-[-0.02em]">
            What You&apos;ll Achieve
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            A single investment unlocks a lifetime of European opportunity for your entire family.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OUTCOMES.map((outcome) => (
              <div key={outcome.title} className="bg-[#FAFAF5] rounded-xl p-6">
                <BadgeCheck className="h-5 w-5 text-[#C9A84C] mb-3" />
                <h3 className="font-semibold text-[#0A1628] mb-1">{outcome.title}</h3>
                <p className="text-[#475569] text-sm mb-3">{outcome.detail}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#C9A84C]">
                  <Clock className="h-3 w-3" /> {outcome.timeline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProgramDetail program={program} />

      {/* Investment Portfolio */}
      <section className="py-16 md:py-24 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-3 tracking-[-0.02em]">
            Your Investment Portfolio
          </h2>
          <p className="text-[#475569] text-center mb-4 max-w-xl mx-auto">
            MPEF II — a €121M diversified fund across 3 premium hotel properties (65% Portugal, 35% Greece).
          </p>
          <p className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-sm text-[#C9A84C] font-medium">
              <Shield className="h-4 w-4" /> CMVM Regulated Fund
            </span>
          </p>

          <PortugalProperties properties={PROPERTIES} />
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-4 tracking-[-0.02em]">
            Your Path to Residency
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            A simple, guided process from consultation to approval. We handle everything.
          </p>
          <PortugalTimeline steps={PROCESS_STEPS} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-[#FAFAF5]">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-12 tracking-[-0.02em]">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={FAQS} bgClass="bg-white" />
        </div>
      </section>

      {/* Urgency */}
      <section className="py-8 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <UrgencyBanner
            message="Portugal Golden Visa fund allocation is limited"
            subtext="MPEF II has a fixed capacity of €121M. Secure your allocation before the fund closes to new subscriptions."
            progress={78}
            progressLabel="Fund capacity"
          />
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" className="py-16 md:py-24 bg-[#132240]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-3 tracking-[-0.02em]">
            Start Your EU Journey
          </h2>
          <p className="text-white/60 text-center mb-10 max-w-md mx-auto">
            Join 4,100+ families who chose Mercan. Free 30-minute consultation, no obligation. We respond within 24 hours.
          </p>
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
            <LeadCaptureForm defaultProgram="portugal" />
          </div>
        </div>
      </section>

      <ProgramCards excludeSlug="portugal" title="Explore Other Programs" />
    </>
  );
}

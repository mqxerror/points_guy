import { Hero } from '@/components/sections/Hero';
import { ProgramDetail } from '@/components/sections/ProgramDetail';
import { ProgramCards } from '@/components/sections/ProgramCards';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm';
import { FAQPageJsonLd, ProductJsonLd } from '@/components/seo/JsonLd';
import { UrgencyBanner } from '@/components/ui/UrgencyBanner';
import { PROGRAMS } from '@/lib/constants';
import { GreeceUnitCards } from '@/components/sections/GreeceUnitCards';
import { PortugalTimeline } from '@/components/sections/PortugalTimeline';
import Image from 'next/image';
import { BadgeCheck, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Greece Golden Visa | The Points Guy x Mercan',
  description:
    'Own property in Athens and secure EU residency from €250,000. 3% guaranteed returns for 10 years, full family inclusion, no minimum stay.',
  openGraph: {
    title: 'Greece Golden Visa | The Points Guy x Mercan',
    description: 'EU residency from €250,000. Direct property ownership, 3% guaranteed returns.',
    images: [{ url: '/images/greece/hero.jpg', width: 1200, height: 630 }],
  },
};

const OUTCOMES = [
  { title: 'Full Property Ownership', detail: 'Individual title deed in your name — real, tangible asset', timeline: 'Upon completion' },
  { title: 'EU Residency in Months', detail: 'Permits for your entire family — spouse, children, parents', timeline: '4-6 months' },
  { title: '3% Guaranteed Annual Returns', detail: 'Professional management with consistent income for 10 years', timeline: 'Every year' },
  { title: '4-7% Capital Appreciation', detail: "Based on Greece's Residential Price Index trajectory", timeline: 'Annually' },
  { title: 'Visa-Free Schengen Travel', detail: '26 European countries without visa applications', timeline: 'Upon approval' },
  { title: 'No Minimum Stay', detail: 'Maintain EU residency without living in Greece', timeline: 'Ongoing' },
];

const INVESTMENT_ROUTES = [
  { route: 'Real Estate (Residential)', minimum: '€250,000', holding: '5 years', note: 'Direct property ownership with title deed in your name', recommended: true },
  { route: 'Real Estate (Commercial)', minimum: '€250,000', holding: '5 years', note: 'Commercial properties in designated areas' },
  { route: 'Government Bonds', minimum: '€400,000', holding: '3 years', note: 'Greek government bonds or corporate securities' },
];

const PROPERTY_FEATURES = [
  { label: 'Units', value: '408 premium residential' },
  { label: 'Starting Price', value: '€250,000' },
  { label: 'Location', value: 'Piraeus, Athens' },
  { label: 'Completion', value: 'End of 2027' },
  { label: 'Management', value: 'Professional included' },
  { label: 'Returns', value: '3% guaranteed / 10 years' },
];

const PROCESS_STEPS = [
  { step: 1, title: 'Free Consultation', description: 'Discuss your goals and view available units with a Mercan advisor.', duration: '30 min' },
  { step: 2, title: 'Unit Selection & Agreement', description: 'Choose your unit and sign the purchase agreement.', duration: '~1 week' },
  { step: 3, title: 'Preparation & Filing', description: 'Complete documentation and submit your Golden Visa application.', duration: '1-3 weeks' },
  { step: 4, title: 'Government Processing', description: 'Application reviewed by Greek immigration authorities.', duration: '4-6 months' },
  { step: 5, title: 'Approval & Residency', description: 'Receive your Greece residency permit.', duration: 'Upon approval' },
];

const FAQS = [
  { q: "Why is Greece's Golden Visa more affordable?", a: 'Greece offers the lowest entry point in Europe at €250,000. You receive direct property ownership with an individual title deed, rather than a fund-based investment.' },
  { q: 'What returns will I receive?', a: "Guaranteed 3% annual return for 10 years through professional management, plus expected 4-7% annual capital appreciation based on Greece's Residential Price Index." },
  { q: 'Do I need to live in Greece?', a: 'No minimum stay requirement. Your EU residency is maintained without living in Greece, and Schengen travel benefits are included.' },
  { q: 'Can I use the property personally?', a: 'During the rental management period, the property generates guaranteed returns. After 10 years, you have full control — continue renting at market rates or sell at appreciated value.' },
  { q: 'Can my family be included?', a: 'Yes. Spouse, children under 21, and dependent parents are included at no additional investment cost. Each receives an individual residency permit.' },
  { q: 'When will the property be completed?', a: 'Scheduled completion end of 2027. Your Golden Visa application can be submitted immediately upon signing the purchase agreement — no need to wait for construction.' },
];

export default function GreecePage() {
  const program = PROGRAMS.find((p) => p.slug === 'greece')!;

  return (
    <>
      <FAQPageJsonLd faqs={FAQS} />
      <ProductJsonLd name="Greece Golden Visa" description="EU residency through direct property ownership in Athens" price="250000" currency="EUR" />
      <Hero
        headline="Own a Piece of Athens. And a Future in Europe."
        badges={['From €250,000', '4-6 Month Residency', '3% Guaranteed Returns', 'Full Family Included']}
        imageSrc={program.heroImage}
      />

      {/* Trust Bar */}
      <section className="bg-[#0A1628] py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-[#C9A84C]">€250K</p>
              <p className="text-white/60 text-xs mt-0.5">Minimum Investment</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#C9A84C]">3%</p>
              <p className="text-white/60 text-xs mt-0.5">Guaranteed Returns</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#C9A84C]">100%</p>
              <p className="text-white/60 text-xs mt-0.5">Visa Approval Rate</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#C9A84C]">4-6 mo</p>
              <p className="text-white/60 text-xs mt-0.5">To Residency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-4 tracking-[-0.02em]">
            What You&apos;ll Achieve
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            Europe&apos;s most accessible Golden Visa with real property ownership and guaranteed income.
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

      {/* Investment Routes */}
      <section className="py-16 md:py-24 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-4 tracking-[-0.02em]">
            Investment Routes
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            Multiple qualifying routes — Mercan specializes in residential real estate, the most popular and affordable path.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {INVESTMENT_ROUTES.map((option) => (
              <div key={option.route} className={`rounded-xl p-6 ${option.recommended ? 'bg-[#0A1628] text-white ring-2 ring-[#C9A84C]' : 'bg-white'}`}>
                {option.recommended && <p className="text-xs font-medium text-[#C9A84C] mb-3 uppercase tracking-wider">Recommended</p>}
                <h3 className={`font-semibold mb-1 ${option.recommended ? 'text-white' : 'text-[#0A1628]'}`}>{option.route}</h3>
                <p className={`text-2xl font-bold mb-2 ${option.recommended ? 'text-[#C9A84C]' : 'text-[#0A1628]'}`}>{option.minimum}</p>
                <p className={`text-sm mb-1 ${option.recommended ? 'text-white/70' : 'text-[#475569]'}`}>Holding: {option.holding}</p>
                <p className={`text-xs ${option.recommended ? 'text-white/50' : 'text-[#94A3B8]'}`}>{option.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProgramDetail program={program} />

      {/* Property: Keranis Residence */}
      <section className="py-16 md:py-24 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-3 tracking-[-0.02em]">
            Keranis Residence, Piraeus
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            The largest mixed-use development in Piraeus — 408 premium residential units near Athens&apos; iconic harbor.
          </p>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden col-span-2">
                  <Image src="/images/greece/piraeus.jpg" alt="Keranis Residence exterior" fill className="object-cover" sizes="50vw" />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src="/images/greece/courtyard.jpg" alt="Landscaped courtyard" fill className="object-cover" sizes="25vw" />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src="/images/greece/rooftop.jpg" alt="Rooftop gardens" fill className="object-cover" sizes="25vw" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {PROPERTY_FEATURES.map((f) => (
                  <div key={f.label} className="bg-white rounded-lg p-4">
                    <p className="text-xs text-[#94A3B8] uppercase tracking-wider">{f.label}</p>
                    <p className="text-[#0A1628] font-semibold mt-1">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-white rounded-lg p-5">
                <h3 className="font-semibold text-[#0A1628] mb-2">After 10 Years</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Full property control returns to you. Continue renting at market rates for ongoing income, or sell at appreciated value. The property is yours — a real asset with a real deed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unit Types */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-12 tracking-[-0.02em]">
            Available Unit Types
          </h2>
          <GreeceUnitCards />
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-4 tracking-[-0.02em]">
            Simple 5-Step Process
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            From consultation to residency in as little as 9-10 months. We guide you every step.
          </p>
          <PortugalTimeline steps={PROCESS_STEPS} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-12 tracking-[-0.02em]">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      {/* Urgency */}
      <section className="py-8 bg-[#FAFAF5]">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <UrgencyBanner
            message="Greece is expected to raise the Golden Visa threshold"
            subtext="Lock in the current €250,000 minimum before the anticipated increase. Limited units available at Keranis Residence."
            progress={65}
            progressLabel="Units reserved"
          />
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" className="py-16 md:py-24 bg-[#132240]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-3 tracking-[-0.02em]">
            Secure Your Family&apos;s European Future
          </h2>
          <p className="text-white/60 text-center mb-10 max-w-md mx-auto">
            Europe&apos;s most affordable Golden Visa. Free consultation, 24-hour response. No obligation.
          </p>
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
            <LeadCaptureForm defaultProgram="greece" />
          </div>
        </div>
      </section>

      <ProgramCards excludeSlug="greece" title="Explore Other Programs" />
    </>
  );
}

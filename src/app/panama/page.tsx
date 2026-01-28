import { Hero } from '@/components/sections/Hero';
import { ProgramDetail } from '@/components/sections/ProgramDetail';
import { ProgramCards } from '@/components/sections/ProgramCards';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm';
import { FAQPageJsonLd, ProductJsonLd } from '@/components/seo/JsonLd';
import { UrgencyBanner } from '@/components/ui/UrgencyBanner';
import { PROGRAMS } from '@/lib/constants';
import Image from 'next/image';
import { BadgeCheck, Clock, DollarSign, Globe, Shield, Briefcase, Building } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panama Qualified Investor Visa | The Points Guy x Mercan',
  description:
    'Permanent residency in Panama in 30 days. $300,000 minimum investment in branded hospitality projects. Territorial tax system, US dollar economy, visa-free to 142 countries.',
  openGraph: {
    title: 'Panama Qualified Investor Visa | The Points Guy x Mercan',
    description: 'Permanent residency in 30 days. $300,000 minimum, territorial tax system.',
    images: [{ url: '/images/panama/hero.jpg', width: 1200, height: 630 }],
  },
};

const OUTCOMES = [
  { title: 'Permanent Residency from Day One', detail: 'No temporary status — permanent residency granted immediately upon approval', timeline: '30 business days' },
  { title: 'Territorial Tax System', detail: 'Income earned outside Panama is completely tax-free. Bank interest is also tax-exempt', timeline: 'Ongoing' },
  { title: 'US Dollar Economy', detail: 'Fully dollarized economy eliminates currency exchange risk', timeline: 'Ongoing' },
  { title: 'Visa-Free to 142 Countries', detail: 'Including Schengen Area, UK, most of South America, Mexico, Singapore, and more', timeline: 'Upon approval' },
  { title: 'Full Family Inclusion', detail: 'Spouse, children under 25, dependent parents, and disabled relatives', timeline: 'Same application' },
  { title: 'Path to Citizenship', detail: 'Eligible after 5 years of legal residence. Panama passport ranked 34th globally', timeline: 'After 5 years' },
  { title: 'Right to Work', detail: 'Permanent residents can work, start businesses, and invest freely in Panama', timeline: 'Upon approval' },
  { title: 'Minimal Physical Presence', detail: 'Only one visit every two years for one week to maintain residency', timeline: 'Every 2 years' },
];

const INVESTMENT_OPTIONS = [
  { route: 'Real Estate (Hospitality)', minimum: '$300,000', holding: '5 years', note: 'Invest in Mercan\'s branded hotel projects' },
  { route: 'Securities (Stock Market)', minimum: '$500,000', holding: '5 years', note: 'Through licensed Panamanian broker' },
  { route: 'Bank Deposit', minimum: '$750,000', holding: '5 years', note: 'Licensed Panamanian bank, tax-free interest' },
];

const PROJECTS = [
  {
    name: 'Pullman Panama Hotel',
    brand: 'Accor (Pullman)',
    description: 'A landmark branded hotel development in Panama City featuring premium rooms, serviced residences, and a casino. Designed as one of the most distinctive hospitality projects in the region.',
    features: ['Premium Hotel Rooms', 'Serviced Residences', 'Casino', 'Rooftop Pool', 'Restaurant & Bar', 'Fitness Center'],
    image: '/images/panama/pullman-facade.jpg',
  },
  {
    name: 'Santa Maria Residences',
    brand: 'Santa Maria',
    description: 'A luxury residential tower in one of Panama City\'s most prestigious neighborhoods. Premium units with panoramic city and ocean views.',
    features: ['Luxury Apartments', 'Ocean Views', 'Concierge Service', 'Rooftop Amenities', 'Prime Location'],
    image: '/images/panama/santa-maria-tower.jpg',
  },
];

const PROCESS_STEPS = [
  { step: 1, title: 'Free Consultation', description: 'Discuss your goals and eligibility. Review available investment projects with a Mercan advisor.', duration: '30 min' },
  { step: 2, title: 'Documentation & Due Diligence', description: 'Submit applicant information, proof of funds, and supporting documents.', duration: '1-2 weeks' },
  { step: 3, title: 'Investment & Filing', description: 'Complete your investment and submit your application to Panama\'s National Immigration Service.', duration: '1-2 weeks' },
  { step: 4, title: 'Biometrics Visit', description: 'Visit Panama in person for fingerprints and photo registration.', duration: '1 trip' },
  { step: 5, title: 'Approval & Residency', description: 'Receive permanent residency status — approved in as little as 30 business days.', duration: '~30 days' },
];

const WHY_PANAMA = [
  { icon: DollarSign, title: 'Dollar Economy', detail: 'Fully dollarized since 1904. No currency risk, seamless transactions.' },
  { icon: Globe, title: 'Strategic Location', detail: 'Hub of the Americas — direct flights to North America, South America, and Europe.' },
  { icon: Building, title: 'Financial Center', detail: 'Over 70 international banks. Major trade and banking hub of Latin America.' },
  { icon: Shield, title: 'Political Stability', detail: 'Democratic government with strong institutions and rule of law.' },
  { icon: Briefcase, title: 'Business Friendly', detail: 'Free trade zones, tax exemptions, and special economic regimes for investors.' },
  { icon: Globe, title: 'Panama Canal', detail: 'Handles ~5% of global trade. Strategic economic asset driving growth.' },
];

const FAQS = [
  { q: 'Why did Mercan partner with Panama?', a: 'Mercan was selected by the Government of Panama as their official strategic partner to promote the Qualified Investor Program internationally. This partnership was formalized in October 2025 and reflects Mercan\'s 35+ years of global investment immigration expertise.' },
  { q: 'How fast is the approval process?', a: 'Panama offers one of the fastest residency timelines globally — approximately 30 business days from application filing to permanent residency approval.' },
  { q: 'Can my family be included?', a: 'Yes. Spouse, unmarried children under 18, unmarried children 18-25 who are financially dependent, dependent parents, and disabled relatives. Civil/domestic partnerships (2+ years) are also eligible.' },
  { q: 'Do I need to live in Panama?', a: 'No. You only need to visit once every two years for approximately one week to maintain your permanent residency status.' },
  { q: 'What is the territorial tax system?', a: 'Panama only taxes income sourced within Panama. Foreign income, offshore investments, and bank deposit interest are completely tax-free. This makes Panama one of the most tax-efficient residency options globally.' },
  { q: 'Can I work in Panama?', a: 'Yes. Permanent residents have the right to work, start businesses, and invest freely in Panama with no restrictions.' },
  { q: 'How does citizenship work?', a: 'After 5 years of continuous legal residence, you can apply for Panama citizenship. This requires Spanish fluency and passing a test on Panama\'s history, geography, and civil rights.' },
  { q: 'What is the Special Investor Passport?', a: 'Law No. 493 of 2025 introduced a distinct passport for qualified investors, formalizing their status. The Panama passport provides visa-free or visa-on-arrival access to 142 countries.' },
];

export default function PanamaPage() {
  const program = PROGRAMS.find((p) => p.slug === 'panama')!;

  return (
    <>
      <FAQPageJsonLd faqs={FAQS} />
      <ProductJsonLd name="Panama Qualified Investor Visa" description="Permanent residency through branded hospitality investment in Panama" price="300000" currency="USD" />
      <Hero
        headline="Permanent Residency in the Americas' Most Strategic Hub"
        subtext="Panama Qualified Investor Program from $300,000 — permanent residency in 30 days, territorial tax system, US dollar economy. Mercan is Panama's official strategic partner."
        imageSrc={program.heroImage}
      />

      {/* Trust Bar */}
      <section className="bg-[#0A1628] py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-[#C9A84C]">$300K</p>
              <p className="text-white/60 text-xs mt-0.5">Minimum Investment</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#C9A84C]">30 Days</p>
              <p className="text-white/60 text-xs mt-0.5">To Residency</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#C9A84C]">142</p>
              <p className="text-white/60 text-xs mt-0.5">Visa-Free Countries</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#C9A84C]">0%</p>
              <p className="text-white/60 text-xs mt-0.5">Tax on Foreign Income</p>
            </div>
          </div>
        </div>
      </section>

      {/* Government Partnership Banner */}
      <section className="py-8 bg-[#C9A84C]/5 border-y border-[#C9A84C]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-sm text-[#B8953E] font-medium">
            <Shield className="inline h-4 w-4 mr-1.5 -mt-0.5" />
            Official Strategic Partner of the Government of Panama for the Qualified Investor Program
          </p>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-4 tracking-[-0.02em]">
            What You&apos;ll Achieve
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            The fastest path to permanent residency in the Americas — with unmatched tax benefits.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {OUTCOMES.map((outcome) => (
              <div key={outcome.title} className="bg-[#FAFAF5] rounded-xl p-5">
                <BadgeCheck className="h-5 w-5 text-[#C9A84C] mb-3" />
                <h3 className="font-semibold text-[#0A1628] text-sm mb-1">{outcome.title}</h3>
                <p className="text-[#475569] text-xs mb-2">{outcome.detail}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#C9A84C]">
                  <Clock className="h-3 w-3" /> {outcome.timeline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Options */}
      <section className="py-16 md:py-24 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-4 tracking-[-0.02em]">
            Investment Options
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            Three qualifying routes — all with a mandatory 5-year holding period. Mercan specializes in the real estate route.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {INVESTMENT_OPTIONS.map((option, idx) => (
              <div key={option.route} className={`rounded-xl p-6 ${idx === 0 ? 'bg-[#0A1628] text-white ring-2 ring-[#C9A84C]' : 'bg-white'}`}>
                {idx === 0 && <p className="text-xs font-medium text-[#C9A84C] mb-3 uppercase tracking-wider">Recommended</p>}
                <h3 className={`font-semibold mb-1 ${idx === 0 ? 'text-white' : 'text-[#0A1628]'}`}>{option.route}</h3>
                <p className={`text-2xl font-bold mb-2 ${idx === 0 ? 'text-[#C9A84C]' : 'text-[#0A1628]'}`}>{option.minimum}</p>
                <p className={`text-sm mb-1 ${idx === 0 ? 'text-white/70' : 'text-[#475569]'}`}>Holding: {option.holding}</p>
                <p className={`text-xs ${idx === 0 ? 'text-white/50' : 'text-[#94A3B8]'}`}>{option.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProgramDetail program={program} />

      {/* Featured Projects */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-3 tracking-[-0.02em]">
            Featured Investment Projects
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            Landmark hospitality developments in Panama City — following Mercan&apos;s proven model from 34 projects in Portugal and Greece.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {PROJECTS.map((project) => (
              <div key={project.name} className="bg-[#FAFAF5] rounded-xl overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image src={project.image} alt={project.name} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium text-[#C9A84C] mb-1">{project.brand}</p>
                  <h3 className="text-lg font-semibold text-[#0A1628] mb-2">{project.name}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.features.map((f) => (
                      <span key={f} className="text-xs bg-white text-[#475569] px-2.5 py-1 rounded">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Project Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-5xl mx-auto">
            {[
              { src: '/images/panama/pullman-lobby.jpg', alt: 'Pullman Hotel Lobby' },
              { src: '/images/panama/pullman-pool.jpg', alt: 'Pullman Rooftop Pool' },
              { src: '/images/panama/santa-maria.jpg', alt: 'Santa Maria Residences' },
              { src: '/images/panama/lifestyle.jpg', alt: 'Panama Lifestyle' },
            ].map((img) => (
              <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Panama */}
      <section className="py-16 md:py-24 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-4 tracking-[-0.02em]">
            Why Panama?
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            A dollar-based economy with stable institutions, strategic location, and one of the most favorable tax systems in the world.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_PANAMA.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-xl p-6">
                  <Icon className="h-5 w-5 text-[#C9A84C] mb-3" />
                  <h3 className="font-semibold text-[#0A1628] mb-1">{item.title}</h3>
                  <p className="text-[#475569] text-sm">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Panama Lifestyle Gallery */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-12 tracking-[-0.02em]">
            Life in Panama
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden md:col-span-2 md:row-span-2">
              <Image src="/images/panama/skyline.jpg" alt="Panama City skyline" fill className="object-cover" sizes="66vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-semibold">Panama City</p>
                <p className="text-white/70 text-sm">A modern skyline rivaling Miami</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src="/images/panama/beach.jpg" alt="Panama beaches" fill className="object-cover" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-white font-semibold text-sm">Tropical Beaches</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src="/images/panama/canal.jpg" alt="Panama Canal" fill className="object-cover" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-white font-semibold text-sm">Panama Canal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-4 tracking-[-0.02em]">
            Your Path to Residency
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            One of the fastest residency processes globally — from consultation to permanent residency in weeks, not months.
          </p>
          <div className="max-w-3xl mx-auto space-y-0">
            {PROCESS_STEPS.map((s, idx) => (
              <div key={s.step} className="flex gap-4 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C9A84C] text-white font-bold text-sm shrink-0">
                    {s.step}
                  </div>
                  {idx < PROCESS_STEPS.length - 1 && <div className="w-px h-full bg-[#C9A84C]/20 my-1" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold text-[#0A1628]">{s.title}</h3>
                  <p className="text-[#475569] text-sm mt-1">{s.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#94A3B8] mt-1.5">
                    <Clock className="h-3 w-3" /> {s.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
            message="New program — early investors get priority processing"
            subtext="Panama's Qualified Investor Program launched in October 2025. Mercan's first allocation of Pullman Hotel units is limited."
          />
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" className="py-16 md:py-24 bg-[#132240]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-3 tracking-[-0.02em]">
            Start Your Panama Journey
          </h2>
          <p className="text-white/60 text-center mb-10 max-w-md mx-auto">
            As Panama&apos;s official strategic partner, Mercan provides direct access to the Qualified Investor Program. Free consultation, 24-hour response.
          </p>
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
            <LeadCaptureForm defaultProgram="panama" />
          </div>
        </div>
      </section>

      <ProgramCards excludeSlug="panama" title="Explore Other Programs" />
    </>
  );
}

import { Hero } from '@/components/sections/Hero';
import { ProgramCards } from '@/components/sections/ProgramCards';
import { ProgramComparison } from '@/components/sections/ProgramComparison';
import { ProgramQuiz } from '@/components/sections/ProgramQuiz';
import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm';
import Image from 'next/image';
import { Globe, Home, MapPin, Shield, Users, TrendingUp, BadgeCheck, Banknote } from 'lucide-react';

const STATS = [
  { value: '€1.3B+', label: 'Invested' },
  { value: '4,100+', label: 'Families Served' },
  { value: '34', label: 'Hotels & Projects' },
  { value: '35+', label: 'Years Experience' },
];

const PARTNERS = [
  { name: 'Marriott', src: '/images/partners/marriott.png' },
  { name: 'IHG', src: '/images/partners/ihg.png' },
  { name: 'Wyndham', src: '/images/partners/wyndham.png' },
  { name: 'Hilton', src: '/images/partners/hilton.png' },
  { name: 'Hard Rock', src: '/images/partners/hardrock.png' },
];

const PROGRAM_HIGHLIGHTS = [
  {
    name: 'Portugal Golden Visa',
    href: '/portugal',
    investment: 'From €500,000',
    timeline: '18-24 months to residency',
    icon: Globe,
    highlights: [
      'EU residency for the whole family',
      'Visa-free Schengen travel to 26 countries',
      '2% fixed annual returns',
      'Buyback guarantee from year 6',
      'Path to EU citizenship after 5 years',
      'Only 7 days/year minimum stay',
    ],
    description:
      'Invest in Mercan\'s CMVM-regulated hospitality fund (MPEF II) across premium hotel properties in Portugal and Greece. Includes 7 complimentary hotel nights annually at Mercan properties.',
    image: '/images/portugal/hero.jpg',
  },
  {
    name: 'Greece Golden Visa',
    href: '/greece',
    investment: 'From €250,000',
    timeline: '4-6 months to residency',
    icon: Home,
    highlights: [
      'Europe\'s most affordable Golden Visa',
      'Direct property ownership with title deed',
      '3% guaranteed annual returns for 10 years',
      '4-7% expected capital appreciation',
      'No minimum stay requirement',
      'Family inclusion at no extra cost',
    ],
    description:
      'Own a premium residential unit at Keranis Residence in Piraeus, Athens — the largest mixed-use development in the area. Professional property management and guaranteed rental income included.',
    image: '/images/greece/hero.jpg',
  },
  {
    name: 'Panama Qualified Investor',
    href: '/panama',
    investment: 'From $300,000',
    timeline: '30 days to permanent residency',
    icon: MapPin,
    highlights: [
      'Permanent residency from day one',
      'Territorial tax system — foreign income tax-free',
      'US dollar economy, no currency risk',
      'Visa-free access to 142 countries',
      'Path to citizenship after 5 years',
      'Strategic Americas hub location',
    ],
    description:
      'Mercan is the official strategic partner of the Government of Panama for the Qualified Investor Program. Invest in landmark hospitality projects including a branded Pullman hotel and serviced residences.',
    image: '/images/panama/hero.jpg',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        headline="Your Path to Global Residency"
        subtext="Explore investment immigration programs in Portugal, Greece, and Panama — curated by The Points Guy and powered by Mercan Group."
        imageSrc="/images/hero/main.jpg"
      />

      {/* Trust Stats Bar */}
      <section className="bg-[#0A1628] py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-[#C9A84C]">{stat.value}</p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProgramCards title="Explore Our Programs" />

      <ProgramComparison />

      {/* Detailed Program Highlights */}
      <section className="py-16 md:py-24 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-4 tracking-[-0.02em]">
            Three Paths to Residency
          </h2>
          <p className="text-[#475569] text-center mb-12 md:mb-16 max-w-2xl mx-auto">
            Each program offers unique advantages tailored to different goals — from EU citizenship to tax optimization to the fastest permanent residency in the Americas.
          </p>

          <div className="space-y-12 md:space-y-16">
            {PROGRAM_HIGHLIGHTS.map((program, idx) => {
              const Icon = program.icon;
              const isReversed = idx % 2 === 1;
              return (
                <div
                  key={program.name}
                  className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}
                >
                  {/* Image */}
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={program.image}
                        alt={program.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#C9A84C]/10">
                        <Icon className="h-5 w-5 text-[#C9A84C]" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-[#0A1628]">{program.name}</h3>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#C9A84C]/10 text-[#B8953E]">
                        {program.investment}
                      </span>
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#132240]/5 text-[#475569]">
                        {program.timeline}
                      </span>
                    </div>

                    <p className="text-[#475569] text-sm leading-relaxed mb-4">
                      {program.description}
                    </p>

                    <ul className="space-y-2 mb-5">
                      {program.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-[#1E293B]">
                          <BadgeCheck className="h-4 w-4 text-[#C9A84C] mt-0.5 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={program.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C9A84C] hover:text-[#B8953E] transition-colors"
                    >
                      Learn more about {program.name.split(' ')[0]}
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Mercan */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] mb-4 tracking-[-0.02em]">
                A Commitment to Excellence
              </h2>
              <p className="text-sm font-medium text-[#C9A84C] mb-6 uppercase tracking-wider">
                35+ Years of Global Expertise
              </p>
              <p className="text-[#475569] leading-relaxed mb-4">
                Founded in 1989, Mercan Group is a global leader in investment immigration. With over €1.3 billion raised in direct Golden Visa investments and 4,100+ investor families served, Mercan provides end-to-end support from initial consultation through residency approval.
              </p>
              <p className="text-[#475569] leading-relaxed mb-6">
                Mercan is the largest internationally branded hotel operator in Portugal, managing 34 hotel properties and projects across Portugal and Greece in partnership with the world&apos;s leading hospitality brands. Every investment is fully regulated, independently audited, and backed by a team of 900+ professionals worldwide.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-[#C9A84C]" />
                  <span className="text-sm text-[#1E293B]">CMVM Regulated Fund</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-[#C9A84C]" />
                  <span className="text-sm text-[#1E293B]">900+ Team Members</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-[#C9A84C]" />
                  <span className="text-sm text-[#1E293B]">100% Success Rate</span>
                </div>
                <div className="flex items-center gap-3">
                  <Banknote className="h-5 w-5 text-[#C9A84C]" />
                  <span className="text-sm text-[#1E293B]">Zero Investor Losses</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-[#FAFAF5] rounded-xl p-8 md:p-10">
                <p className="text-sm font-medium text-[#94A3B8] uppercase tracking-wider mb-6">
                  Trusted Hotel Partners
                </p>
                <div className="grid grid-cols-3 gap-6 items-center">
                  {PARTNERS.map((partner) => (
                    <div key={partner.name} className="flex items-center justify-center">
                      <Image
                        src={partner.src}
                        alt={partner.name}
                        width={120}
                        height={48}
                        className="opacity-60 hover:opacity-100 transition-opacity object-contain h-10"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProgramQuiz />

      {/* Lead Form */}
      <section id="lead-form" className="py-16 md:py-24 bg-[#132240]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-3 tracking-[-0.02em]">
            Ready to Secure Your Family&apos;s Future?
          </h2>
          <p className="text-white/60 text-center mb-10 max-w-md mx-auto">
            Tell us about your interest and a Mercan advisor will reach out within 24 hours. Free consultation, no obligation.
          </p>
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
            <LeadCaptureForm />
          </div>
        </div>
      </section>
    </>
  );
}

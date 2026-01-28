'use client';

import Image from 'next/image';
import { useState } from 'react';
import { GlowCard } from '@/components/ui/aceternity/glow-card';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { BadgeCheck, Home, TrendingUp } from 'lucide-react';

const UNITS = [
  {
    title: 'Studio Units',
    description: 'Modern studio apartments ideal for investment. Professional management with guaranteed rental returns.',
    price: 'From \u20AC250,000',
    image: '/images/greece/studio.jpg',
    alt: 'Studio apartment',
    size: '30-40 m\u00B2',
    details: [
      'Open-plan living and sleeping area',
      'Modern fitted kitchen',
      'Full bathroom with premium finishes',
      'Private balcony',
      'Professional property management included',
      '3% guaranteed returns for 10 years',
    ],
  },
  {
    title: 'One-Bedroom Units',
    description: 'Spacious one-bedroom apartments with premium finishes. Higher rental yield potential in prime Piraeus location.',
    price: 'From \u20AC300,000',
    image: '/images/greece/one-bedroom.jpg',
    alt: 'One bedroom apartment',
    size: '45-55 m\u00B2',
    details: [
      'Separate bedroom with built-in storage',
      'Open-plan living area',
      'Modern fitted kitchen',
      'Full bathroom with premium finishes',
      'Private balcony with harbor views',
      'Higher rental yield potential',
    ],
  },
];

export function GreeceUnitCards() {
  const [selectedUnit, setSelectedUnit] = useState<typeof UNITS[number] | null>(null);

  return (
    <>
      <p className="text-center text-sm text-[#94A3B8] mb-8">Click a unit type to see details</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {UNITS.map((unit) => (
          <GlowCard key={unit.title}>
            <button
              type="button"
              onClick={() => setSelectedUnit(unit)}
              className="w-full text-left cursor-pointer group transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10]">
                <Image src={unit.image} alt={unit.alt} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#0A1628]">{unit.title}</h3>
                <p className="text-[#475569] text-sm mt-1">{unit.description}</p>
                <p className="text-[#C9A84C] font-semibold text-sm mt-3">{unit.price}</p>
              </div>
            </button>
          </GlowCard>
        ))}
      </div>

      <ProjectModal
        isOpen={!!selectedUnit}
        onClose={() => setSelectedUnit(null)}
        image={selectedUnit?.image ?? ''}
        imageAlt={selectedUnit?.alt ?? ''}
      >
        {selectedUnit && (
          <>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-1">{selectedUnit.title}</h2>
            <p className="text-[#C9A84C] font-semibold mb-4">{selectedUnit.price}</p>

            <div className="flex items-center gap-4 text-sm text-[#475569] mb-6">
              <span className="flex items-center gap-1.5">
                <Home className="h-4 w-4 text-[#C9A84C]" />
                {selectedUnit.size}
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-[#C9A84C]" />
                3% guaranteed / 10 years
              </span>
            </div>

            <p className="text-[#475569] text-sm mb-5">{selectedUnit.description}</p>

            <div className="border-t border-[#F1F5F9] pt-5">
              <h3 className="text-sm font-semibold text-[#0A1628] mb-3">Unit Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedUnit.details.map((d) => (
                  <div key={d} className="flex items-center gap-2 text-sm text-[#475569]">
                    <BadgeCheck className="h-4 w-4 text-[#C9A84C] shrink-0" />
                    {d}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-[#FAFAF5] rounded-xl p-4">
              <p className="text-sm text-[#475569]">
                Part of <span className="font-semibold text-[#0A1628]">Keranis Residence</span> — the largest mixed-use development in Piraeus, Athens. Completion scheduled end of 2027. Your Golden Visa application can be submitted immediately upon signing.
              </p>
            </div>
          </>
        )}
      </ProjectModal>
    </>
  );
}

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { GlowCard } from '@/components/ui/aceternity/glow-card';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { BadgeCheck, MapPin, Building, Banknote } from 'lucide-react';

interface Property {
  name: string;
  brand: string;
  location: string;
  status: string;
  features: string[];
  image: string;
  fundInvestment: string;
}

interface PortugalPropertiesProps {
  properties: Property[];
}

export function PortugalProperties({ properties }: PortugalPropertiesProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <>
      <p className="text-center text-sm text-[#94A3B8] mb-8">Click any property to explore details</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {properties.map((property) => (
          <GlowCard key={property.name}>
            <button
              type="button"
              onClick={() => setSelectedProperty(property)}
              aria-label={`View details: ${property.name}`}
              className="w-full text-left cursor-pointer group transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] bg-[#132240]">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${property.status === 'Operating' ? 'bg-[#22C55E]/90 text-white' : 'bg-[#C9A84C]/90 text-white'}`}>
                    {property.status}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-medium text-[#C9A84C] mb-1">{property.brand}</p>
                <h3 className="font-semibold text-[#0A1628] mb-1">{property.name}</h3>
                <p className="text-sm text-[#94A3B8] mb-3">{property.location}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {property.features.slice(0, 3).map((f) => (
                    <span key={f} className="text-xs bg-[#FAFAF5] text-[#475569] px-2 py-0.5 rounded">
                      {f}
                    </span>
                  ))}
                  {property.features.length > 3 && (
                    <span className="text-xs text-[#C9A84C] font-medium">+{property.features.length - 3} more</span>
                  )}
                </div>
                <p className="text-xs text-[#94A3B8]">
                  Fund investment: <span className="text-[#0A1628] font-medium">{property.fundInvestment}</span>
                </p>
              </div>
            </button>
          </GlowCard>
        ))}
      </div>

      {/* Property Detail Modal */}
      <ProjectModal
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        image={selectedProperty?.image ?? ''}
        imageAlt={selectedProperty?.name ?? ''}
      >
        {selectedProperty && (
          <>
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${selectedProperty.status === 'Operating' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#C9A84C]/10 text-[#C9A84C]'}`}>
                {selectedProperty.status}
              </span>
              <span className="text-xs font-medium text-[#C9A84C]">{selectedProperty.brand}</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-2">{selectedProperty.name}</h2>

            <div className="flex items-center gap-4 text-sm text-[#475569] mb-6">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#C9A84C]" />
                {selectedProperty.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Banknote className="h-4 w-4 text-[#C9A84C]" />
                Fund: {selectedProperty.fundInvestment}
              </span>
            </div>

            <div className="border-t border-[#F1F5F9] pt-5">
              <h3 className="text-sm font-semibold text-[#0A1628] mb-3 flex items-center gap-2">
                <Building className="h-4 w-4 text-[#C9A84C]" />
                Property Features
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedProperty.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#475569]">
                    <BadgeCheck className="h-4 w-4 text-[#C9A84C] shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-[#FAFAF5] rounded-xl p-4">
              <p className="text-sm text-[#475569]">
                This property is part of the <span className="font-semibold text-[#0A1628]">MPEF II fund</span> — a CMVM-regulated investment vehicle providing diversified exposure across Mercan&apos;s premium hotel portfolio.
              </p>
            </div>
          </>
        )}
      </ProjectModal>
    </>
  );
}

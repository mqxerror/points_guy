'use client';

import Image from 'next/image';

interface Partner {
  name: string;
  src: string;
}

interface HomePartnersProps {
  partners: Partner[];
}

export function HomePartners({ partners }: HomePartnersProps) {
  // Duplicate the array for seamless infinite scroll
  const doubled = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#FAFAF5] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FAFAF5] to-transparent z-10" />

      {/* Scrolling track */}
      <div className="flex animate-scroll-x gap-12 items-center py-4">
        {doubled.map((partner, i) => (
          <div
            key={`${partner.name}-${i}`}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              width={500}
              height={500}
              className="object-contain h-16 md:h-20 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

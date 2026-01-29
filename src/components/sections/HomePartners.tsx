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
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
      {partners.map((partner) => (
        <div
          key={partner.name}
          className="flex items-center justify-center p-3 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#C9A84C]/30 transition-colors w-full aspect-[3/2]"
        >
          <Image
            src={partner.src}
            alt={partner.name}
            width={120}
            height={48}
            className="object-contain h-8 md:h-10 w-auto grayscale hover:grayscale-0 transition-all"
          />
        </div>
      ))}
    </div>
  );
}

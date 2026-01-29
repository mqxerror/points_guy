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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 items-center justify-items-center">
      {partners.map((partner) => (
        <div
          key={partner.name}
          className="flex items-center justify-center p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#C9A84C]/30 transition-colors w-full aspect-[5/3]"
        >
          <Image
            src={partner.src}
            alt={partner.name}
            width={200}
            height={100}
            className="object-contain w-full h-full max-h-20 grayscale hover:grayscale-0 transition-all"
          />
        </div>
      ))}
    </div>
  );
}

'use client';

import { InfiniteMovingCards } from '@/components/ui/aceternity/infinite-moving-cards';

interface Partner {
  name: string;
  src: string;
}

interface HomePartnersProps {
  partners: Partner[];
}

export function HomePartners({ partners }: HomePartnersProps) {
  return (
    <InfiniteMovingCards
      items={partners}
      direction="left"
      speed="slow"
    />
  );
}

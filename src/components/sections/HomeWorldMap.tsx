'use client';

import { WorldMap } from '@/components/ui/aceternity/world-map';

const CONNECTIONS = [
  // Dubai -> Portugal (Lisbon)
  { from: { lat: 25.2, lng: 55.3 }, to: { lat: 38.7, lng: -9.1 } },
  // New York -> Greece (Athens)
  { from: { lat: 40.7, lng: -74.0 }, to: { lat: 37.9, lng: 23.7 } },
  // London -> Portugal
  { from: { lat: 51.5, lng: -0.1 }, to: { lat: 38.7, lng: -9.1 } },
  // Hong Kong -> Panama
  { from: { lat: 22.3, lng: 114.2 }, to: { lat: 9.0, lng: -79.5 } },
  // São Paulo -> Panama
  { from: { lat: -23.5, lng: -46.6 }, to: { lat: 9.0, lng: -79.5 } },
  // Mumbai -> Greece
  { from: { lat: 19.1, lng: 72.9 }, to: { lat: 37.9, lng: 23.7 } },
  // Singapore -> Portugal
  { from: { lat: 1.3, lng: 103.8 }, to: { lat: 38.7, lng: -9.1 } },
  // Toronto -> Panama
  { from: { lat: 43.7, lng: -79.4 }, to: { lat: 9.0, lng: -79.5 } },
];

export function HomeWorldMap() {
  return (
    <section className="py-16 md:py-24 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-4 tracking-[-0.02em]">
          Connecting Investors Worldwide
        </h2>
        <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
          From every corner of the globe, investors trust Mercan to secure their families&apos; future through our programs in Portugal, Greece, and Panama.
        </p>
        <WorldMap connections={CONNECTIONS} lineColor="#C9A84C" dotColor="#C9A84C" />
      </div>
    </section>
  );
}

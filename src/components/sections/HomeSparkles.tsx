'use client';

import { SparklesCore } from '@/components/ui/aceternity/sparkles';

interface Stat {
  value: string;
  label: string;
}

interface HomeSparklesProps {
  stats: Stat[];
}

export function HomeSparkles({ stats }: HomeSparklesProps) {
  return (
    <section className="bg-[#0A1628] py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <SparklesCore particleColor="#C9A84C" particleCount={15} className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center relative z-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-[#C9A84C]">{stat.value}</p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </SparklesCore>
      </div>
    </section>
  );
}

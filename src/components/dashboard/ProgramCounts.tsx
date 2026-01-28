'use client';

import { Lead } from '@/types';

interface ProgramCountsProps {
  leads: Lead[];
}

export function ProgramCounts({ leads }: ProgramCountsProps) {
  const total = leads.length;
  const portugal = leads.filter((l) => l.program === 'portugal').length;
  const greece = leads.filter((l) => l.program === 'greece').length;
  const panama = leads.filter((l) => l.program === 'panama').length;

  const cards = [
    { label: 'Total Leads', count: total, color: 'bg-[#0A1628]' },
    { label: 'Portugal', count: portugal, color: 'bg-[#1B3A5C]' },
    { label: 'Greece', count: greece, color: 'bg-[#1B3A5C]' },
    { label: 'Panama', count: panama, color: 'bg-[#1B3A5C]' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.color} rounded-xl p-5 text-white`}
        >
          <p className="text-sm text-white/60 mb-1">{card.label}</p>
          <p className="text-3xl font-bold">{card.count}</p>
        </div>
      ))}
    </div>
  );
}

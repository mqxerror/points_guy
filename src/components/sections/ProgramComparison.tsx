import { BadgeCheck, X } from 'lucide-react';

const COMPARISON = [
  {
    feature: 'Minimum Investment',
    portugal: '€500,000',
    greece: '€250,000',
    panama: '$300,000',
  },
  {
    feature: 'Investment Type',
    portugal: 'Regulated Fund',
    greece: 'Direct Property',
    panama: 'Real Estate / Securities',
  },
  {
    feature: 'Residency Timeline',
    portugal: '18-24 months',
    greece: '4-6 months',
    panama: '~30 days',
  },
  {
    feature: 'Residency Type',
    portugal: 'Temporary → Permanent',
    greece: 'Renewable 5-year',
    panama: 'Permanent from day 1',
  },
  {
    feature: 'Path to Citizenship',
    portugal: 'After 5 years',
    greece: 'After 7 years',
    panama: 'After 5 years',
  },
  {
    feature: 'Minimum Stay',
    portugal: '7 days/year avg',
    greece: 'None',
    panama: '1 week / 2 years',
  },
  {
    feature: 'Family Inclusion',
    portugal: true,
    greece: true,
    panama: true,
  },
  {
    feature: 'EU Residency',
    portugal: true,
    greece: true,
    panama: false,
  },
  {
    feature: 'Schengen Travel',
    portugal: true,
    greece: true,
    panama: false,
  },
  {
    feature: 'Tax Benefits',
    portugal: 'NHR regime available',
    greece: 'Flat tax options',
    panama: 'Foreign income tax-free',
  },
  {
    feature: 'Guaranteed Returns',
    portugal: '2% fixed annual',
    greece: '3% for 10 years',
    panama: 'Varies by project',
  },
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <BadgeCheck className="h-5 w-5 text-[#22C55E] mx-auto" />
    ) : (
      <X className="h-5 w-5 text-[#94A3B8] mx-auto" />
    );
  }
  return <span>{value}</span>;
}

export function ProgramComparison() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-4 tracking-[-0.02em]">
          Compare Programs at a Glance
        </h2>
        <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
          Find the best fit for your goals — EU residency, tax optimization, or the fastest path to permanent residency.
        </p>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <div className="bg-[#FAFAF5] rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0A1628]">
                  <th className="text-left py-5 px-6 text-white/60 font-medium w-[28%] text-xs uppercase tracking-wider">Feature</th>
                  <th className="text-center py-5 px-6 w-[24%]">
                    <a href="/portugal" className="group">
                      <span className="text-white font-semibold group-hover:text-[#C9A84C] transition-colors text-base">Portugal</span>
                      <span className="block text-white/40 text-xs mt-0.5 font-normal">Golden Visa</span>
                    </a>
                  </th>
                  <th className="text-center py-5 px-6 w-[24%]">
                    <a href="/greece" className="group">
                      <span className="text-white font-semibold group-hover:text-[#C9A84C] transition-colors text-base">Greece</span>
                      <span className="block text-white/40 text-xs mt-0.5 font-normal">Golden Visa</span>
                    </a>
                  </th>
                  <th className="text-center py-5 px-6 w-[24%]">
                    <a href="/panama" className="group">
                      <span className="text-white font-semibold group-hover:text-[#C9A84C] transition-colors text-base">Panama</span>
                      <span className="block text-white/40 text-xs mt-0.5 font-normal">Qualified Investor</span>
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF5]'}
                  >
                    <td className="py-4 px-6 text-[#475569] font-medium">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-[#1E293B]"><Cell value={row.portugal} /></td>
                    <td className="py-4 px-6 text-center text-[#1E293B]"><Cell value={row.greece} /></td>
                    <td className="py-4 px-6 text-center text-[#1E293B]"><Cell value={row.panama} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {(['portugal', 'greece', 'panama'] as const).map((prog) => {
            const labels = { portugal: 'Portugal Golden Visa', greece: 'Greece Golden Visa', panama: 'Panama Qualified Investor' };
            return (
              <a key={prog} href={`/${prog}`} className="block bg-[#FAFAF5] rounded-xl border border-[#E2E8F0] overflow-hidden">
                <div className="bg-[#0A1628] px-5 py-3">
                  <h3 className="font-semibold text-white">{labels[prog]}</h3>
                </div>
                <div className="p-5 space-y-3">
                  {COMPARISON.map((row) => (
                    <div key={row.feature} className="flex justify-between text-sm items-center">
                      <span className="text-[#94A3B8]">{row.feature}</span>
                      <span className="text-[#1E293B] font-medium text-right">
                        {typeof row[prog] === 'boolean' ? (
                          row[prog] ? (
                            <BadgeCheck className="h-4 w-4 text-[#22C55E] inline" />
                          ) : (
                            <X className="h-4 w-4 text-[#94A3B8] inline" />
                          )
                        ) : (
                          row[prog]
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Program } from '@/types';
import { motion } from 'framer-motion';

interface ProgramDetailProps {
  program: Program;
}

export function ProgramDetail({ program }: ProgramDetailProps) {
  return (
    <>
      {/* Description */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl text-[#475569] leading-relaxed max-w-prose mx-auto text-center"
          >
            {program.description}
          </motion.p>
        </div>
      </section>

      {/* Investment Details */}
      <section className="py-16 md:py-24 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-10 md:mb-14 tracking-[-0.02em]"
          >
            Investment Details
          </motion.h2>

          <div className="max-w-2xl mx-auto">
            <div className="bg-[#FAFAF5] rounded-2xl border border-[#E2E8F0] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0A1628]">
                    <th className="text-left py-5 px-6 text-white/60 font-medium text-xs uppercase tracking-wider">Detail</th>
                    <th className="text-right py-5 px-6 text-white/60 font-medium text-xs uppercase tracking-wider">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {program.investmentDetails.map((detail, index) => (
                    <tr
                      key={detail.label}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF5]'}
                    >
                      <td className="py-4 px-6 text-[#475569] font-medium">{detail.label}</td>
                      <td className="py-4 px-6 text-right text-[#0A1628] font-semibold">{detail.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#94A3B8] mt-3 text-center">
              Investment immigration programs are subject to government regulations and may change. Consult with qualified professionals before making investment decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="py-16 md:py-24 bg-[#132240]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-prose mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 tracking-[-0.02em]">
              The Lifestyle
            </h2>
            <p className="text-lg text-[#F1F5F9] leading-relaxed">
              {program.lifestyleDescription}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

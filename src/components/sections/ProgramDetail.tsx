'use client';

import { Program } from '@/types';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ProgramDetailProps {
  program: Program;
}

function getIcon(name: string): LucideIcon {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iconsMap = Icons as any;
  return iconsMap[name] || Icons.Star;
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

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-10 md:mb-14 tracking-[-0.02em]"
          >
            Key Benefits
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {program.benefits.map((benefit, index) => {
              const Icon = getIcon(benefit.icon);
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 bg-white rounded-xl shadow-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#C9A84C]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A1628] mb-1">{benefit.title}</h3>
                    <p className="text-[#475569] text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Details */}
      <section className="py-16 md:py-24 bg-white">
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

          <div className="max-w-2xl mx-auto space-y-4">
            {program.investmentDetails.map((detail, index) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex justify-between items-center py-4 border-b border-[#F1F5F9]"
              >
                <span className="text-[#475569] text-sm">{detail.label}</span>
                <span className="text-[#0A1628] font-semibold text-sm">{detail.value}</span>
              </motion.div>
            ))}
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

'use client';

import { PROGRAMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProgramCardsProps {
  excludeSlug?: string;
  title?: string;
}

export function ProgramCards({ excludeSlug, title }: ProgramCardsProps) {
  const programs = excludeSlug
    ? PROGRAMS.filter((p) => p.slug !== excludeSlug)
    : PROGRAMS;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {title && (
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0A1628] text-center mb-10 md:mb-14 tracking-[-0.02em]">
            {title}
          </h2>
        )}

        <div
          className={cn(
            'grid gap-6 md:gap-8',
            programs.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-4xl mx-auto'
          )}
        >
          {programs.map((program, index) => (
            <motion.div
              key={program.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/${program.slug}`}
                className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] bg-[#132240] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${program.heroImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-semibold text-white">{program.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 bg-white">
                  <p className="text-[#475569] text-sm leading-relaxed">{program.tagline}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[#C9A84C] group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

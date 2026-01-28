'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  headline: string;
  subtext?: string;
  imageSrc?: string;
  showScrollIndicator?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export function Hero({ headline, subtext, imageSrc, showScrollIndicator = true, ctaText = 'Book Free Consultation', ctaHref = '#lead-form' }: HeroProps) {
  return (
    <section className="relative min-h-screen md:min-h-[80vh] flex items-end md:items-center overflow-hidden">
      {/* Background image */}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-[#132240]" />
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/40 to-[#0A1628]/20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-24 md:pb-0 pt-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-[-0.02em]">
            {headline}
          </h1>
          {subtext && (
            <p className="mt-4 md:mt-6 text-lg md:text-xl text-white/80 leading-relaxed">
              {subtext}
            </p>
          )}
          <a
            href={ctaHref}
            className="mt-6 md:mt-8 inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-[#C9A84C] text-[#0A1628] hover:bg-[#D4B85E] active:bg-[#B8953E] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2"
          >
            {ctaText}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6 text-white/60" />
        </motion.div>
      )}
    </section>
  );
}

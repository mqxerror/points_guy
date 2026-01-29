'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Spotlight } from '@/components/ui/aceternity/spotlight';
import { TextGenerateEffect } from '@/components/ui/aceternity/text-generate-effect';
import { MovingBorder } from '@/components/ui/aceternity/moving-border';

interface HeroProps {
  headline: string;
  subtext?: string;
  badges?: string[];
  imageSrc?: string;
  showScrollIndicator?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export function Hero({ headline, subtext, badges, imageSrc, showScrollIndicator = true, ctaText = 'Book Free Consultation', ctaHref = '#lead-form' }: HeroProps) {
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

      {/* Gold Spotlight */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#C9A84C" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-24 md:pb-0 pt-24 w-full">
        <div className="max-w-2xl">
          {/* Animated headline */}
          <TextGenerateEffect
            words={headline}
            className="text-4xl md:text-5xl text-white leading-[1.1] tracking-[-0.02em]"
          />

          {/* Subtext with delayed fade-in */}
          {subtext && !badges && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
              className="mt-4 md:mt-6 text-lg md:text-xl text-white/80 leading-relaxed"
            >
              {subtext}
            </motion.p>
          )}

          {/* Badge pills */}
          {badges && badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
              className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3"
            >
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/20"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          )}

          {/* CTA with moving border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
            className="mt-6 md:mt-8 inline-block"
          >
            <MovingBorder
              as="a"
              href={ctaHref}
              duration={4}
              containerClassName="rounded-lg"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-[#C9A84C] text-[#0A1628] hover:bg-[#D4B85E] active:bg-[#B8953E] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2"
            >
              {ctaText}
            </MovingBorder>
          </motion.div>
        </div>
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

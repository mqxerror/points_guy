'use client';

import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface TracingBeamProps {
  children: ReactNode;
  className?: string;
}

export function TracingBeam({ children, className }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 50%'],
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <div ref={ref} className={cn('relative', className)}>
      {/* Beam line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] hidden md:block">
        <svg
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="tracing-beam-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A84C" />
              <stop offset="50%" stopColor="#D4B85E" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {/* Background line */}
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="#C9A84C"
            strokeOpacity="0.1"
            strokeWidth="2"
          />
          {/* Progress line */}
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="url(#tracing-beam-gradient)"
            strokeWidth="2"
            style={{ pathLength: y1 }}
          />
        </svg>
        {/* Glowing dot at progress point */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C9A84C] shadow-[0_0_12px_rgba(201,168,76,0.5)]"
          style={{
            top: useTransform(y1, (v) => `${v * 100}%`),
          }}
        />
      </div>

      {/* Content */}
      <div className="md:pl-8">
        {children}
      </div>
    </div>
  );
}

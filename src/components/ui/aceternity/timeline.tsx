'use client';

import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface TimelineEntry {
  title: string;
  content: ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  className?: string;
  lineColor?: string;
}

export function Timeline({ data, className, lineColor = '#C9A84C' }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 50%'],
  });

  const heightProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Timeline line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-[#C9A84C]/20">
        <motion.div
          className="w-full origin-top"
          style={{
            height: heightProgress,
            background: `linear-gradient(to bottom, ${lineColor}, ${lineColor}80, transparent)`,
          }}
        />
      </div>

      {/* Timeline entries */}
      <div className="space-y-0">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex gap-4 md:gap-6 relative"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            {/* Dot */}
            <div className="flex flex-col items-center z-10">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C9A84C] text-white font-bold text-sm shrink-0 shadow-[0_0_12px_rgba(201,168,76,0.3)]">
                {idx + 1}
              </div>
              {idx < data.length - 1 && <div className="w-px h-full bg-transparent my-1" />}
            </div>

            {/* Content */}
            <div className="pb-8">
              {item.content}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

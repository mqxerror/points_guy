'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useId, useState } from 'react';

interface Sparkle {
  id: string;
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
}

interface SparklesProps {
  className?: string;
  particleColor?: string;
  particleCount?: number;
  children?: React.ReactNode;
}

function generateSparkle(id: string): Sparkle {
  return {
    id,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 1.5 + 1,
  };
}

export function SparklesCore({
  className,
  particleColor = '#C9A84C',
  particleCount = 20,
  children,
}: SparklesProps) {
  const uniqueId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const generateSparkles = useCallback(() => {
    return Array.from({ length: particleCount }, (_, i) =>
      generateSparkle(`${uniqueId}-${i}`)
    );
  }, [particleCount, uniqueId]);

  useEffect(() => {
    setSparkles(generateSparkles());
  }, [generateSparkles]);

  if (prefersReducedMotion) {
    return <div className={cn('relative', className)}>{children}</div>;
  }

  return (
    <div className={cn('relative', className)}>
      {sparkles.map((sparkle) => (
        <motion.svg
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{ left: sparkle.x, top: sparkle.y }}
          width={sparkle.size * 2}
          height={sparkle.size * 2}
          viewBox="0 0 10 10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        >
          <circle cx="5" cy="5" r="4" fill={particleColor} />
        </motion.svg>
      ))}
      {children}
    </div>
  );
}

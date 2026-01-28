'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { type ReactNode, useRef } from 'react';

interface MovingBorderProps {
  children: ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: 'button' | 'a' | 'div';
  href?: string;
  onClick?: () => void;
}

export function MovingBorder({
  children,
  duration = 3,
  className,
  containerClassName,
  borderClassName,
  as: Component = 'div',
  href,
  onClick,
}: MovingBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const props: Record<string, unknown> = {};
  if (Component === 'a' && href) props.href = href;
  if (onClick) props.onClick = onClick;

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded-lg p-[2px]', containerClassName)}
    >
      <motion.div
        className={cn(
          'absolute inset-0',
          borderClassName
        )}
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, #C9A84C 10%, transparent 20%)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
      <Component
        {...props}
        className={cn(
          'relative z-10 block rounded-[6px]',
          className
        )}
      >
        {children}
      </Component>
    </div>
  );
}

'use client';

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className, glowColor = 'rgba(201,168,76,0.15)' }: GlowCardProps) {
  return (
    <div
      className={cn(
        'group/glow relative rounded-xl transition-all duration-300',
        className
      )}
    >
      {/* Subtle glow border on hover */}
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover/glow:opacity-100 transition-opacity duration-500 blur-[2px]"
        style={{ background: `linear-gradient(135deg, ${glowColor}, transparent 50%, ${glowColor})` }}
      />
      <div className="relative rounded-xl overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );
}

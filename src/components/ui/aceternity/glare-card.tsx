'use client';

import { cn } from '@/lib/utils';
import { useRef, useState, type ReactNode, type MouseEvent } from 'react';

interface GlareCardProps {
  children: ReactNode;
  className?: string;
}

export function GlareCard({ children, className }: GlareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX((y - centerY) / 10);
    setRotateY((centerX - x) / 10);
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
  }

  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      className={cn('relative overflow-hidden', className)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 0.15 : 0,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, white 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}

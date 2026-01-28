'use client';

import { cn } from '@/lib/utils';
import { useRef, useState, type ReactNode, type MouseEvent, type ElementType } from 'react';

interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

interface CardItemProps {
  children: ReactNode;
  className?: string;
  translateZ?: number;
  as?: ElementType;
}

export function ThreeDCardContainer({ children, className, containerClassName }: ThreeDCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setTransform(`rotateY(${x}deg) rotateX(${-y}deg)`);
  }

  function handleMouseLeave() {
    setIsHovering(false);
    setTransform('rotateY(0deg) rotateX(0deg)');
  }

  // On mobile, disable the effect
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  return (
    <div
      className={cn('py-4', containerClassName)}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={containerRef}
        onMouseMove={isTouchDevice ? undefined : handleMouseMove}
        onMouseEnter={() => !isTouchDevice && setIsHovering(true)}
        onMouseLeave={isTouchDevice ? undefined : handleMouseLeave}
        className={cn(
          'relative transition-all duration-200 ease-linear',
          className
        )}
        style={{
          transformStyle: 'preserve-3d',
          transform: isTouchDevice ? undefined : transform,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function CardItem({ children, className, translateZ = 0, as: Tag = 'div' }: CardItemProps) {
  return (
    <Tag
      className={cn(className)}
      style={{
        transform: `translateZ(${translateZ}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </Tag>
  );
}

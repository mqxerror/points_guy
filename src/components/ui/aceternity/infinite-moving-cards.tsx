'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface LogoItem {
  name: string;
  src: string;
}

interface InfiniteMovingCardsProps {
  items: LogoItem[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = 'left',
  speed = 'slow',
  className,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      const speedMap = { fast: '20s', normal: '40s', slow: '60s' };
      containerRef.current.style.setProperty('--animation-duration', speedMap[speed]);
      containerRef.current.style.setProperty(
        '--animation-direction',
        direction === 'left' ? 'forwards' : 'reverse'
      );
      setStart(true);
    }
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn('scroller relative z-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]', className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 gap-12 py-4 flex-nowrap items-center',
          start && 'animate-scroll'
        )}
      >
        {items.map((item) => (
          <li key={item.name} className="flex-shrink-0 flex items-center justify-center px-4">
            <Image
              src={item.src}
              alt={item.name}
              width={120}
              height={48}
              className="opacity-60 hover:opacity-100 transition-opacity object-contain h-10"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface NavItem {
  href: string;
  label: string;
}

interface FloatingNavbarProps {
  navItems: NavItem[];
  currentPath: string | null;
  className?: string;
}

export function FloatingNavbar({ navItems, currentPath, className }: FloatingNavbarProps) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      const direction = current - (scrollYProgress.getPrevious() ?? 0);
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'hidden md:flex fixed top-4 inset-x-0 mx-auto max-w-fit items-center justify-center gap-1 rounded-full bg-[#0A1628]/95 backdrop-blur-md border border-white/10 px-8 py-3 shadow-lg z-[5000]',
          className
        )}
      >
        <Link href="/" className="text-white font-bold text-sm tracking-tight mr-6">
          The Points Guy
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full',
              currentPath === item.href
                ? 'text-[#C9A84C]'
                : 'text-white/70 hover:text-white'
            )}
            aria-current={currentPath === item.href ? 'page' : undefined}
          >
            {currentPath === item.href && (
              <motion.span
                layoutId="floating-nav-active"
                className="absolute inset-0 rounded-full bg-[#C9A84C]/10"
                transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </Link>
        ))}
      </motion.nav>
    </AnimatePresence>
  );
}

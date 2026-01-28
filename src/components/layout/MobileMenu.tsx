'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  currentPath: string | null;
}

export function MobileMenu({ isOpen, onClose, links, currentPath }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 md:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-72 bg-[#0A1628] z-50 transition-transform duration-300 md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="text-white font-bold text-lg">Menu</span>
          <button
            onClick={onClose}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                currentPath === link.href
                  ? 'text-[#C9A84C] bg-white/5'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              )}
              aria-current={currentPath === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

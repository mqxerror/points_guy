'use client';

import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { FloatingNavbar } from '@/components/ui/aceternity/floating-navbar';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/portugal', label: 'Portugal' },
  { href: '/greece', label: 'Greece' },
  { href: '/panama', label: 'Panama' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {/* Floating pill navbar for desktop */}
      {!isDashboard && (
        <FloatingNavbar navItems={NAV_LINKS} currentPath={pathname} />
      )}

      {/* Mobile header — always visible */}
      <header
        className={cn(
          'md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          isDashboard || isScrolled
            ? 'bg-[#0A1628] shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-white font-bold text-xl tracking-tight">
              The Points Guy
            </Link>

            {!isDashboard && (
              <button
                className="text-white p-2"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
        currentPath={pathname}
      />
    </>
  );
}

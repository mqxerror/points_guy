'use client';

import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MobileMenu } from '@/components/layout/MobileMenu';

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
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          isDashboard || isScrolled
            ? 'bg-[#0A1628] shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="text-white font-bold text-xl tracking-tight">
              The Points Guy
            </Link>

            {!isDashboard && (
              <nav className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors duration-200',
                      pathname === link.href
                        ? 'text-[#C9A84C]'
                        : 'text-white/80 hover:text-white'
                    )}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}

            {!isDashboard && (
              <button
                className="md:hidden text-white p-2"
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

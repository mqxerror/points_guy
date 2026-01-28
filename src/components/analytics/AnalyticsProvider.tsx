'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Track page views on route change
  useEffect(() => {
    trackEvent('page_view', 'navigation', pathname);
  }, [pathname]);

  // Track scroll depth
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const fired = new Set<number>();

    const onScroll = () => {
      const scrollPct = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      for (const t of thresholds) {
        if (scrollPct >= t && !fired.has(t)) {
          fired.add(t);
          trackEvent('scroll_depth', 'engagement', `${t}%`, t);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Track CTA clicks via event delegation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href="#lead-form"], button[type="submit"]');
      if (!target) return;
      const isForm = target.matches('button[type="submit"]');
      trackEvent(
        isForm ? 'form_submit_click' : 'cta_click',
        'conversion',
        isForm ? 'lead_form_submit' : (target as HTMLAnchorElement).textContent || 'cta'
      );
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return <>{children}</>;
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyCTA } from '@/components/ui/StickyCTA';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'The Points Guy x Mercan | Investment Immigration Programs',
  description:
    'Explore investment immigration programs in Portugal, Greece, and Panama. Gain residency through trusted investment pathways with Mercan Group.',
  metadataBase: new URL('https://thepointsguy.mercan.com'),
  openGraph: {
    title: 'The Points Guy x Mercan | Investment Immigration Programs',
    description:
      'Explore investment immigration programs in Portugal, Greece, and Panama.',
    type: 'website',
    siteName: 'The Points Guy x Mercan',
    images: [{ url: '/images/hero/main.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Points Guy x Mercan | Investment Immigration Programs',
    description: 'Explore investment immigration programs in Portugal, Greece, and Panama.',
    images: ['/images/hero/main.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-[#1E293B] bg-white">
        <OrganizationJsonLd />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <AnalyticsProvider>
          <main id="main-content">{children}</main>
        </AnalyticsProvider>
        <StickyCTA />
        <Footer />

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

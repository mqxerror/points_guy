interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Mercan Group',
        description: 'Global leader in investment immigration with 35+ years of experience.',
        url: 'https://investgoldenvisa.com',
        foundingDate: '1989',
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 900 },
        knowsAbout: ['Investment Immigration', 'Golden Visa', 'Residency by Investment'],
      }}
    />
  );
}

export function FAQPageJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  price,
  currency,
}: {
  name: string;
  description: string;
  price: string;
  currency: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        offers: {
          '@type': 'Offer',
          price,
          priceCurrency: currency,
          availability: 'https://schema.org/InStock',
        },
      }}
    />
  );
}

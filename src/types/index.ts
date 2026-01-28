export interface Lead {
  id: string;
  fullName: string;
  email: string;
  program: 'portugal' | 'greece' | 'panama';
  phone: string | null;
  nationality: string | null;
  countryOfResidence: string | null;
  investmentTimeline: string | null;
  questions: string | null;
  newsletterConsent: boolean;
  source: string;
  createdAt: string;
}

export interface LeadFormData {
  full_name: string;
  email: string;
  program: 'portugal' | 'greece' | 'panama';
  phone?: string;
  nationality?: string;
  country_of_residence?: string;
  investment_timeline?: string;
  questions?: string;
  newsletter_consent: boolean;
  website?: string; // honeypot
}

export interface Program {
  slug: 'portugal' | 'greece' | 'panama';
  name: string;
  tagline: string;
  heroImage: string;
  description: string;
  benefits: ProgramBenefit[];
  investmentDetails: InvestmentDetail[];
  lifestyleDescription: string;
}

export interface ProgramBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface InvestmentDetail {
  label: string;
  value: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    fields?: Record<string, string>;
  };
}

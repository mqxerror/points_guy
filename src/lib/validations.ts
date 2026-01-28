import { z } from 'zod';

export const leadStep1Schema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  program: z.enum(['portugal', 'greece', 'panama'], {
    error: 'Please select a program',
  }),
});

export const leadStep2Schema = z.object({
  phone: z.string().optional(),
  nationality: z.string().optional(),
  country_of_residence: z.string().optional(),
  investment_timeline: z.string().optional(),
  questions: z.string().optional(),
  newsletter_consent: z.boolean().optional().default(false),
});

export const leadFullSchema = leadStep1Schema.merge(leadStep2Schema).extend({
  website: z.string().optional(),
});

export type LeadStep1Data = z.infer<typeof leadStep1Schema>;
export type LeadStep2Data = z.infer<typeof leadStep2Schema>;
export type LeadFullData = z.infer<typeof leadFullSchema>;

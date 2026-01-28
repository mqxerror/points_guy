import { describe, it, expect } from 'vitest';
import { leadFullSchema } from '@/lib/validations';

describe('leadFullSchema', () => {
  const validLead = {
    full_name: 'John Doe',
    email: 'john@example.com',
    program: 'portugal' as const,
    phone: '+1234567890',
    nationality: 'American',
    country_of_residence: 'United States',
    investment_timeline: '1-3-months',
    questions: 'I have some questions',
    newsletter_consent: true,
    website: '',
  };

  it('accepts valid lead data', () => {
    const result = leadFullSchema.safeParse(validLead);
    expect(result.success).toBe(true);
  });

  it('accepts minimal required fields', () => {
    const result = leadFullSchema.safeParse({
      full_name: 'Jane',
      email: 'jane@test.com',
      program: 'greece',
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing full_name', () => {
    const result = leadFullSchema.safeParse({
      email: 'test@test.com',
      program: 'portugal',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = leadFullSchema.safeParse({
      full_name: 'John',
      email: 'not-an-email',
      program: 'portugal',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid program', () => {
    const result = leadFullSchema.safeParse({
      full_name: 'John',
      email: 'john@test.com',
      program: 'invalid_program',
    });
    expect(result.success).toBe(false);
  });

  it('accepts all three valid programs', () => {
    for (const program of ['portugal', 'greece', 'panama']) {
      const result = leadFullSchema.safeParse({
        full_name: 'Test',
        email: 'test@test.com',
        program,
      });
      expect(result.success).toBe(true);
    }
  });

  it('rejects name shorter than 2 characters', () => {
    const result = leadFullSchema.safeParse({
      full_name: 'J',
      email: 'test@test.com',
      program: 'portugal',
    });
    expect(result.success).toBe(false);
  });

  it('defaults newsletter_consent to false', () => {
    const result = leadFullSchema.safeParse({
      full_name: 'John',
      email: 'john@test.com',
      program: 'portugal',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.newsletter_consent).toBe(false);
    }
  });

  it('includes honeypot website field', () => {
    const result = leadFullSchema.safeParse({
      ...validLead,
      website: 'http://spam.com',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBe('http://spam.com');
    }
  });
});

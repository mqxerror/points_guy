'use client';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { NATIONALITIES, TIMELINES } from '@/lib/constants';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface FormStep2Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
}

export function FormStep2({ register, errors }: FormStep2Props) {
  const nationalityOptions = NATIONALITIES.map((n) => ({ value: n, label: n }));
  const countryOptions = NATIONALITIES.map((n) => ({ value: n, label: n }));

  return (
    <div className="space-y-4">
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 000-0000"
        optional
        error={errors.phone?.message as string | undefined}
        {...register('phone')}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Nationality"
          options={nationalityOptions}
          placeholder="Select nationality"
          optional
          error={errors.nationality?.message as string | undefined}
          {...register('nationality')}
        />
        <Select
          label="Country of Residence"
          options={countryOptions}
          placeholder="Select country"
          optional
          error={errors.country_of_residence?.message as string | undefined}
          {...register('country_of_residence')}
        />
      </div>
      <Select
        label="Investment Timeline"
        options={TIMELINES}
        placeholder="When are you looking to invest?"
        optional
        error={errors.investment_timeline?.message as string | undefined}
        {...register('investment_timeline')}
      />
      <Textarea
        label="Questions or Comments"
        placeholder="Anything specific you'd like to know?"
        optional
        error={errors.questions?.message as string | undefined}
        {...register('questions')}
      />
      <div className="flex items-start gap-3 pt-2">
        <input
          type="checkbox"
          id="newsletter_consent"
          className="mt-1 h-4 w-4 rounded border-[#94A3B8] text-[#C9A84C] focus:ring-[#C9A84C]"
          {...register('newsletter_consent')}
        />
        <label htmlFor="newsletter_consent" className="text-sm text-[#475569]">
          I&apos;d like to receive updates about investment immigration opportunities and news.
        </label>
      </div>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>
    </div>
  );
}

'use client';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { PROGRAMS } from '@/lib/constants';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface FormStep1Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  defaultProgram?: string;
  showProgramSelector?: boolean;
}

export function FormStep1({ register, errors, defaultProgram, showProgramSelector = true }: FormStep1Props) {
  const programOptions = PROGRAMS.map((p) => ({
    value: p.slug,
    label: p.name,
  }));

  return (
    <div className="space-y-4">
      <Input
        label="Full Name"
        placeholder="Your full name"
        error={errors.full_name?.message as string | undefined}
        {...register('full_name')}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="your@email.com"
        error={errors.email?.message as string | undefined}
        {...register('email')}
      />
      {showProgramSelector && !defaultProgram ? (
        <Select
          label="Program of Interest"
          options={programOptions}
          placeholder="Select a program"
          error={errors.program?.message as string | undefined}
          {...register('program')}
        />
      ) : (
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#1E293B]">Program</label>
          <div className="px-4 py-3 h-12 rounded-md bg-[#F1F5F9] text-[#1E293B] flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#C9A84C]/10 text-[#C9A84C]">
              {PROGRAMS.find((p) => p.slug === defaultProgram)?.name || defaultProgram}
            </span>
          </div>
          <input type="hidden" {...register('program')} value={defaultProgram} />
        </div>
      )}
    </div>
  );
}

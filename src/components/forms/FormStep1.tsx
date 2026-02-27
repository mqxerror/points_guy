'use client';

import { Input } from '@/components/ui/Input';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { PROGRAMS } from '@/lib/constants';
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface FormStep1Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>;
}

export function FormStep1({ register, errors, setValue, watch }: FormStep1Props) {
  const programOptions = PROGRAMS.map((p) => ({
    value: p.slug,
    label: p.name,
  }));

  const selectedPrograms: string[] = watch('programs') || [];

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
      <MultiSelect
        label="What programs are you interested in?"
        options={programOptions}
        placeholder="Select programs..."
        value={selectedPrograms}
        onChange={(val) => setValue('programs', val, { shouldValidate: true })}
        error={errors.programs?.message as string | undefined}
      />
    </div>
  );
}

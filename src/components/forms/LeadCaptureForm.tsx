'use client';

import { Button } from '@/components/ui/Button';
import { FormStep1 } from '@/components/forms/FormStep1';
import { FormStep2 } from '@/components/forms/FormStep2';
import { ConfirmationMessage } from '@/components/sections/ConfirmationMessage';
import { leadFullSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface LeadCaptureFormProps {
  defaultProgram?: 'portugal' | 'greece' | 'panama';
}

export function LeadCaptureForm({ defaultProgram }: LeadCaptureFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>({
    resolver: zodResolver(leadFullSchema),
    defaultValues: {
      full_name: '',
      email: '',
      program: defaultProgram || '',
      phone: '',
      nationality: '',
      country_of_residence: '',
      investment_timeline: '',
      questions: '',
      newsletter_consent: false,
      website: '',
    },
    mode: 'onBlur',
  });

  const handleStep1Continue = async () => {
    const valid = await trigger(['full_name', 'email', 'program']);
    if (valid) setStep(2);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setSubmitError('');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.error?.message || 'Something went wrong. Please try again.');
        return;
      }

      setSubmittedName(String(data.full_name).split(' ')[0]);
      setIsSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    }
  };

  if (isSubmitted) {
    return <ConfirmationMessage userName={submittedName} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#94A3B8]" aria-live="polite">
            Step {step} of 2
          </p>
          {step === 1 && (
            <p className="text-xs text-[#94A3B8]">Next: phone &amp; preferences</p>
          )}
        </div>
        <div className="flex gap-1.5 mt-2">
          <div className={`h-1 rounded-full flex-1 ${step >= 1 ? 'bg-[#C9A84C]' : 'bg-[#E2E8F0]'}`} />
          <div className={`h-1 rounded-full flex-1 ${step >= 2 ? 'bg-[#C9A84C]' : 'bg-[#E2E8F0]'}`} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FormStep1
              register={register}
              errors={errors}
              defaultProgram={defaultProgram}
              showProgramSelector={!defaultProgram}
            />
            <div className="mt-6">
              <Button
                type="button"
                onClick={handleStep1Continue}
                className="w-full"
                size="lg"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <FormStep2 register={register} errors={errors} />

            {submitError && (
              <div className="mt-4 p-3 rounded-md bg-[#FEF2F2] text-[#EF4444] text-sm" role="alert">
                {submitError}
              </div>
            )}

            <div className="mt-6 space-y-3">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Get My Free Consultation'}
              </Button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-sm text-[#94A3B8] hover:text-[#475569] transition-colors mx-auto"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Step 1
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 text-xs text-center text-[#94A3B8]">
        We respond within 24 hours. Your data is secure.
      </p>
    </form>
  );
}

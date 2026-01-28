'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  optional?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, optional, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="block text-sm font-medium text-[#1E293B]">
          {label}
          {optional && <span className="text-[#94A3B8] ml-1">(optional)</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 h-12 rounded-md bg-[#F1F5F9] border border-transparent text-[#1E293B] placeholder:text-[#94A3B8] transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-0 focus:border-transparent focus:bg-white',
            error && 'bg-[#FEF2F2] ring-2 ring-[#EF4444] focus:ring-[#EF4444]',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-[#EF4444] animate-in fade-in" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };

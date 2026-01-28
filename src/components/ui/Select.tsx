'use client';

import { cn } from '@/lib/utils';
import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  optional?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, optional, options, placeholder = 'Select...', id, ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        <label htmlFor={selectId} className="block text-sm font-medium text-[#1E293B]">
          {label}
          {optional && <span className="text-[#94A3B8] ml-1">(optional)</span>}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full px-4 py-3 h-12 rounded-md bg-[#F1F5F9] border border-transparent text-[#1E293B] transition-all duration-200 appearance-none',
            'focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-0 focus:border-transparent focus:bg-white',
            error && 'bg-[#FEF2F2] ring-2 ring-[#EF4444] focus:ring-[#EF4444]',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="text-sm text-[#EF4444]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };

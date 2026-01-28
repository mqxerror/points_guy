'use client';

import { cn } from '@/lib/utils';
import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  optional?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, optional, id, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        <label htmlFor={textareaId} className="block text-sm font-medium text-[#1E293B]">
          {label}
          {optional && <span className="text-[#94A3B8] ml-1">(optional)</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 rounded-md bg-[#F1F5F9] border border-transparent text-[#1E293B] placeholder:text-[#94A3B8] transition-all duration-200 resize-y min-h-[100px]',
            'focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-0 focus:border-transparent focus:bg-white',
            error && 'bg-[#FEF2F2] ring-2 ring-[#EF4444] focus:ring-[#EF4444]',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-sm text-[#EF4444]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };

'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-[#C9A84C] text-[#0A1628] hover:bg-[#D4B85E] active:bg-[#B8953E]': variant === 'primary',
            'border-2 border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white': variant === 'secondary',
            'text-[#0A1628] hover:text-[#C9A84C] underline-offset-4 hover:underline': variant === 'ghost',
          },
          {
            'px-6 py-3 text-base h-12': size === 'default',
            'px-8 py-4 text-lg h-14': size === 'lg',
          },
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

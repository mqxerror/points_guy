import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'transparent';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl transition-all duration-200',
          {
            'bg-white shadow-sm': variant === 'default',
            'bg-white shadow-lg': variant === 'elevated',
            'bg-transparent': variant === 'transparent',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card };

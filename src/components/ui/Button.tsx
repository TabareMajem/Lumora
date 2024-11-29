import React from 'react';
import { cn } from '../../lib/utils/cn';

const variants = {
  default: 'bg-indigo-600 text-white hover:bg-indigo-700',
  outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50',
  ghost: 'hover:bg-indigo-50 text-indigo-600',
} as const;

const sizes = {
  default: 'h-10 py-2 px-4',
  sm: 'h-9 px-3',
  lg: 'h-11 px-8',
} as const;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
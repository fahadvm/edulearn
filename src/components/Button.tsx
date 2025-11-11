import { cn } from '../utils/cn';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'px-4 py-2 rounded-md font-medium text-white transition-all duration-200',
          variant === 'primary' && 'bg-sky-500 hover:bg-sky-600 active:bg-sky-700 shadow-md hover:shadow-lg',
          variant === 'secondary' && 'bg-gray-500 hover:bg-gray-600 text-white border border-gray-600',
          
          // Sizes
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'lg' && 'px-6 py-3 text-lg',
          
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
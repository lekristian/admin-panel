import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'left',
      fullWidth = false,
      loading = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors';
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      secondary: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';
    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${widthStyles}
          ${disabledStyles}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
            {children}
            {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
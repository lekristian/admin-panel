import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            block w-full rounded-md shadow-sm
            ${error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {helper && !error && (
          <p className="text-sm text-gray-500">{helper}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
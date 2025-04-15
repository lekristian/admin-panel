import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }: CardProps) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '' }: CardProps) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }: CardProps) => (
  <div className={`p-6 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);
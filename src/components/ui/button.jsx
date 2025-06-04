import React from 'react';

export function Button({ children, variant = 'default', size = 'default', className = '', ...props }) {
  const variantClasses = {
    default: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-12 rounded-md px-6',
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant] || ''} ${sizeClasses[size] || ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

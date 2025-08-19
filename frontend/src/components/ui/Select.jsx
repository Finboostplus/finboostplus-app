import React from 'react';

export default function SelectUI({ className = '', children, ...props }) {
  return (
    <select
      className={`
        w-full p-2 rounded-md border 
        bg-surface text-text border-muted
        placeholder-muted
        dark:bg-surface-dark dark:text-text-dark dark:border-muted-dark
        dark:placeholder-muted-dark
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
        transition-colors
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  );
}

import React from 'react';

export default function SelectUI({
  id,
  name,
  value,
  onChange,
  defaultValue,
  options = [],
  required = false,
  className = '',
  ...rest
}) {
  return (
    <select
      id={id || name}
      name={name}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      required={required}
      className={`
        w-full p-2 rounded-md border 
        bg-surface text-text border-muted
        dark:bg-surface-dark dark:text-text-dark dark:border-muted-dark
        placeholder-muted dark:placeholder-muted-dark
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
        transition-colors
        ${className}
      `}
      {...rest}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

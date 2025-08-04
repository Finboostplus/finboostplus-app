import { Checkbox } from '@headlessui/react';

export default function CheckboxUI({
  checked,
  onChange,
  label,
  name,
  className = '',
  disabled = false,
  id,
  ...props
}) {
  const baseClass = 'group flex items-center gap-2 cursor-pointer';
  const boxClass =
    'block w-5 h-5 rounded border border-muted bg-surface group-data-[checked]:bg-primary transition-colors';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <Checkbox
      id={id}
      checked={checked}
      onChange={onChange}
      name={name}
      disabled={disabled}
      className={`${baseClass} ${disabledClass} ${className}`}
      {...props}
    >
      <span
        className={`${boxClass} flex items-center justify-center`}
        aria-hidden="true"
      >
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100 transition-opacity"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          width={14}
          height={14}
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label && (
        <span
          className={`text-sm text-text select-none ${
            disabled ? 'cursor-not-allowed' : ''
          }`}
        >
          {label}
        </span>
      )}
    </Checkbox>
  );
}

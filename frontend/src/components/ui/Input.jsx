import { Input } from '@headlessui/react';

export default function InputUI({
  id,
  value,
  name,
  type,
  placeholder,
  className,
  required,
  step,
  readonly,
}) {
  return (
    <Input
      id={id}
      value={value}
      name={name}
      type={type}
      placeholder={placeholder}
      className={className}
      required={required}
      step={step}
      readOnly={readonly}
    />
  );
}

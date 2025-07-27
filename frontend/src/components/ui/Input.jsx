import { Input } from '@headlessui/react';

export default function InputUI({
  id,
  value,
  name,
  type,
  placeholder,
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
      className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
      required={required}
      step={step}
      readOnly={readonly}
    />
  );
}

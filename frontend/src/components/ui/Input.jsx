import { Input } from '@headlessui/react';

export default function InputUI({
  id,
  value,
  name,
  onChange,
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
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="
        w-full h-11 rounded-xl border border-muted
        px-4 text-sm text-text placeholder:text-muted
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
        transition
      "
      required={required}
      step={step}
      readOnly={readonly}
    />
  );
}

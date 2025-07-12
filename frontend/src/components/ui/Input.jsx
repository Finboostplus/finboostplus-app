import { Input } from '@headlessui/react';

export default function InputUI({
  id,
  name,
  type,
  placeholder,
  className,
  required,
}) {
  return (
    <Input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className={className}
      required={required}
    />
  );
}

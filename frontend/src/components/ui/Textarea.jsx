import { Textarea } from '@headlessui/react';

export default function TextareaUI({ id, name, rows, className, placeholder }) {
  return (
    <Textarea
      id={id}
      name={name}
      rows={rows}
      className={className}
      placeholder={placeholder}
    ></Textarea>
  );
}

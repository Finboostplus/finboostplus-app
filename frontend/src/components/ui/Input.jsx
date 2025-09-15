import { Input } from '@headlessui/react';

export default function InputUI(props) {
  return (
    <Input
      {...props}
      className={`w-full h-11 rounded-xl border border-muted
        px-4 text-sm text-text placeholder:text-muted
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
        transition ${props.className}`}
    />
  );
}

import { Button } from '@headlessui/react';

export default function ButtonUI({ title, type, arialLabel, className, fn }) {
  return (
    <Button
      onClick={fn}
      aria-label={arialLabel}
      type={type}
      className={className}
    >
      {title}
    </Button>
  );
}

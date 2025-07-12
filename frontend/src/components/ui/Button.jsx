import { Button } from '@headlessui/react';

export default function ButtonUI({ title, type, arialLabel, className }) {
  return (
    <Button aria-label={arialLabel} type={type} className={className}>
      {title}
    </Button>
  );
}

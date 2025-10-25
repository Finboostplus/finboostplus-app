import { Button } from '@headlessui/react';

export default function ButtonUI({ children, ...props }) {
  return (
    <Button {...props}>
      {/* {icon ? icon : ''}
      <span>{title}</span> */}
      {children}
    </Button>
  );
}

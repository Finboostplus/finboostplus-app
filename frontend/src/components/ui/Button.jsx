import { Button } from '@headlessui/react';

export default function ButtonUI({
  icon,
  title,
  type,
  arialLabel,
  className,
  fnClick,
  disabled,
}) {
  return (
    <Button
      onClick={fnClick}
      aria-label={arialLabel}
      type={type}
      className={className}
      disabled={disabled}
    >
      {icon && <span className="text-xl text-blue-800">{icon}</span>}
      <span>{title}</span>
    </Button>
  );
}

import { Button } from '@headlessui/react';

export default function ButtonUI({
  icon, // renomeando para poder usar como componente
  title,
  type = 'button',
  ariaLabel, // corrigido typo de arialLabel para ariaLabel
  className = '',
  fnClick,
  disabled = false,
}) {
  return (
    <Button
      onClick={fnClick}
      aria-label={ariaLabel || title}
      type={type}
      className={className}
      disabled={disabled}
    >
      {icon ? icon : ''}
      <span>{title}</span>
    </Button>
  );
}

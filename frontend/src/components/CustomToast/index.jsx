import { toast } from 'react-toastify';

const contextClass = {
  success: 'border-success!',
  error: 'border-error!',
  info: 'border-info!',
  warning: 'border-warning!',
  default: 'border-indigo-600!',
};

function MyCustomToast({ title, message }) {
  return (
    <div className="flex flex-col gap-1 ">
      <label className="font-bold first-letter:uppercase text-sm">
        {title}
      </label>
      <span className="text-xs">{message}</span>
    </div>
  );
}

export const customToast = (title, message, type = 'info') =>
  toast(<MyCustomToast title={title} message={message} />, {
    ariaLabel: 'field' + title,
    type,
    autoClose: 1300,
    className: contextClass[type] + ' border-2 border-b-0',
    toastId: type + '-' + message,
  });

import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { routes } from './routes/routes.jsx';
import { MdCheckCircle, MdError, MdInfo, MdWarning } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Registrar o service worker da PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('SW registered successfully:', registration.scope);
      })
      .catch(registrationError => {
        console.log('SW registration failed:', registrationError);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={routes} />
    <ToastContainer
      position="top-right"
      limit={2}
      style={{ right: 30 }}
      icon={({ type }) => {
        const baseClass = 'text-4xl'; // Tamanho padrão para todos
        switch (type) {
          case 'info':
            return <MdInfo className={`text-info ${baseClass}`} />;
          case 'error':
            return <MdError className={`text-error ${baseClass}`} />;
          case 'success':
            return <MdCheckCircle className={`text-success ${baseClass}`} />;

          case 'warning':
            return <MdWarning className={`text-warning ${baseClass}`} />;
          default:
            return null;
        }
      }}
    />
    </QueryClientProvider>
  </StrictMode>
);

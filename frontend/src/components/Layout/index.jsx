import { Outlet } from 'react-router';
import Header from './Header';
import { Suspense } from 'react';
import Loading from '../Loading';

import PWAInstaller from '../PWAInstaller';
import OfflineIndicator from '../OfflineIndicator';

import { ToastContainer } from 'react-toastify';
import {
  MdInfo, // Info
  MdError, // Error
  MdCheckCircle, // Success
  MdWarning, // Warning
} from 'react-icons/md';

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <OfflineIndicator />
      <main className="flex-1 overflow-y-auto bg-neutral ">
        <Header />
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl pt-10">
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
        <PWAInstaller />
      </main>
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
    </div>
  );
}

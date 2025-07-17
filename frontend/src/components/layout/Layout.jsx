import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';
import { Suspense } from 'react';

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

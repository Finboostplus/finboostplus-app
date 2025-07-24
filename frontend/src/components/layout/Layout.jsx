import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';
import { Suspense } from 'react';
import Loading from '../Loading';

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white">
        <Header />
        <div className=" mx-auto my-0 max-w-[1920px]">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

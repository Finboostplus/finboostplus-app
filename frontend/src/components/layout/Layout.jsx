import { Outlet } from 'react-router';
import Header from './Header';
import { Suspense } from 'react';
import Loading from '../Loading';

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto bg-neutral ">
        <Header />
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl pt-10">
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

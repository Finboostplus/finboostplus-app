import { useState } from 'react';
import SidebarNav from './SidebarNav';
import UserGreeting from '../../UserGreeting';
import { FiMenu, FiX } from 'react-icons/fi'; // Ícones para abrir/fechar

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão para abrir o menu (aparece apenas em telas pequenas) */}
      <button
        className="md:hidden p-2 text-xl fixed top-4 left-2 rounded-full bg-gray-500 text-white"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
      >
        <FiMenu />
      </button>

      {/* Sidebar (fixo em desktop, flutuante em mobile) */}
      <div
        className={` max-md:w-full
          fixed z-50 top-0 left-0 h-full w-64 bg-gray-100 border-r-2 border-gray-300 p-6
          flex flex-col flex-shrink-0 transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:static md:h-auto md:shadow-none
        `}
      >
        {/* Botão para fechar (apenas mobile) */}
        <div className="flex justify-end md:hidden mb-4">
          <button
            className="text-2xl"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu"
          >
            <FiX />
          </button>
        </div>

        <UserGreeting />
        <SidebarNav />
      </div>
    </>
  );
}

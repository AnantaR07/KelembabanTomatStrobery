import React, { useState } from 'react';


function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className='fixed bottom-40 left-4 z-20 bg-green-500 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-300'
      >
        {/* Menu/Close Icon */}
        <span className={`transition-all ${isOpen ? 'rotate-180' : 'rotate-0'} transform`}>
          {isOpen ? 'X' : '☰'} {/* Use 'X' for Close, '☰' for Menu */}
        </span>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-500 text-white pt-16 transition-transform duration-300 ease-in-out z-10 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}
      >
        {/* Logo Tanaman */}
        <div className='flex flex-col items-center p-4'>
          <img
            src="/logo.jpeg"
            alt="Logo Tanaman"
            className='w-20 h-20 mb-3 rounded-full'
          />
        </div>

        <ul className='space-y-4 p-4'>
        <li> <a className='block hover:bg-green-600 p-2 rounded transition duration-300'>Monitoring Tomat </a></li>
        <li> <a href="#" className="block hover:bg-green-600 p-2 rounded transition duration-300 flex items-center gap-2">Monitoring Strawberry </a></li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;

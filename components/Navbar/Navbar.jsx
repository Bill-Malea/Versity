import React from 'react';

const NavBar = ({ onTabClick, activeTab }) => {
  return (
    <nav className="bg-black p-4 text-white fixed top-0  z-50  w-full shadow-md">
      <div className="container mx-auto flex items-start">

        {/* Logo Placeholder */}
        <div className="flex items-center">
          <span className="text-2xl font-semibold">Your Logo</span>
        </div>

        {/* Navigation Tabs */}
        <div className="ml-auto space-x-4 lg:space-x-8 lg:mr-10">
          {['university', 'fellowship', 'scholarship', 'news', 'blog', 'about'].map(tab => (
            <button
              key={tab}
              className={`relative transition duration-300 ${activeTab === tab ? 'text-black bg-green-400  rounded-sm p-1' : 'hover:text-green-400'}`}
              onClick={() => onTabClick(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} 
              {activeTab === tab && <div className="active-tab-marker"></div>}
            </button>
          ))}
        </div>

      </div>
    </nav>
  );
};

export default NavBar;

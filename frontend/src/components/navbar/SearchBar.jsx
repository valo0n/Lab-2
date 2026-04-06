import React from 'react';
import { FaSearch, FaRegHeart, FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

const SearchBar = () => {
  return (
    <div className="bg-clicon-blue py-5 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap justify-between items-center gap-4">
        
        {/* Logo */}
        <div className="flex items-center space-x-2 text-white font-bold text-2xl tracking-wide cursor-pointer">
          <div className="w-8 h-8 border-4 border-white rounded-full flex justify-center items-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span>CLICON</span>
        </div>

        {/* Search Input */}
        <div className="w-full lg:w-1/2 order-3 lg:order-none">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for anything..." 
              className="w-full py-2.5 pl-4 pr-10 rounded text-sm text-gray-700 focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-white text-xl order-2 lg:order-none">
          <div className="relative cursor-pointer">
            <FiShoppingCart />
            <span className="absolute -top-2 -right-2 bg-white text-clicon-blue text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </div>
          <FaRegHeart className="cursor-pointer hover:text-gray-300" />
          <FaRegUser className="cursor-pointer hover:text-gray-300" />
        </div>

      </div>
    </div>
  );
};

export default SearchBar;
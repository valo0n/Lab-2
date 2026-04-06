import React from 'react';
import { AiOutlineHome, AiOutlineRight } from 'react-icons/ai';

const Breadcrumb = () => {
  return (
    <div className="bg-gray-50 py-4 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
        <AiOutlineHome className="text-lg cursor-pointer hover:text-gray-800" />
        <span className="cursor-pointer hover:text-gray-800">Home</span>
        <AiOutlineRight className="text-xs" />
        <span className="cursor-pointer hover:text-gray-800">Shop</span>
        <AiOutlineRight className="text-xs" />
        <span className="cursor-pointer hover:text-gray-800">Shop Grid</span>
        <AiOutlineRight className="text-xs" />
        <span className="cursor-pointer hover:text-gray-800">Electronics Devices</span>
        <AiOutlineRight className="text-xs" />
        <span className="text-blue-500 font-medium">Macbook Pro</span>
      </div>
    </div>
  );
};

export default Breadcrumb
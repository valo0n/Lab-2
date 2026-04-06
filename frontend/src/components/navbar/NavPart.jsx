import React from 'react';
// Import Feather icons
import { FiChevronDown, FiPhoneCall } from 'react-icons/fi';
// Import Material Design icons
import { MdOutlineLocationOn, MdHeadsetMic } from 'react-icons/md';
// Import Github Octicons
import { GoGitCompare, GoInfo } from 'react-icons/go';

const NavPart = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 overflow-x-auto">
        
        {/* Left Side: Category & Links */}
        <div className="flex items-center gap-6 min-w-max">
          <button className="bg-gray-100 flex items-center gap-2 px-4 py-2.5 rounded font-medium text-gray-800 text-sm hover:bg-gray-200 transition">
            All Category <FiChevronDown />
          </button>
          
          <nav className="flex items-center gap-5 text-gray-600 text-sm">
            <a href="#" className="flex items-center gap-1.5 hover:text-clicon-blue">
              <MdOutlineLocationOn className="text-lg" /> Track Order
            </a>
            <a href="#" className="flex items-center gap-1.5 hover:text-clicon-blue">
              <GoGitCompare className="text-lg" /> Compare
            </a>
            <a href="#" className="flex items-center gap-1.5 hover:text-clicon-blue">
              <MdHeadsetMic className="text-lg" /> Customer Support
            </a>
            <a href="#" className="flex items-center gap-1.5 hover:text-clicon-blue">
              <GoInfo className="text-lg" /> Need Help
            </a>
          </nav>
        </div>

        {/* Right Side: Phone */}
        <div className="flex items-center gap-2 text-gray-800 font-medium min-w-max">
          <FiPhoneCall className="text-lg" />
          <span>+1-202-555-0104</span>
        </div>

      </div>
    </div>
  );
};

export default NavPart;
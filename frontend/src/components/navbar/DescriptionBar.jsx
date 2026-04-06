import React from 'react';
import { 
  FaTwitter, FaFacebookF, FaPinterestP, FaRedditAlien, 
  FaYoutube, FaInstagram, FaSearch, FaRegHeart, FaRegUser 
} from 'react-icons/fa';
import { FiShoppingCart, FiChevronDown } from 'react-icons/fi';
import { MdOutlineLocationOn, MdHeadsetMic } from 'react-icons/md';
import { GoGitCompare, GoInfo } from 'react-icons/go';
import { FiPhoneCall } from 'react-icons/fi';
import { AiOutlineHome, AiOutlineRight } from 'react-icons/ai';

const DescriptionBar = () => {
  return (
    <div className="bg-clicon-blue text-white text-xs py-2 px-4 border-b border-blue-800 hidden lg:flex justify-between items-center">
      <div>Welcome to Clicon online eCommerce store.</div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <span>Follow us:</span>
          <FaTwitter className="cursor-pointer hover:text-gray-300" />
          <FaFacebookF className="cursor-pointer hover:text-gray-300" />
          <FaPinterestP className="cursor-pointer hover:text-gray-300" />
          <FaRedditAlien className="cursor-pointer hover:text-gray-300" />
          <FaYoutube className="cursor-pointer hover:text-gray-300" />
          <FaInstagram className="cursor-pointer hover:text-gray-300" />
        </div>
        <div className="flex items-center space-x-4 border-l border-blue-700 pl-4">
          <button className="flex items-center space-x-1 hover:text-gray-300">
            <span>Eng</span> <FiChevronDown />
          </button>
          <button className="flex items-center space-x-1 hover:text-gray-300">
            <span>USD</span> <FiChevronDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionBar
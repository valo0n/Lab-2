import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
} from "react-icons/fi";

export default function Header({ onMenuClick }) {
  return (
    <div className="bg-accent-blue text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 sm:h-20 flex items-center gap-3 sm:gap-6">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden hover:text-primary transition-colors"
          aria-label="Open menu"
        >
          <FiMenu size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-base">C</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-wide">
            CLICON
          </span>
        </div>

        {/* Search bar — hidden on small mobile */}
        <div className="hidden sm:flex flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full h-10 sm:h-11 px-4 pr-12 rounded text-dark placeholder:text-gray-300 focus:outline-none text-sm"
          />
          <button
            className="absolute right-0 top-0 h-10 sm:h-11 px-3 sm:px-4 bg-primary hover:bg-primary-600 rounded-r text-white"
            aria-label="Search"
          >
            <FiSearch size={18} />
          </button>
        </div>

        {/* Mobile search icon */}
        <button
          className="sm:hidden ml-auto hover:text-primary transition-colors"
          aria-label="Search"
        >
          <FiSearch size={22} />
        </button>

        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0 ml-auto sm:ml-0">
          <button
            className="relative hover:text-primary transition-colors hidden sm:block"
            aria-label="Wishlist"
          >
            <FiHeart size={22} />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-[10px] rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </button>
          <button
            className="relative hover:text-primary transition-colors"
            aria-label="Cart"
          >
            <FiShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-[10px] rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </button>
          <button
            className="hover:text-primary transition-colors hidden sm:block"
            aria-label="Account"
          >
            <FiUser size={22} />
          </button>
        </div>
      </div>

      {/* Mobile-only search bar (below header) */}
      <div className="sm:hidden px-3 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full h-10 px-3 pr-11 rounded text-dark placeholder:text-gray-300 focus:outline-none text-sm"
          />
          <button
            className="absolute right-0 top-0 h-10 px-3 bg-primary hover:bg-primary-600 rounded-r text-white"
            aria-label="Search"
          >
            <FiSearch size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

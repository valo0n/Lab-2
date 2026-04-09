import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

export default function Header() {
  return (
    <div className="bg-accent-blue text-white">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <span className="text-2xl font-bold tracking-wide">CLICON</span>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full h-11 px-4 pr-12 rounded text-dark placeholder:text-gray-300 focus:outline-none"
          />
          <button className="absolute right-0 top-0 h-11 px-4 bg-primary hover:bg-primary-600 rounded-r text-white">
            <FiSearch size={18} />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button className="relative hover:text-primary transition-colors">
            <FiHeart size={22} />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-[10px] rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </button>
          <button className="relative hover:text-primary transition-colors">
            <FiShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-[10px] rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </button>
          <button className="hover:text-primary transition-colors">
            <FiUser size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

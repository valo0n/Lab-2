import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="bg-dark text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <span className="bg-accent-yellow text-dark font-bold px-2 py-0.5 text-[10px] sm:text-xs rounded whitespace-nowrap">
            Black Friday
          </span>
          <span className="hidden lg:inline text-gray-300 text-xs truncate">
            Up to 59% OFF — Limited time offer on all products
          </span>
          <Link
            to="/"
            className="bg-primary hover:bg-primary-600 text-white font-semibold px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded whitespace-nowrap"
          >
            SHOP NOW →
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3 lg:gap-4 text-xs">
          <div className="hidden lg:flex items-center gap-2 text-gray-300">
            <span>Follow us:</span>
            <button type="button" className="hover:text-primary">
              f
            </button>
            <button type="button" className="hover:text-primary">
              t
            </button>
            <button type="button" className="hover:text-primary">
              in
            </button>
            <button type="button" className="hover:text-primary">
              ig
            </button>
          </div>
          <select className="bg-transparent text-gray-300 outline-none cursor-pointer">
            <option>Eng</option>
          </select>
          <select className="bg-transparent text-gray-300 outline-none cursor-pointer">
            <option>USD</option>
          </select>
        </div>
      </div>
    </div>
  );
}

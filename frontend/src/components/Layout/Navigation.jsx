import { FiMenu, FiPhone } from 'react-icons/fi';

export default function Navigation() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-6">
        {/* All Category dropdown */}
        <button className="flex items-center gap-2 bg-gray-50 px-4 h-10 rounded text-sm font-medium text-dark hover:bg-gray-100 transition-colors">
          <FiMenu size={18} />
          All Category
          <span className="text-dark-300">▾</span>
        </button>

        {/* Navigation links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-dark">
          <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
            🔥 Best Sellers
          </a>
          <a href="#" className="hover:text-primary transition-colors">Today's Deals</a>
          <a href="#" className="hover:text-primary transition-colors">New Arrivals</a>
          <a href="#" className="hover:text-primary transition-colors">Customer Service</a>
          <a href="#" className="hover:text-primary transition-colors">Need Help</a>
        </nav>

        {/* Phone */}
        <div className="ml-auto flex items-center gap-2 text-sm font-semibold text-dark">
          <FiPhone size={16} className="text-primary" />
          +1-202-555-0104
        </div>
      </div>
    </div>
  );
}

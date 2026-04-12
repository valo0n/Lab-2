import { FiMenu, FiPhone, FiX } from "react-icons/fi";

export default function Navigation({ mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden lg:block bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-6">
          <button className="flex items-center gap-2 bg-gray-50 px-4 h-10 rounded text-sm font-medium text-dark hover:bg-gray-100 transition-colors">
            <FiMenu size={18} />
            All Category
            <span className="text-dark-300">▾</span>
          </button>

          <nav className="flex items-center gap-6 text-sm font-medium text-dark">
            <a
              href="#"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              🔥 Best Sellers
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Today's Deals
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              New Arrivals
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Customer Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Need Help
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-2 text-sm font-semibold text-dark">
            <FiPhone size={16} className="text-primary" />
            +1-202-555-0104
          </div>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-xl font-bold text-dark">CLICON</span>
          </div>
          <button onClick={onMobileClose} aria-label="Close menu">
            <FiX size={24} className="text-dark" />
          </button>
        </div>

        <nav className="p-4">
          <div className="text-xs uppercase text-dark-300 font-semibold mb-2">
            Categories
          </div>
          <a
            href="#"
            className="block py-3 text-dark hover:text-primary border-b border-gray-100"
          >
            🔥 Best Sellers
          </a>
          <a
            href="#"
            className="block py-3 text-dark hover:text-primary border-b border-gray-100"
          >
            Today's Deals
          </a>
          <a
            href="#"
            className="block py-3 text-dark hover:text-primary border-b border-gray-100"
          >
            New Arrivals
          </a>
          <a
            href="#"
            className="block py-3 text-dark hover:text-primary border-b border-gray-100"
          >
            Customer Service
          </a>
          <a
            href="#"
            className="block py-3 text-dark hover:text-primary border-b border-gray-100"
          >
            Need Help
          </a>

          <div className="text-xs uppercase text-dark-300 font-semibold mb-2 mt-6">
            Account
          </div>
          <a
            href="#"
            className="block py-3 text-dark hover:text-primary border-b border-gray-100"
          >
            Login / Register
          </a>
          <a
            href="#"
            className="block py-3 text-dark hover:text-primary border-b border-gray-100"
          >
            Wishlist
          </a>
          <a
            href="#"
            className="block py-3 text-dark hover:text-primary border-b border-gray-100"
          >
            My Orders
          </a>

          <div className="mt-6 p-3 bg-primary-50 rounded flex items-center gap-2 text-sm text-dark">
            <FiPhone size={16} className="text-primary" />
            <span className="font-semibold">+1-202-555-0104</span>
          </div>
        </nav>
      </aside>
    </>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiPhone, FiX, FiChevronDown } from "react-icons/fi";
import MegaMenu from "./MegaMenu";

export default function Navigation({ mobileOpen, onMobileClose }) {
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:block bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-6">
          {/* Wrapper relative around button so MegaMenu anchors here */}
          <div className="relative">
            <button
              onClick={() => setMegaOpen(!megaOpen)}
              className={`flex items-center gap-2 px-4 h-10 rounded text-sm font-medium transition-colors ${megaOpen ? "bg-primary text-white" : "bg-gray-50 text-dark hover:bg-gray-100"}`}
            >
              <FiMenu size={18} />
              All Category
              <FiChevronDown
                size={14}
                className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}
              />
            </button>

            <MegaMenu isOpen={megaOpen} onClose={() => setMegaOpen(false)} />
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium text-dark">
            <Link
              to="/shop-page"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              🔥 Shop
            </Link>
            <Link to="/" className="hover:text-primary transition-colors">
              Today's Deals
            </Link>
            <Link to="/" className="hover:text-primary transition-colors">
              New Arrivals
            </Link>
            <Link
              to="/customer"
              className="hover:text-primary transition-colors"
            >
              Customer Service
            </Link>
            <Link to="/faqs" className="hover:text-primary transition-colors">
              Need Help
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2 text-sm font-semibold text-dark">
            <FiPhone size={16} className="text-primary" />
            +1-202-555-0104
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 overflow-y-auto ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
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
          {[
            { label: "🔥 Best Sellers", to: "/" },
            { label: "Today's Deals", to: "/" },
            { label: "New Arrivals", to: "/" },
            { label: "Customer Service", to: "/customer" },
            { label: "Need Help", to: "/faqs" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={onMobileClose}
              className="block py-3 text-dark hover:text-primary border-b border-gray-100"
            >
              {item.label}
            </Link>
          ))}

          <div className="text-xs uppercase text-dark-300 font-semibold mb-2 mt-6">
            Shop by Category
          </div>
          {[
            { label: "💻 Computer & Laptop", to: "/" },
            { label: "📱 SmartPhone", to: "/" },
            { label: "🎧 Headphones", to: "/" },
            { label: "⌨️ Accessories", to: "/" },
            { label: "📷 Camera & Photo", to: "/" },
            { label: "📺 TV & Homes", to: "/" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={onMobileClose}
              className="block py-3 text-dark hover:text-primary border-b border-gray-100"
            >
              {item.label}
            </Link>
          ))}

          <div className="text-xs uppercase text-dark-300 font-semibold mb-2 mt-6">
            Account
          </div>
          {[
            { label: "Sign In", to: "/signin" },
            { label: "Sign Up", to: "/signup" },
            { label: "Wishlist", to: "/wishlist" },
            { label: "My Orders", to: "/customer" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={onMobileClose}
              className="block py-3 text-dark hover:text-primary border-b border-gray-100"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-6 p-3 bg-primary-50 rounded flex items-center gap-2 text-sm text-dark">
            <FiPhone size={16} className="text-primary" />
            <span className="font-semibold">+1-202-555-0104</span>
          </div>
        </nav>
      </aside>
    </>
  );
}

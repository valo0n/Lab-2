import { FiX } from "react-icons/fi";
import { useState } from "react";

export default function FilterSidebar({ mobileOpen, onMobileClose }) {
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const FilterSection = ({ title, children }) => (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <h4 className="font-bold text-dark text-sm mb-3">{title}</h4>
      {children}
    </div>
  );

  const content = (
    <>
      <FilterSection title="Category">
        {[
          "Computer & Laptop",
          "SmartPhone",
          "Headphones",
          "Accessories",
          "Camera",
          "TV",
        ].map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-2 text-xs sm:text-sm text-dark-300 py-1.5 cursor-pointer hover:text-primary"
          >
            <input type="checkbox" className="accent-primary" />
            <span>{cat}</span>
            <span className="ml-auto text-dark-300">
              ({Math.floor(Math.random() * 50) + 10})
            </span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-full h-9 px-2 border border-gray-100 rounded text-xs focus:outline-none focus:border-primary"
            placeholder="Min"
          />
          <span className="text-dark-300">—</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full h-9 px-2 border border-gray-100 rounded text-xs focus:outline-none focus:border-primary"
            placeholder="Max"
          />
        </div>
        <button className="w-full bg-gray-50 hover:bg-gray-100 text-dark text-xs font-semibold py-2 rounded">
          APPLY
        </button>
      </FilterSection>

      <FilterSection title="Popular Brands">
        {["Apple", "Samsung", "Sony", "Bose", "LG", "Google", "Microsoft"].map(
          (brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 text-xs sm:text-sm text-dark-300 py-1.5 cursor-pointer hover:text-primary"
            >
              <input type="checkbox" className="accent-primary" />
              <span>{brand}</span>
            </label>
          ),
        )}
      </FilterSection>

      <FilterSection title="Rating">
        {[5, 4, 3, 2, 1].map((n) => (
          <label
            key={n}
            className="flex items-center gap-2 py-1.5 cursor-pointer hover:text-primary"
          >
            <input type="checkbox" className="accent-primary" />
            <div className="flex text-warning text-sm">
              {"★★★★★".split("").map((s, i) => (
                <span
                  key={i}
                  className={i < n ? "text-warning" : "text-gray-200"}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-dark-300">& up</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Popular Tags">
        <div className="flex flex-wrap gap-2">
          {[
            "4K UHD",
            "5G",
            "Bluetooth",
            "Wireless",
            "Gaming",
            "Mechanical",
            "RGB",
            "Portable",
          ].map((tag) => (
            <button
              key={tag}
              className="text-xs border border-gray-100 px-2.5 py-1 rounded hover:border-primary hover:text-primary transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </FilterSection>
    </>
  );

  return (
    <>
      {/* Desktop — always visible */}
      <aside className="hidden lg:block w-64 flex-shrink-0 bg-white border border-gray-100 rounded-lg p-4 self-start sticky top-4">
        {content}
      </aside>

      {/* Mobile — slide-in drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-50"
            onClick={onMobileClose}
          />
          <aside className="lg:hidden fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white">
              <h3 className="font-bold text-dark">Filters</h3>
              <button onClick={onMobileClose} aria-label="Close">
                <FiX size={22} />
              </button>
            </div>
            <div className="p-4">{content}</div>
          </aside>
        </>
      )}
    </>
  );
}

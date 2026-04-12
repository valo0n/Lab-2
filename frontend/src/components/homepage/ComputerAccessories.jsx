import { useState } from "react";
import ProductCard from "../common/ProductCard";

const tabs = [
  "All Product",
  "Keyboard & Mouse",
  "Headphone",
  "Webcam",
  "Printer",
];

const products = [
  {
    name: "Logitech G733 Wireless Headset RGB",
    price: 129,
    image: "🎧",
    rating: 4.6,
    reviews: 234,
  },
  {
    name: "Razer Mechanical Gaming Keyboard RGB",
    price: 149,
    image: "⌨️",
    rating: 4.8,
    reviews: 567,
  },
  {
    name: "Red Mechanical Gaming Keyboard",
    price: 89,
    image: "⌨️",
    rating: 4.5,
    reviews: 189,
  },
  {
    name: "HP DeskJet Wireless Printer 4155",
    price: 119,
    image: "🖨️",
    rating: 4.4,
    reviews: 345,
  },
  {
    name: "Samsung Electronics Galaxy Buds 2",
    price: 119,
    image: "🎧",
    rating: 4.7,
    reviews: 432,
  },
  {
    name: "AVerMedia 1080p HD Webcam",
    price: 79,
    image: "📷",
    rating: 4.5,
    reviews: 156,
  },
  {
    name: "HP All-in-One Wireless Printer",
    price: 199,
    image: "🖨️",
    rating: 4.6,
    reviews: 267,
  },
  {
    name: "Sony WF-1000XM4 Wireless Earbuds",
    price: 279,
    image: "🎧",
    rating: 4.8,
    reviews: 543,
  },
];

export default function ComputerAccessories() {
  const [active, setActive] = useState("All Product");

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-dark">
          Computer Accessories
        </h2>

        {/* Scrollable tabs on mobile */}
        <div className="flex items-center gap-1 overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0 sm:overflow-visible">
          <div className="flex items-center gap-1 min-w-max sm:min-w-0 sm:flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded transition-colors whitespace-nowrap ${
                  active === tab
                    ? "bg-primary text-white"
                    : "text-dark-300 hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
            <a
              href="#"
              className="text-primary text-xs sm:text-sm font-semibold ml-2 hidden lg:inline hover:underline whitespace-nowrap"
            >
              Browse All →
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Product grid */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>

        {/* Side banners — 2 cols on mobile, stacked on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
          <div className="bg-warning rounded-lg p-4 sm:p-6 flex-1 relative overflow-hidden min-h-[160px] sm:min-h-[200px]">
            <p className="text-dark text-[10px] sm:text-xs font-bold mb-1">
              XIAOMI
            </p>
            <h3 className="text-base sm:text-xl font-bold text-dark mb-1 leading-tight">
              True Wireless
              <br />
              Earbuds
            </h3>
            <p className="text-dark-300 text-[10px] sm:text-xs mb-1 sm:mb-2">
              Up to 40% OFF
            </p>
            <p className="text-primary font-bold text-lg sm:text-2xl mb-2 sm:mb-3">
              $199 USD
            </p>
            <button className="bg-dark hover:bg-dark-100 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded">
              SHOP NOW →
            </button>
            <div className="absolute -bottom-4 -right-4 text-3xl sm:text-5xl">
              🎧
            </div>
          </div>

          <div className="bg-accent-blue text-white rounded-lg p-4 sm:p-6 flex-1 relative overflow-hidden min-h-[160px] sm:min-h-[200px]">
            <p className="text-warning text-[10px] sm:text-xs font-bold mb-1">
              SUMMER SALES
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1 leading-tight">
              37%
              <br />
              DISCOUNT
            </h3>
            <p className="text-gray-300 text-[10px] sm:text-xs mb-2 sm:mb-3 hidden sm:block">
              Only for SmartPhone product
            </p>
            <button className="bg-primary hover:bg-primary-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded">
              SHOP NOW →
            </button>
            <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

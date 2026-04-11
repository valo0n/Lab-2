import { useState } from "react";
import ProductCard from "../common/ProductCard";

const tabs = ["All Product", "Smart Phone", "Headphone", "Tv & Home"];

const products = [
  {
    name: "TOZO T6 True Wireless Earbuds",
    price: 70,
    image: "🎧",
    rating: 4.5,
    reviews: 738,
  },
  {
    name: "Samsung Galaxy S22 Ultra 5G",
    price: 1199,
    image: "📱",
    rating: 4.7,
    reviews: 412,
  },
  {
    name: "Amazon Smart TV Stick 4K Max",
    price: 54,
    image: "📺",
    rating: 4.8,
    reviews: 891,
  },
  {
    name: "Portable Wireless Speaker JBL",
    price: 99,
    image: "🔊",
    rating: 4.6,
    reviews: 234,
  },
  {
    name: "Vivo Y75 5G Smartphone 8GB+128GB",
    price: 349,
    image: "📱",
    rating: 4.4,
    reviews: 156,
  },
  {
    name: "DJI Mini 2 Drone Quadcopter UAV",
    price: 449,
    image: "🚁",
    rating: 4.9,
    reviews: 67,
  },
  {
    name: "Apple iPad Air with M1 Chip 64GB",
    price: 599,
    image: "📱",
    rating: 4.8,
    reviews: 543,
  },
  {
    name: "Bose QuietComfort 45 Headphones",
    price: 329,
    image: "🎧",
    rating: 4.7,
    reviews: 189,
  },
];

export default function FeaturedProducts() {
  const [active, setActive] = useState("All Product");

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with tabs */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-dark">Featured Products</h2>
        <div className="flex items-center gap-1 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
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
            className="text-primary text-sm font-semibold ml-2 hidden md:inline hover:underline"
          >
            Browse All Product →
          </a>
        </div>
      </div>

      {/* Layout: discount banner (left) + product grid (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Discount banner */}
        <div className="bg-warning rounded-lg p-6 flex flex-col justify-between min-h-[400px] relative overflow-hidden">
          <div>
            <p className="text-dark text-xs font-semibold mb-2">
              COMPUTER & ACCESSORIES
            </p>
            <h3 className="text-5xl font-bold text-dark mb-2">32%</h3>
            <p className="text-dark text-2xl font-bold">Discount</p>
            <p className="text-dark-200 text-sm mt-3">
              For all electronics products
            </p>
            <p className="text-dark-300 text-xs mt-1">
              Offers ending soon — till 27 Dec
            </p>
          </div>
          <button className="bg-dark hover:bg-dark-100 text-white text-xs font-bold px-4 py-2 rounded self-start mt-4">
            SHOP NOW →
          </button>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/20 rounded-full" />
        </div>

        {/* Product grid */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

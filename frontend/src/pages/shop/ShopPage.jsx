import TopBar from "../../components/layout/TopBar";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import { Home, Search, Star, Heart, Eye, ShoppingCart } from "lucide-react";

const products = [
  {
    badge: "HOT",
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
    price: "$70",
    image: "/images/product-1.png",
  },
  {
    name: "Samsung Electronics Galaxy S21 5G",
    price: "$2,300",
    image: "/images/product-2.png",
  },
  {
    badge: "BEST DEALS",
    name: "Amazon Basics High-Speed HDMI Cable",
    price: "$360",
    image: "/images/product-3.png",
  },
  {
    name: "Portable Washing Machine, 11lbs capacity",
    price: "$80",
    image: "/images/product-4.png",
  },
  {
    name: "Wired Over-Ear Gaming Headphones",
    price: "$1,500",
    image: "/images/product-5.png",
  },
  {
    badge: "25% OFF",
    name: "Polaroid 57-Inch Photo/Video Tripod",
    price: "$1,200",
    image: "/images/product-6.png",
  },
  {
    name: "Dell Optiplex 7000x7480 All-in-One Computer",
    price: "$250",
    image: "/images/product-7.png",
  },
  {
    badge: "SALE",
    name: "4K UHD LED Smart TV with Chromecast Built-in",
    price: "$220",
    image: "/images/product-8.png",
  },
  {
    badge: "BEST DEALS",
    name: "Sony WH-1000XM4 Wireless Headphones",
    price: "$180",
    image: "/images/product-9.png",
  },
  {
    name: "Flexible Wireless Headphones",
    price: "$80",
    image: "/images/product-10.png",
  },
  {
    badge: "HOT",
    name: "Redragon K580 Mechanical Gaming Keyboard",
    price: "$250",
    image: "/images/product-11.png",
  },
  {
    name: "Dell Laser Printer with Scanner",
    price: "$320",
    image: "/images/product-12.png",
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopBar />
      <Header />
      <Navigation />

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Home size={14} />
          <span>Home</span>
          <span>{">"}</span>
          <span>Shop</span>
          <span>{">"}</span>
          <span>Shop Grid</span>
          <span>{">"}</span>
          <span className="text-blue-500">Electronics Devices</span>
        </div>
      </div>

      <main className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-[260px_1fr] gap-8">
          <aside>
            <FilterSection title="CATEGORY">
              {[
                "Electronic Devices",
                "Computer & Laptop",
                "Computer Accessories",
                "Smart Phone",
                "Headphone",
                "Mobile Accessories",
                "Gaming Console",
                "Camera & Photo",
                "TV & Home Appliances",
                "Watch & Accessories",
              ].map((item, i) => (
                <label key={i} className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <input type="radio" name="cat" className="accent-orange-500" />
                  {item}
                </label>
              ))}
            </FilterSection>

            <FilterSection title="PRICE RANGE">
              <input type="range" className="w-full accent-orange-500 mb-4" />
              <div className="grid grid-cols-2 gap-2 mb-4">
                <input placeholder="Min price" className="border px-3 py-2 text-sm" />
                <input placeholder="Max price" className="border px-3 py-2 text-sm" />
              </div>
              {["All Price", "Under $25", "$25 to $100", "$100 to $300", "$300 to $500", "$500 to $1,000"].map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <input type="radio" name="price" className="accent-orange-500" />
                  {item}
                </label>
              ))}
            </FilterSection>

            <FilterSection title="POPULAR BRANDS">
              <div className="grid grid-cols-2 gap-2">
                {["Apple", "Google", "Samsung", "Xiaomi", "Sony", "Panasonic", "LG", "Intel"].map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="accent-orange-500" />
                    {brand}
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="POPULAR TAG">
              <div className="flex flex-wrap gap-2">
                {["Game", "Phone", "TV", "Asus Laptop", "Macbook", "SSD", "Graphics Card", "Power Bank"].map((tag) => (
                  <span key={tag} className="border px-3 py-1 text-xs text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </FilterSection>

            <div className="border border-orange-200 p-4 text-center mt-6">
              <img src="/images/watch-ad.png" alt="" className="mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Heavy on Features. Light on Price.</h3>
              <p className="text-sm text-gray-500 my-2">Only for: <span className="bg-yellow-300 px-2 py-1">$299 USD</span></p>
              <button className="w-full bg-orange-500 text-white py-3 text-sm font-semibold mt-3">
                SHOP NOW
              </button>
            </div>
          </aside>

          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-[430px]">
                <input
                  placeholder="Search for anything..."
                  className="w-full border border-gray-200 h-11 px-4 pr-10 text-sm outline-none"
                />
                <Search size={18} className="absolute right-3 top-3 text-gray-500" />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border border-gray-200 h-10 px-3 text-sm">
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 px-4 py-3 flex justify-between text-sm mb-5">
              <span className="text-gray-600">
                Active Filters: <b className="text-gray-900">Electronic Devices</b>
              </span>
              <span className="text-gray-600">
                <b className="text-gray-900">65,867</b> Results found.
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {products.map((product, index) => (
                <div key={index} className="border border-gray-200 p-3 relative group bg-white">
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-semibold px-2 py-1">
                      {product.badge}
                    </span>
                  )}

                  <div className="h-40 flex items-center justify-center mb-3">
                    <img src={product.image} alt={product.name} className="max-h-full object-contain" />
                  </div>

                  <div className="flex text-orange-400 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                    <span className="text-gray-400 text-xs ml-1">(738)</span>
                  </div>

                  <h3 className="text-sm text-gray-800 leading-5 min-h-[42px]">
                    {product.name}
                  </h3>

                  <p className="text-sm font-semibold text-blue-500 mt-2">{product.price}</p>

                  <div className="absolute inset-0 bg-white/70 hidden group-hover:flex items-center justify-center gap-2">
                    <button className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
                      <Heart size={16} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-orange-500 text-white shadow flex items-center justify-center">
                      <ShoppingCart size={17} />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-8">
              <button className="w-9 h-9 border rounded-full text-orange-500">‹</button>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={`w-9 h-9 rounded-full text-sm ${
                    n === 1 ? "bg-orange-500 text-white" : "border text-gray-600"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button className="w-9 h-9 border rounded-full text-orange-500">›</button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="border-b border-gray-200 pb-5 mb-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}
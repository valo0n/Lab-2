import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  ShoppingBag,
  MapPin,
  ShoppingCart,
  Heart,
  RotateCw,
  CreditCard,
  Clock,
  Settings,
  LogOut,
  Home,
  ChevronRight,
  Search,
  Calendar,
} from "lucide-react";
import TopBar from "../../components/Layout/TopBar";
import Header from "../../components/Layout/Header";
import Navigation from "../../components/Layout/Navigation";
import Footer from "../../components/Layout/Footer";

const sidebarItems = [
  { name: "Dashboard", icon: Layers, path: "/dashboard" },
  { name: "Order History", icon: ShoppingBag, path: "/order-history" },
  { name: "Track Order", icon: MapPin, path: "/track-order" },
  { name: "Shopping Cart", icon: ShoppingCart, path: "/cart" },
  { name: "Wishlist", icon: Heart, path: "/wishlist" },
  { name: "Compare", icon: RotateCw, path: "/compare" },
  { name: "Cards & Address", icon: CreditCard, path: "/cards-address" },
  { name: "Browsing History", icon: Clock, path: "/browsing-history" },
  { name: "Setting", icon: Settings, path: "/settings" },
  { name: "Log-out", icon: LogOut, path: "/signin" },
];

const historyByDate = [
  {
    date: "17 OCT, 2020",
    products: [
      {
        name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
        price: 70,
        image: "🎧",
        rating: 4.5,
        reviews: 738,
        badge: "HOT",
        badgeColor: "primary",
      },
      {
        name: "Samsung Electronics Samsung Galexy S21 5G",
        price: 2300,
        image: "📱",
        rating: 5,
        reviews: 536,
      },
      {
        name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
        price: 360,
        image: "❄️",
        rating: 5,
        reviews: 423,
        badge: "BEST DEALS",
        badgeColor: "info",
      },
      {
        name: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
        price: 80,
        image: "🎧",
        rating: 4,
        reviews: 816,
      },
    ],
  },
  {
    date: "17 OCT, 2020",
    products: [
      {
        name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
        price: 360,
        image: "🎧",
        rating: 4,
        reviews: 994,
        badge: "BEST DEALS",
        badgeColor: "info",
      },
      {
        name: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
        price: 80,
        image: "🎧",
        rating: 5,
        reviews: 798,
      },
      {
        name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
        price: 70,
        image: "⌨️",
        rating: 5,
        reviews: 600,
        badge: "HOT",
        badgeColor: "primary",
      },
    ],
  },
  {
    date: "24 MAY, 2020",
    products: [
      {
        name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
        price: 360,
        image: "🎧",
        rating: 4,
        reviews: 994,
        badge: "BEST DEALS",
        badgeColor: "info",
      },
      {
        name: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
        price: 80,
        image: "🎧",
        rating: 5,
        reviews: 798,
      },
      {
        name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
        price: 70,
        image: "⌨️",
        rating: 5,
        reviews: 600,
        badge: "HOT",
        badgeColor: "primary",
      },
      {
        name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
        price: 250,
        image: "🖨️",
        rating: 5,
        reviews: 492,
      },
      {
        name: "Samsung Electronics Samsung Galexy S21 5G",
        price: 2300,
        image: "📷",
        rating: 4,
        reviews: 740,
        badge: "SOLD OUT",
        badgeColor: "gray",
      },
    ],
  },
  {
    date: "21 SEP, 2020",
    products: [
      {
        name: "Wired Over-Ear Gaming Headphones with USB",
        price: 1500,
        image: "🚁",
        rating: 5,
        reviews: 647,
      },
      {
        name: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca...",
        price: 1200,
        oldPrice: 1600,
        image: "📺",
        rating: 4,
        reviews: 877,
        badge: "25% OFF",
        badgeColor: "warning",
      },
      {
        name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
        price: 250,
        image: "🖨️",
        rating: 5,
        reviews: 492,
      },
      {
        name: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca...",
        price: 1200,
        oldPrice: 1600,
        image: "🧺",
        rating: 4,
        reviews: 423,
        badge: "25% OFF",
        badgeColor: "warning",
      },
    ],
  },
  {
    date: "22 OCT, 2020",
    products: [
      {
        name: "4K UHD LED Smart TV with Chromecast Built-in",
        price: 220,
        image: "📹",
        rating: 4,
        reviews: 556,
        badge: "SALE",
        badgeColor: "success",
      },
    ],
  },
];

function BadgeColor(color) {
  return (
    {
      primary: "bg-primary",
      info: "bg-info",
      warning: "bg-warning text-dark",
      success: "bg-success",
      gray: "bg-gray-400",
    }[color] || "bg-primary"
  );
}

function ProductCard({ product }) {
  return (
    <div className="border border-gray-100 rounded-lg p-3 relative bg-white">
      {product.badge && (
        <span
          className={`absolute top-2 left-2 text-[9px] font-bold text-white px-2 py-0.5 rounded ${BadgeColor(product.badgeColor)}`}
        >
          {product.badge}
        </span>
      )}
      <div className="aspect-square bg-gray-50 rounded flex items-center justify-center text-5xl mb-3">
        {product.image}
      </div>
      <div className="flex items-center gap-1 text-xs mb-1">
        <div className="flex text-warning">
          {"★★★★★".split("").map((s, j) => (
            <span
              key={j}
              className={
                j < Math.round(product.rating)
                  ? "text-warning"
                  : "text-gray-200"
              }
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-dark-300">({product.reviews})</span>
      </div>
      <h4 className="text-xs text-dark line-clamp-2 mb-2 min-h-[32px]">
        {product.name}
      </h4>
      <div className="flex items-center gap-2">
        {product.oldPrice && (
          <span className="text-dark-300 text-xs line-through">
            ${product.oldPrice}
          </span>
        )}
        <p className="text-info font-bold text-sm">${product.price}</p>
      </div>
    </div>
  );
}

export default function BrowsingHistoryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [historyOn, setHistoryOn] = useState(true);

  const toggleCart = () => {
    setCartOpen((v) => !v);
    setWishlistOpen(false);
    setAccountOpen(false);
  };
  const toggleWishlist = () => {
    setWishlistOpen((v) => !v);
    setCartOpen(false);
    setAccountOpen(false);
  };
  const toggleAccount = () => {
    setAccountOpen((v) => !v);
    setCartOpen(false);
    setWishlistOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <TopBar />
      <Header
        onMenuClick={() => setMobileMenuOpen(true)}
        cartOpen={cartOpen}
        onCartToggle={toggleCart}
        wishlistOpen={wishlistOpen}
        onWishlistToggle={toggleWishlist}
        accountOpen={accountOpen}
        onAccountToggle={toggleAccount}
      />
      <Navigation
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm flex-wrap">
          <Home size={14} className="text-dark-300" />
          <Link to="/" className="text-dark-300 hover:text-primary">
            Home
          </Link>
          <ChevronRight size={14} className="text-dark-300" />
          <span className="text-dark-300">User Account</span>
          <ChevronRight size={14} className="text-dark-300" />
          <Link to="/dashboard" className="text-dark-300 hover:text-primary">
            Dashboard
          </Link>
          <ChevronRight size={14} className="text-dark-300" />
          <span className="text-info font-medium">Browsing History</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-white rounded-lg border border-gray-100 overflow-hidden h-fit">
            <nav className="flex flex-col py-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.name === "Browsing History";
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-dark hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-bold text-dark">Browsing History</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-dark">
                  Turn Browsing History on/off
                </span>
                <button
                  onClick={() => setHistoryOn(!historyOn)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${historyOn ? "bg-primary" : "bg-gray-200"}`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${historyOn ? "translate-x-5" : "translate-x-0.5"}`}
                  />
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                />
                <input
                  type="text"
                  placeholder="Search in browsing history"
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                />
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* History list */}
            {historyByDate.map((day, di) => (
              <div
                key={di}
                className="bg-white border border-gray-100 rounded-lg p-5 mb-4"
              >
                <p className="text-xs font-bold text-dark mb-4 tracking-wider">
                  {day.date}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {day.products.map((p, pi) => (
                    <ProductCard key={pi} product={p} />
                  ))}
                </div>
              </div>
            ))}

            {/* Load more */}
            <div className="flex justify-center mt-6">
              <button className="border border-primary text-primary text-xs font-bold uppercase tracking-wider px-8 py-3 rounded hover:bg-primary hover:text-white transition-colors flex items-center gap-2">
                ⟳ Load More
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

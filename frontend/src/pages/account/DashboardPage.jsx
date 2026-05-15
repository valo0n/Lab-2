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
  Rocket,
  Package,
  FileText,
  Home,
  ChevronRight,
  MoreHorizontal,
  Edit2,
  Trash2,
} from "lucide-react";
import TopBar from "../../components/Layout/TopBar";
import Header from "../../components/Layout/Header";
import Navigation from "../../components/Layout/Navigation";
import Footer from "../../components/Layout/Footer";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

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

const recentOrders = [
  {
    id: "#96459761",
    status: "IN PROGRESS",
    date: "Dec 30, 2019 05:18",
    total: "$1,500 (5 Products)",
  },
  {
    id: "#71667167",
    status: "COMPLETED",
    date: "Feb 2, 2019 19:28",
    total: "$80 (11 Products)",
  },
  {
    id: "#95214362",
    status: "CANCELED",
    date: "Mar 20, 2019 23:14",
    total: "$160 (3 Products)",
  },
  {
    id: "#71667167",
    status: "COMPLETED",
    date: "Feb 2, 2019 19:28",
    total: "$80 (1 Products)",
  },
  {
    id: "#51746385",
    status: "COMPLETED",
    date: "Feb 2, 2019 19:28",
    total: "$2,300 (2 Products)",
  },
  {
    id: "#51746385",
    status: "CANCELED",
    date: "Dec 30, 2019 07:52",
    total: "$70 (1 Products)",
  },
  {
    id: "#673971743",
    status: "COMPLETED",
    date: "Dec 7, 2019 23:26",
    total: "$220 (1 Products)",
  },
];

const browsingHistory = [
  {
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    price: 70,
    image: "🎧",
    badge: "HOT",
    badgeColor: "primary",
    rating: 4.5,
    reviews: 738,
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
    badge: "BEST DEALS",
    badgeColor: "info",
    rating: 5,
    reviews: 423,
  },
  {
    name: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
    price: 80,
    image: "🎧",
    rating: 4,
    reviews: 816,
  },
];

function StatusBadge({ status }) {
  const colors = {
    "IN PROGRESS": "text-warning",
    COMPLETED: "text-success",
    CANCELED: "text-danger",
  };
  return (
    <span
      className={`text-xs font-semibold ${colors[status] || "text-gray-500"}`}
    >
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cardMenuOpen, setCardMenuOpen] = useState(null);

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

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm">
          <Home size={14} className="text-dark-300" />
          <Link to="/" className="text-dark-300 hover:text-primary">
            Home
          </Link>
          <ChevronRight size={14} className="text-dark-300" />
          <span className="text-dark-300">User Account</span>
          <ChevronRight size={14} className="text-dark-300" />
          <span className="text-info font-medium">Dashboard</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-white rounded-lg border border-gray-100 overflow-hidden h-fit">
            <nav className="flex flex-col py-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.name === "Dashboard";
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

          {/* Main content */}
          <div>
            {/* Greeting */}
            <h1 className="text-2xl font-bold text-dark mb-2">Hello, Kevin</h1>
            <p className="text-sm text-dark-300 mb-6 leading-relaxed">
              From your account dashboard. you can easily check & view your{" "}
              <span className="text-info">Recent Orders</span>, manage your{" "}
              <span className="text-info">Shipping and Billing Addresses</span>{" "}
              and edit your <span className="text-info">Password</span> and{" "}
              <span className="text-info">Account Details.</span>
            </p>

            {/* Account Info, Billing, Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Account Info */}
              <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                  <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                    ACCOUNT INFO
                  </h3>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary font-bold">
                      KG
                    </div>
                    <div>
                      <h4 className="font-bold text-dark">Kevin Gilbert</h4>
                      <p className="text-xs text-dark-300">
                        Dhaka -1207, Bangladesh
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <p>
                      <span className="text-dark-300">Email:</span>{" "}
                      <span className="text-dark">kevin.gilbert@gmail.com</span>
                    </p>
                    <p>
                      <span className="text-dark-300">Sec Email:</span>{" "}
                      <span className="text-dark">kevin12345@gmail.com</span>
                    </p>
                    <p>
                      <span className="text-dark-300">Phone:</span>{" "}
                      <span className="text-dark">+1-202-555-0118</span>
                    </p>
                  </div>
                  <button className="mt-4 text-info text-xs font-bold uppercase tracking-wide hover:underline">
                    EDIT ACCOUNT
                  </button>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                  <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                    BILLING ADDRESS
                  </h3>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-dark mb-2">Kevin Gilbert</h4>
                  <p className="text-xs text-dark-300 mb-4 leading-relaxed">
                    East Tejturi Bazar, Word No. 04, Road No.
                    <br />
                    13/x, House no. 1320/C, Flat No. 5D,
                    <br />
                    Dhaka -1200, Bangladesh
                  </p>
                  <div className="space-y-2 text-xs mb-4">
                    <p>
                      <span className="text-dark-300">Phone Number:</span>{" "}
                      <span className="text-dark">+1-202-555-0118</span>
                    </p>
                    <p>
                      <span className="text-dark-300">Email:</span>{" "}
                      <span className="text-dark">kevin.gilbert@gmail.com</span>
                    </p>
                  </div>
                  <button className="text-info text-xs font-bold uppercase tracking-wide hover:underline">
                    EDIT ADDRESS
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-info">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dark">154</div>
                    <p className="text-xs text-dark-300">Total Orders</p>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dark">05</div>
                    <p className="text-xs text-dark-300">Pending Orders</p>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-success">
                    <Package size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dark">149</div>
                    <p className="text-xs text-dark-300">Completed Orders</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Option */}
            <div className="bg-white border border-gray-100 rounded-lg mb-6">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                  PAYMENT OPTION
                </h3>
                <button className="text-primary text-xs font-bold uppercase tracking-wide hover:underline flex items-center gap-1">
                  Add Card →
                </button>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visa Card */}
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg p-5 text-white relative">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-xl font-bold">$95, 400.00 USD</p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setCardMenuOpen(cardMenuOpen === 1 ? null : 1)
                        }
                      >
                        <MoreHorizontal size={20} />
                      </button>
                      {cardMenuOpen === 1 && (
                        <div className="absolute right-0 top-6 bg-white text-dark rounded shadow-lg w-32 z-10">
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-gray-50 text-left">
                            <Edit2 size={12} /> Edit Card
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-gray-50 text-left text-danger">
                            <Trash2 size={12} /> Delete Card
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-blue-200 mb-1">CARD NUMBER</p>
                  <p className="font-mono text-sm mb-6">**** **** **** 3814</p>
                  <div className="flex items-end justify-between">
                    <span className="font-bold italic text-lg">VISA</span>
                    <span className="text-sm">Kevin Gilbert</span>
                  </div>
                </div>

                {/* Mastercard */}
                <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-5 text-white relative">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-xl font-bold">$87, 583.00 USD</p>
                    </div>
                    <button
                      onClick={() =>
                        setCardMenuOpen(cardMenuOpen === 2 ? null : 2)
                      }
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                  <p className="text-xs text-green-100 mb-1">CARD NUMBER</p>
                  <p className="font-mono text-sm mb-6">**** **** **** 1761</p>
                  <div className="flex items-end justify-between">
                    <div className="flex gap-0">
                      <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                      <div className="w-6 h-6 bg-orange-400 rounded-full -ml-2 opacity-90"></div>
                    </div>
                    <span className="text-sm">Kevin Gilbert</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-gray-100 rounded-lg mb-6 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                  RECENT ORDER
                </h3>
                <Link
                  to="/order-history"
                  className="text-primary text-xs font-bold uppercase tracking-wide hover:underline"
                >
                  View All →
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs uppercase tracking-wider text-dark-300">
                    <tr>
                      <th className="px-5 py-3 text-left">ORDER ID</th>
                      <th className="px-5 py-3 text-left">STATUS</th>
                      <th className="px-5 py-3 text-left">DATE</th>
                      <th className="px-5 py-3 text-left">TOTAL</th>
                      <th className="px-5 py-3 text-left">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="px-5 py-4 text-dark">{order.id}</td>
                        <td className="px-5 py-4">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-4 text-dark-300">
                          {order.date}
                        </td>
                        <td className="px-5 py-4 text-dark">{order.total}</td>
                        <td className="px-5 py-4">
                          <Link
                            to="/order-details"
                            className="text-info text-xs font-medium hover:underline"
                          >
                            View Details →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Browsing History */}
            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                  BROWSING HISTORY
                </h3>
                <button className="text-primary text-xs font-bold uppercase tracking-wide hover:underline">
                  View All →
                </button>
              </div>
              <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                {browsingHistory.map((item, i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-lg p-3 relative"
                  >
                    {item.badge && (
                      <span
                        className={`absolute top-2 left-2 text-[9px] font-bold text-white px-2 py-0.5 rounded ${
                          item.badgeColor === "info" ? "bg-info" : "bg-primary"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <div className="aspect-square bg-gray-50 rounded flex items-center justify-center text-5xl mb-3">
                      {item.image}
                    </div>
                    <div className="flex text-warning text-xs mb-1">
                      {"★★★★★".split("").map((s, j) => (
                        <span
                          key={j}
                          className={
                            j < Math.round(item.rating)
                              ? "text-warning"
                              : "text-gray-200"
                          }
                        >
                          ★
                        </span>
                      ))}
                      <span className="text-dark-300 ml-1">
                        ({item.reviews})
                      </span>
                    </div>
                    <h4 className="text-xs text-dark line-clamp-2 mb-2 min-h-[32px]">
                      {item.name}
                    </h4>
                    <p className="text-info font-bold text-sm">${item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

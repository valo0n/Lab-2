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
  ArrowRight,
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

const allOrders = [
  {
    id: "#96459761",
    status: "IN PROGRESS",
    date: "Dec 30, 2019 07:52",
    total: "$80 (5 Products)",
  },
  {
    id: "#71667167",
    status: "COMPLETED",
    date: "Dec 7, 2019 23:26",
    total: "$70 (4 Products)",
  },
  {
    id: "#95214362",
    status: "CANCELED",
    date: "Dec 7, 2019 23:26",
    total: "$2,300 (2 Products)",
  },
  {
    id: "#71667167",
    status: "COMPLETED",
    date: "Feb 2, 2019 19:28",
    total: "$250 (1 Products)",
  },
  {
    id: "#51746385",
    status: "COMPLETED",
    date: "Dec 30, 2019 07:52",
    total: "$360 (2 Products)",
  },
  {
    id: "#51746385",
    status: "CANCELED",
    date: "Dec 4, 2019 21:42",
    total: "$220 (7 Products)",
  },
  {
    id: "#673971743",
    status: "COMPLETED",
    date: "Feb 2, 2019 19:28",
    total: "$80 (1 Products)",
  },
  {
    id: "#673971743",
    status: "COMPLETED",
    date: "Mar 20, 2019 23:14",
    total: "$160 (1 Products)",
  },
  {
    id: "#673971743",
    status: "COMPLETED",
    date: "Dec 4, 2019 21:42",
    total: "$1,500 (3 Products)",
  },
  {
    id: "#673971743",
    status: "COMPLETED",
    date: "Dec 30, 2019 07:52",
    total: "$1,200 (19 Products)",
  },
  {
    id: "#673971743",
    status: "CANCELED",
    date: "Dec 30, 2019 05:18",
    total: "$1,500 (1 Products)",
  },
  {
    id: "#673971743",
    status: "COMPLETED",
    date: "Dec 30, 2019 07:52",
    total: "$80 (1 Products)",
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

export default function OrderHistoryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = 6;

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
          <span className="text-info font-medium">Order History</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-white rounded-lg border border-gray-100 overflow-hidden h-fit">
            <nav className="flex flex-col py-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.name === "Order History";
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
            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100">
                <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                  ORDER HISTORY
                </h3>
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
                    {allOrders.map((order, i) => (
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

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 py-6">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="w-9 h-9 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  ←
                </button>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCurrentPage(n)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      n === currentPage
                        ? "bg-primary text-white"
                        : "text-dark hover:bg-gray-50"
                    }`}
                  >
                    {String(n).padStart(2, "0")}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  className="w-9 h-9 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  →
                </button>
              </div>
            </div>

            {/* In Progress card below */}
            <div className="mt-6 bg-white border border-gray-100 rounded-lg p-5 flex items-center justify-between">
              <div>
                <span className="inline-block bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded mb-2">
                  IN PROGRESS
                </span>
                <h4 className="font-bold text-dark mb-1">
                  Order ID: <span className="text-info">#71667167</span>
                </h4>
                <p className="text-xs text-dark-300 mb-1">
                  Dec 7, 2019 23:26 • 2 Products
                </p>
                <p className="text-info font-bold text-sm">$160.00 USD</p>
              </div>
              <Link
                to="/order-details"
                className="w-10 h-10 border border-primary text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

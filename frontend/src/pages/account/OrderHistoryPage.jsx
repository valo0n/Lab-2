import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminPanelLink from "../../components/common/AdminPanelLink";
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
} from "lucide-react";
import TopBar from "../../components/Layout/TopBar";
import Header from "../../components/Layout/Header";
import Navigation from "../../components/Layout/Navigation";
import Footer from "../../components/Layout/Footer";
import { orderService } from "../../services/orderService";

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

function StatusBadge({ status }) {
  const colors = {
    "IN PROGRESS": "text-warning",
    PENDING: "text-warning",
    PROCESSING: "text-warning",
    SHIPPED: "text-info",
    COMPLETED: "text-success",
    DELIVERED: "text-success",
    CANCELED: "text-danger",
    CANCELLED: "text-danger",
  };
  return (
    <span
      className={`text-xs font-semibold ${colors[status] || "text-gray-500"}`}
    >
      {status}
    </span>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function OrderHistoryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const result = await orderService.getMyOrders(currentPage, 12);
        setOrders(result.data || []);
        setTotalPages(result.meta?.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentPage]);

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

  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 6) },
    (_, i) => i + 1,
  );

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
              <AdminPanelLink />
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
                    {loading ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-5 py-8 text-center text-dark-300"
                        >
                          Duke ngarkuar...
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-5 py-8 text-center text-dark-300"
                        >
                          Ende s'ka porosi
                        </td>
                      </tr>
                    ) : (
                      orders.map((order, i) => (
                        <tr key={i} className="border-t border-gray-100">
                          <td className="px-5 py-4 text-dark">{order.id}</td>
                          <td className="px-5 py-4">
                            <StatusBadge status={order.status} />
                          </td>
                          <td className="px-5 py-4 text-dark-300">
                            {formatDate(order.date)}
                          </td>
                          <td className="px-5 py-4 text-dark">
                            ${order.total} ({order.productCount} Products)
                          </td>
                          <td className="px-5 py-4">
                            <Link
                              to={`/order-details?id=${order.orderNumber}`}
                              className="text-info text-xs font-medium hover:underline"
                            >
                              View Details →
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {orders.length > 0 && (
                <div className="flex items-center justify-center gap-2 py-6">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className="w-9 h-9 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    ←
                  </button>
                  {pageNumbers.map((n) => (
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
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

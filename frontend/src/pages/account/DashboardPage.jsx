import { useState, useEffect } from "react";
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
import { userService } from "../../services/userService";
import { authService } from "../../services/authService";

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

// Browsing history mbetet statike (do lidhet me MongoDB me vone)
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
    PENDING: "text-warning",
    COMPLETED: "text-success",
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

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cardMenuOpen, setCardMenuOpen] = useState(null);

  // Backend data
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const result = await userService.getDashboard();
        setDashboardData(result.data);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Fallback values nese s'ka te dhena
  const user = dashboardData?.user || {};
  const stats = dashboardData?.stats || { total: 0, pending: 0, completed: 0 };
  const recentOrders = dashboardData?.recentOrders || [];
  const cards = dashboardData?.cards || [];

  const displayName = currentUser?.name || user.name || "User";
  const displayEmail = currentUser?.email || user.email || "";
  const initials = displayName
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

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
            <h1 className="text-2xl font-bold text-dark mb-2">
              Hello, {displayName}
            </h1>
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
                      {initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-dark">{displayName}</h4>
                      <p className="text-xs text-dark-300">
                        {user.city || user.country
                          ? `${user.city || ""}${user.city && user.country ? ", " : ""}${user.country || ""}`
                          : "—"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <p>
                      <span className="text-dark-300">Email:</span>{" "}
                      <span className="text-dark">{displayEmail}</span>
                    </p>
                    <p>
                      <span className="text-dark-300">Phone:</span>{" "}
                      <span className="text-dark">{user.phone || "—"}</span>
                    </p>
                  </div>
                  <Link
                    to="/settings"
                    className="inline-block mt-4 text-info text-xs font-bold uppercase tracking-wide hover:underline"
                  >
                    EDIT ACCOUNT
                  </Link>
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
                  <h4 className="font-bold text-dark mb-2">{displayName}</h4>
                  <p className="text-xs text-dark-300 mb-4 leading-relaxed">
                    {user.addresses && user.addresses.length > 0
                      ? user.addresses[0].street ||
                        `${user.addresses[0].city || ""}, ${user.addresses[0].country || ""}`
                      : "Ende s'ka adrese te ruajtur"}
                  </p>
                  <div className="space-y-2 text-xs mb-4">
                    <p>
                      <span className="text-dark-300">Phone Number:</span>{" "}
                      <span className="text-dark">{user.phone || "—"}</span>
                    </p>
                    <p>
                      <span className="text-dark-300">Email:</span>{" "}
                      <span className="text-dark">{displayEmail}</span>
                    </p>
                  </div>
                  <Link
                    to="/cards-address"
                    className="inline-block text-info text-xs font-bold uppercase tracking-wide hover:underline"
                  >
                    EDIT ADDRESS
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-info">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dark">
                      {stats.total}
                    </div>
                    <p className="text-xs text-dark-300">Total Orders</p>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dark">
                      {String(stats.pending).padStart(2, "0")}
                    </div>
                    <p className="text-xs text-dark-300">Pending Orders</p>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-success">
                    <Package size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dark">
                      {stats.completed}
                    </div>
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
                <Link
                  to="/cards-address"
                  className="text-primary text-xs font-bold uppercase tracking-wide hover:underline flex items-center gap-1"
                >
                  Add Card →
                </Link>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.length === 0 ? (
                  <div className="md:col-span-2 text-center py-8 text-dark-300 text-sm">
                    Ende s'ka karta te ruajtura.{" "}
                    <Link
                      to="/cards-address"
                      className="text-primary hover:underline"
                    >
                      Shto nje karte
                    </Link>
                  </div>
                ) : (
                  cards.map((card, i) => {
                    const isVisa = card.brand === "visa";
                    return (
                      <div
                        key={card.card_id || i}
                        className={`rounded-lg p-5 text-white relative ${
                          isVisa
                            ? "bg-gradient-to-br from-blue-700 to-blue-900"
                            : "bg-gradient-to-br from-green-500 to-green-700"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <p className="text-xl font-bold">
                              {card.holder_name}
                            </p>
                          </div>
                          <div className="relative">
                            <button
                              onClick={() =>
                                setCardMenuOpen(cardMenuOpen === i ? null : i)
                              }
                            >
                              <MoreHorizontal size={20} />
                            </button>
                            {cardMenuOpen === i && (
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
                        <p
                          className={`text-xs mb-1 ${isVisa ? "text-blue-200" : "text-green-100"}`}
                        >
                          CARD NUMBER
                        </p>
                        <p className="font-mono text-sm mb-6">
                          **** **** **** {card.last_four}
                        </p>
                        <div className="flex items-end justify-between">
                          {isVisa ? (
                            <span className="font-bold italic text-lg">
                              VISA
                            </span>
                          ) : (
                            <div className="flex gap-0">
                              <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                              <div className="w-6 h-6 bg-orange-400 rounded-full -ml-2 opacity-90"></div>
                            </div>
                          )}
                          <span className="text-sm">{card.holder_name}</span>
                        </div>
                      </div>
                    );
                  })
                )}
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
                    {recentOrders.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-5 py-8 text-center text-dark-300"
                        >
                          {loading ? "Duke ngarkuar..." : "Ende s'ka porosi"}
                        </td>
                      </tr>
                    ) : (
                      recentOrders.map((order, i) => (
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
                              to="/order-details"
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
            </div>

            {/* Browsing History */}
            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                  BROWSING HISTORY
                </h3>
                <Link
                  to="/browsing-history"
                  className="text-primary text-xs font-bold uppercase tracking-wide hover:underline"
                >
                  View All →
                </Link>
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

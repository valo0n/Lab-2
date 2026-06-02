import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  ArrowLeft,
  Plus,
  FileText,
  Package,
  Truck,
  Handshake,
} from "lucide-react";
import TopBar from "../../components/Layout/TopBar";
import Header from "../../components/Layout/Header";
import Navigation from "../../components/Layout/Navigation";
import Footer from "../../components/Layout/Footer";
import RatingModal from "../../components/account/RatingModal";
import api from "../../services/api";

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

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getCurrentStep(status) {
  const s = (status || "").toLowerCase();
  if (s === "pending") return 0;
  if (s === "processing") return 1;
  if (s === "shipped") return 2;
  if (s === "delivered" || s === "completed") return 3;
  return 0;
}

export default function OrderDetailsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("id");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderNumber) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await api.get(`/orders/track/${orderNumber}`);
        if (res.data.success) {
          setOrder(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderNumber]);

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

  const currentStep = getCurrentStep(order?.status);
  const items = order?.items || [];
  const billing = order?.billing_address;
  const shipping = order?.shipping_address;

  const steps = [
    { label: "Order Placed", icon: FileText },
    { label: "Packaging", icon: Package },
    { label: "On The Road", icon: Truck },
    { label: "Delivered", icon: Handshake },
  ];

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
          <Link
            to="/order-history"
            className="text-dark-300 hover:text-primary"
          >
            Order History
          </Link>
          <ChevronRight size={14} className="text-dark-300" />
          <span className="text-info font-medium">Order Details</span>
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
          <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link
                  to="/order-history"
                  className="text-dark-300 hover:text-primary"
                >
                  <ArrowLeft size={18} />
                </Link>
                <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                  ORDER DETAILS
                </h3>
              </div>
              <button
                onClick={() => setRatingOpen(true)}
                className="text-primary text-xs font-bold uppercase tracking-wide hover:underline flex items-center gap-1"
              >
                Leave a Rating <Plus size={12} />
              </button>
            </div>

            <div className="p-5">
              {loading ? (
                <div className="text-center py-12 text-dark-300">
                  Duke ngarkuar...
                </div>
              ) : !order ? (
                <div className="text-center py-12 text-dark-300">
                  Porosia s'u gjet. Kthehu te{" "}
                  <Link
                    to="/order-history"
                    className="text-primary hover:underline"
                  >
                    Order History
                  </Link>
                  .
                </div>
              ) : (
                <>
                  {/* Order Summary */}
                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold text-dark mb-1">
                        #{order.order_number}
                      </h2>
                      <p className="text-xs text-dark-300">
                        {items.length} Products • Order Placed in{" "}
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-info">
                      ${parseFloat(order.total).toFixed(2)}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mt-8 mb-6">
                    <p className="text-sm text-dark mb-6">
                      Status:{" "}
                      <span className="font-bold uppercase">
                        {order.status}
                      </span>
                    </p>
                    <div className="relative">
                      <div className="absolute top-5 left-10 right-10 h-1 bg-gray-100"></div>
                      <div
                        className="absolute top-5 left-10 h-1 bg-primary transition-all"
                        style={{ width: `${(currentStep / 3) * 80}%` }}
                      ></div>
                      <div className="grid grid-cols-4 gap-2 relative">
                        {steps.map((step, i) => {
                          const Icon = step.icon;
                          const done = i <= currentStep;
                          return (
                            <div key={i} className="flex flex-col items-center">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm mb-2 relative z-10 ${
                                  done
                                    ? "bg-primary text-white"
                                    : "bg-white border-2 border-gray-200 text-gray-300"
                                }`}
                              >
                                {done ? "✓" : "•"}
                              </div>
                              <Icon
                                size={20}
                                className={`mb-1 ${done ? "text-primary" : "text-dark-300"}`}
                              />
                              <p
                                className={`text-xs font-medium text-center ${done ? "text-dark" : "text-dark-300"}`}
                              >
                                {step.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <h4 className="font-bold text-dark mb-4">
                      Product{" "}
                      <span className="text-dark-300 font-normal">
                        ({String(items.length).padStart(2, "0")})
                      </span>
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-dark-300">
                          <tr>
                            <th className="px-4 py-3 text-left">PRODUCTS</th>
                            <th className="px-4 py-3 text-left">PRICE</th>
                            <th className="px-4 py-3 text-left">QUANTITY</th>
                            <th className="px-4 py-3 text-left">SUB-TOTAL</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, i) => (
                            <tr key={i} className="border-t border-gray-100">
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center text-2xl flex-shrink-0">
                                    📦
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs text-dark line-clamp-2">
                                      {item.product_name}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-dark">
                                ${parseFloat(item.unit_price).toFixed(2)}
                              </td>
                              <td className="px-4 py-4 text-dark">
                                x{item.quantity}
                              </td>
                              <td className="px-4 py-4 text-dark font-medium">
                                ${parseFloat(item.total_price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="border-t border-gray-100 pt-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-dark mb-3">
                        Billing Address
                      </h4>
                      {billing ? (
                        <>
                          <h5 className="text-sm font-bold text-dark mb-2">
                            {billing.full_name}
                          </h5>
                          <p className="text-xs text-dark-300 mb-3 leading-relaxed">
                            {billing.street}, {billing.city}, {billing.zip_code}
                            , {billing.country}
                          </p>
                          <p className="text-xs text-dark-300">
                            Phone Number:{" "}
                            <span className="text-dark">
                              {billing.phone || "—"}
                            </span>
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-dark-300">
                          S'ka adrese faturimi
                        </p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-dark mb-3">Order Notes</h4>
                      <p className="text-xs text-dark-300 leading-relaxed">
                        {order.notes || "S'ka shenime per kete porosi."}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <RatingModal
        isOpen={ratingOpen}
        onClose={() => setRatingOpen(false)}
        orderId={order?.order_number || ""}
      />
      <Footer />
    </div>
  );
}

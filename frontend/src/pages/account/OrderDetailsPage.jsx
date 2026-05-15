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
  ArrowLeft,
  Plus,
  FileText,
  Package,
  Truck,
  Handshake,
  CheckCircle2,
  User,
  Map as MapIcon,
  CheckCheck,
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

const orderProducts = [
  {
    category: "SMARTPHONE",
    name: "Google Pixel 6 Pro - 5G Android Phone - Unlocked Smartphone with Advanced Pixel C...",
    price: 899,
    quantity: 1,
    subtotal: 899,
    image: "📱",
  },
  {
    category: "ACCESSORIES",
    name: "Tech21 Evo Clear for Google Pixel 6 Pro – Crystal Clear Phone Case with 12ft Multi-Dr...",
    price: 39,
    quantity: 1,
    subtotal: 39,
    image: "📦",
  },
];

const orderActivity = [
  {
    icon: CheckCheck,
    color: "text-success bg-green-50",
    text: "Your order has been delivered. Thank you for shopping at Clicon!",
    time: "23 Jan, 2021 at 7:32 PM",
  },
  {
    icon: User,
    color: "text-info bg-blue-50",
    text: "Our delivery man (John Wick) Has picked-up your order for delivery.",
    time: "23 Jan, 2021 at 2:00 PM",
  },
  {
    icon: MapPin,
    color: "text-info bg-blue-50",
    text: "Your order has reached at last mile hub.",
    time: "22 Jan, 2021 at 8:00 AM",
  },
  {
    icon: MapIcon,
    color: "text-info bg-blue-50",
    text: "Your order on the way to (last mile) hub.",
    time: "21, 2021 at 5:32 AM",
  },
  {
    icon: CheckCircle2,
    color: "text-success bg-green-50",
    text: "Your order is successfully verified.",
    time: "20 Jan, 2021 at 7:32 PM",
  },
  {
    icon: FileText,
    color: "text-info bg-blue-50",
    text: "Your order has been confirmed.",
    time: "19 Jan, 2021 at 2:61 PM",
  },
];

export default function OrderDetailsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

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
            {/* Header */}
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
              <button className="text-primary text-xs font-bold uppercase tracking-wide hover:underline flex items-center gap-1">
                Leave a Rating <Plus size={12} />
              </button>
            </div>

            {/* Order Summary Card */}
            <div className="p-5">
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-dark mb-1">
                    #96459761
                  </h2>
                  <p className="text-xs text-dark-300">
                    4 Products • Order Placed in 17 Jan, 2021 at 7:32 PM
                  </p>
                </div>
                <div className="text-2xl font-bold text-info">$1199.00</div>
              </div>

              {/* Order Progress Timeline */}
              <div className="mt-8 mb-6">
                <p className="text-sm text-dark mb-6">
                  Order expected arrival{" "}
                  <span className="font-bold">23 Jan, 2021</span>
                </p>
                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute top-5 left-10 right-10 h-1 bg-gray-100"></div>
                  <div
                    className="absolute top-5 left-10 h-1 bg-primary"
                    style={{ width: "25%" }}
                  ></div>

                  {/* Steps */}
                  <div className="grid grid-cols-4 gap-2 relative">
                    {/* Step 1 — Order Placed (completed) */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm mb-2 relative z-10">
                        ✓
                      </div>
                      <FileText size={20} className="text-success mb-1" />
                      <p className="text-xs font-medium text-dark text-center">
                        Order Placed
                      </p>
                    </div>

                    {/* Step 2 — Packaging (current) */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm mb-2 relative z-10">
                        •
                      </div>
                      <Package size={20} className="text-primary mb-1" />
                      <p className="text-xs font-medium text-dark text-center">
                        Packaging
                      </p>
                    </div>

                    {/* Step 3 — On The Road */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-300 text-sm mb-2 relative z-10">
                        •
                      </div>
                      <Truck size={20} className="text-dark-300 mb-1" />
                      <p className="text-xs font-medium text-dark-300 text-center">
                        On The Road
                      </p>
                    </div>

                    {/* Step 4 — Delivered */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-300 text-sm mb-2 relative z-10">
                        •
                      </div>
                      <Handshake size={20} className="text-dark-300 mb-1" />
                      <p className="text-xs font-medium text-dark-300 text-center">
                        Delivered
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Activity */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-bold text-dark mb-4">Order Activity</h4>
                <div className="space-y-4">
                  {orderActivity.map((activity, i) => {
                    const Icon = activity.icon;
                    return (
                      <div key={i} className="flex gap-3">
                        <div
                          className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 ${activity.color}`}
                        >
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="text-sm text-dark">{activity.text}</p>
                          <p className="text-xs text-dark-300 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Products */}
              <div className="border-t border-gray-100 pt-6 mt-6">
                <h4 className="font-bold text-dark mb-4">
                  Product{" "}
                  <span className="text-dark-300 font-normal">
                    ({String(orderProducts.length).padStart(2, "0")})
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
                      {orderProducts.map((product, i) => (
                        <tr key={i} className="border-t border-gray-100">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center text-2xl flex-shrink-0">
                                {product.image}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-info uppercase tracking-wide mb-1">
                                  {product.category}
                                </p>
                                <p className="text-xs text-dark line-clamp-2">
                                  {product.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-dark">
                            ${product.price}
                          </td>
                          <td className="px-4 py-4 text-dark">
                            x{product.quantity}
                          </td>
                          <td className="px-4 py-4 text-dark font-medium">
                            ${product.subtotal}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Addresses */}
              <div className="border-t border-gray-100 pt-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-dark mb-3">Billing Address</h4>
                  <h5 className="text-sm font-bold text-dark mb-2">
                    Kevin Gilbert
                  </h5>
                  <p className="text-xs text-dark-300 mb-3 leading-relaxed">
                    East Tejturi Bazar, Word No. 04, Road No.
                    <br />
                    13/x, House no. 1320/C, Flat No. 5D, Dhaka -<br />
                    1200, Bangladesh
                  </p>
                  <p className="text-xs text-dark-300">
                    Phone Number:{" "}
                    <span className="text-dark">+1-202-555-0118</span>
                  </p>
                  <p className="text-xs text-dark-300">
                    Email:{" "}
                    <span className="text-dark">kevin.gilbert@gmail.com</span>
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-3">Shipping Address</h4>
                  <h5 className="text-sm font-bold text-dark mb-2">
                    Kevin Gilbert
                  </h5>
                  <p className="text-xs text-dark-300 mb-3 leading-relaxed">
                    East Tejturi Bazar, Word No. 04, Road No.
                    <br />
                    13/x, House no. 1320/C, Flat No. 5D, Dhaka -<br />
                    1200, Bangladesh
                  </p>
                  <p className="text-xs text-dark-300">
                    Phone Number:{" "}
                    <span className="text-dark">+1-202-555-0118</span>
                  </p>
                  <p className="text-xs text-dark-300">
                    Email:{" "}
                    <span className="text-dark">kevin.gilbert@gmail.com</span>
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-3">Order Notes</h4>
                  <p className="text-xs text-dark-300 leading-relaxed">
                    Donec ac vehicula turpis. Aenean sagittis est eu arcu
                    ornare, eget venenatis purus lobortis. Aliquam erat
                    volutpat. Aliquam magna odio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

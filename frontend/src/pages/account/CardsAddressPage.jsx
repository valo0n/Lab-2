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
  MoreHorizontal,
  Edit2,
  Trash2,
  Copy,
} from "lucide-react";
import TopBar from "../../components/Layout/TopBar";
import Header from "../../components/Layout/Header";
import Navigation from "../../components/Layout/Navigation";
import Footer from "../../components/Layout/Footer";
import AddCardModal from "../../components/account/AddCardModal";

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

export default function CardsAddressPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
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
          <span className="text-info font-medium">Cards & Address</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-white rounded-lg border border-gray-100 overflow-hidden h-fit">
            <nav className="flex flex-col py-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.name === "Cards & Address";
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

          <div className="space-y-6">
            {/* Payment Option */}
            <div className="bg-white border border-gray-100 rounded-lg">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                  PAYMENT OPTION
                </h3>
                <button
                  onClick={() => setAddCardOpen(true)}
                  className="text-primary text-xs font-bold uppercase tracking-wide hover:underline flex items-center gap-1"
                >
                  Add Card →
                </button>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visa */}
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg p-5 text-white relative">
                  <div className="flex items-start justify-between mb-6">
                    <p className="text-xl font-bold">$95, 400.00 USD</p>
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
                  <div className="flex items-center gap-2 mb-6">
                    <p className="font-mono text-sm">**** **** **** 3814</p>
                    <Copy
                      size={14}
                      className="text-blue-200 cursor-pointer hover:text-white"
                    />
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="font-bold italic text-lg">VISA</span>
                    <span className="text-sm">Kevin Gilbert</span>
                  </div>
                </div>

                {/* Mastercard */}
                <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-5 text-white relative">
                  <div className="flex items-start justify-between mb-6">
                    <p className="text-xl font-bold">$87, 583.00 USD</p>
                    <button
                      onClick={() =>
                        setCardMenuOpen(cardMenuOpen === 2 ? null : 2)
                      }
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                  <p className="text-xs text-green-100 mb-1">CARD NUMBER</p>
                  <div className="flex items-center gap-2 mb-6">
                    <p className="font-mono text-sm">**** **** **** 1761</p>
                    <Copy
                      size={14}
                      className="text-green-100 cursor-pointer hover:text-white"
                    />
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex">
                      <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                      <div className="w-6 h-6 bg-orange-400 rounded-full -ml-2 opacity-90"></div>
                    </div>
                    <span className="text-sm">Kevin Gilbert</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-100 rounded-lg">
                <div className="px-5 py-3 border-b border-gray-100">
                  <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                    BILLING ADDRESS
                  </h3>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-dark mb-3">Kevin Gilbert</h4>
                  <p className="text-xs text-dark-300 mb-4 leading-relaxed">
                    East Tejturi Bazar, Word No. 04, Road No. 13/x, House no.
                    1320/C, Flat No. 5D, Dhaka -1200, Bangladesh
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
                  <button className="border border-info text-info text-xs font-bold uppercase tracking-wide px-4 py-2 rounded hover:bg-info hover:text-white transition-colors">
                    EDIT ADDRESS
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-lg">
                <div className="px-5 py-3 border-b border-gray-100">
                  <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                    SHIPPING ADDRESS
                  </h3>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-dark mb-3">Kevin Gilbert</h4>
                  <p className="text-xs text-dark-300 mb-4 leading-relaxed">
                    East Tejturi Bazar, Word No. 04, Road No. 13/x, House no.
                    1320/C, Flat No. 5D, Dhaka -1200, Bangladesh
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
                  <button className="border border-info text-info text-xs font-bold uppercase tracking-wide px-4 py-2 rounded hover:bg-info hover:text-white transition-colors">
                    EDIT ADDRESS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <AddCardModal
        isOpen={addCardOpen}
        onClose={() => setAddCardOpen(false)}
      />
    </div>
  );
}

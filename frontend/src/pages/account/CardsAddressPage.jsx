import { useState, useEffect, useCallback } from "react";
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
  MoreHorizontal,
  Trash2,
  Copy,
  Plus,
} from "lucide-react";
import TopBar from "../../components/Layout/TopBar";
import Header from "../../components/Layout/Header";
import Navigation from "../../components/Layout/Navigation";
import Footer from "../../components/Layout/Footer";
import AddCardModal from "../../components/account/AddCardModal";
import AddressModal from "../../components/account/AddressModal";
import { userService } from "../../services/userService";

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

const KNOWN_BRANDS = ["visa", "mastercard", "amex", "discover"];
// Brand-et e panjohur (p.sh. "other") trajtohen si visa
const normalizeBrand = (brand) =>
  KNOWN_BRANDS.includes(brand) ? brand : "visa";

const cardGradient = (brand) => {
  switch (normalizeBrand(brand)) {
    case "visa":
      return "from-blue-700 to-blue-900";
    case "mastercard":
      return "from-green-500 to-green-700";
    case "amex":
      return "from-indigo-600 to-indigo-900";
    case "discover":
      return "from-orange-500 to-orange-700";
    default:
      return "from-blue-700 to-blue-900";
  }
};

export default function CardsAddressPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [cardMenuOpen, setCardMenuOpen] = useState(null);

  const [cards, setCards] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addressModal, setAddressModal] = useState({
    open: false,
    type: null,
    data: null,
  });

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

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [cardsRes, addrRes] = await Promise.all([
        userService.getCards(),
        userService.getAddresses(),
      ]);
      setCards(cardsRes.data || []);
      setAddresses(addrRes.data || []);
    } catch (err) {
      setError(
        "Nuk u ngarkuan të dhënat. Kontrollo që je i loguar dhe serveri po punon.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddCard = async ({ name, number, brand, expiry }) => {
    const res = await userService.addCard({ name, number, brand, expiry });
    setCards(res.data || []);
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm("Të fshihet kjo kartë?")) return;
    const res = await userService.deleteCard(cardId);
    setCards(res.data || []);
    setCardMenuOpen(null);
  };

  const billing = addresses.find((a) =>
    (a.label || "").toLowerCase().includes("bill"),
  );
  const shipping = addresses.find((a) =>
    (a.label || "").toLowerCase().includes("ship"),
  );

  const openAddress = (type) => {
    const data = type === "billing" ? billing : shipping;
    setAddressModal({ open: true, type, data: data || null });
  };

  const handleSaveAddress = async (form) => {
    const { type, data } = addressModal;
    const label = type === "billing" ? "Billing" : "Shipping";
    if (data?.id) {
      await userService.updateAddress(data.id, { ...form, label });
    } else {
      await userService.addAddress({ ...form, label });
    }
    await loadData();
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
              <AdminPanelLink />
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
            {error && (
              <div className="text-sm text-danger bg-red-50 border border-red-100 rounded px-4 py-3">
                {error}
              </div>
            )}

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

              <div className="p-5">
                {loading ? (
                  <p className="text-sm text-dark-300">
                    Duke ngarkuar kartat...
                  </p>
                ) : cards.length === 0 ? (
                  <button
                    onClick={() => setAddCardOpen(true)}
                    className="w-full border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center gap-2 text-dark-300 hover:border-primary hover:text-primary transition-colors"
                  >
                    <Plus size={24} />
                    <span className="text-sm font-medium">
                      Nuk ke asnjë kartë të ruajtur
                    </span>
                    <span className="text-xs">
                      Kliko për të shtuar një kartë
                    </span>
                  </button>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cards.map((card) => (
                      <div
                        key={card.card_id}
                        className={`bg-gradient-to-br ${cardGradient(card.brand)} rounded-lg p-5 text-white relative`}
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-2">
                            <span className="font-bold uppercase tracking-wide text-sm">
                              {normalizeBrand(card.brand)}
                            </span>
                            {card.is_default && (
                              <span className="text-[10px] bg-white/25 px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <button
                              onClick={() =>
                                setCardMenuOpen(
                                  cardMenuOpen === card.card_id
                                    ? null
                                    : card.card_id,
                                )
                              }
                              aria-label="Card options"
                            >
                              <MoreHorizontal size={20} />
                            </button>
                            {cardMenuOpen === card.card_id && (
                              <div className="absolute right-0 top-6 bg-white text-dark rounded shadow-lg w-32 z-10">
                                <button
                                  onClick={() => handleDeleteCard(card.card_id)}
                                  className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-gray-50 text-left text-danger"
                                >
                                  <Trash2 size={12} /> Delete Card
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-white/70 mb-1">
                          CARD NUMBER
                        </p>
                        <div className="flex items-center gap-2 mb-6">
                          <p className="font-mono text-sm">
                            **** **** **** {card.last_four}
                          </p>
                          <Copy
                            size={14}
                            className="text-white/70 cursor-pointer hover:text-white"
                            onClick={() =>
                              navigator.clipboard?.writeText(card.last_four)
                            }
                          />
                        </div>
                        <div className="flex items-end justify-between">
                          <span className="text-sm">{card.holder_name}</span>
                          <span className="text-xs text-white/80">
                            {String(card.exp_month).padStart(2, "0")}/
                            {String(card.exp_year).slice(-2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AddressCard
                title="BILLING ADDRESS"
                address={billing}
                loading={loading}
                onEdit={() => openAddress("billing")}
              />
              <AddressCard
                title="SHIPPING ADDRESS"
                address={shipping}
                loading={loading}
                onEdit={() => openAddress("shipping")}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <AddCardModal
        isOpen={addCardOpen}
        onClose={() => setAddCardOpen(false)}
        onAdd={handleAddCard}
      />

      <AddressModal
        isOpen={addressModal.open}
        onClose={() => setAddressModal({ open: false, type: null, data: null })}
        onSave={handleSaveAddress}
        address={addressModal.data}
        title={
          addressModal.type === "billing"
            ? "BILLING ADDRESS"
            : "SHIPPING ADDRESS"
        }
      />
    </div>
  );
}

function AddressCard({ title, address, loading, onEdit }) {
  return (
    <div className="bg-white border border-gray-100 rounded-lg">
      <div className="px-5 py-3 border-b border-gray-100">
        <h3 className="text-xs font-bold text-dark-300 tracking-wider">
          {title}
        </h3>
      </div>
      <div className="p-5">
        {loading ? (
          <p className="text-sm text-dark-300">Duke ngarkuar...</p>
        ) : address ? (
          <>
            <h4 className="font-bold text-dark mb-3">{address.full_name}</h4>
            <p className="text-xs text-dark-300 mb-4 leading-relaxed">
              {[
                address.street,
                address.city,
                address.state,
                address.zip_code,
                address.country,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
            <div className="space-y-2 text-xs mb-4">
              {address.phone && (
                <p>
                  <span className="text-dark-300">Phone Number:</span>{" "}
                  <span className="text-dark">{address.phone}</span>
                </p>
              )}
            </div>
            <button
              onClick={onEdit}
              className="border border-info text-info text-xs font-bold uppercase tracking-wide px-4 py-2 rounded hover:bg-info hover:text-white transition-colors"
            >
              EDIT ADDRESS
            </button>
          </>
        ) : (
          <>
            <p className="text-xs text-dark-300 mb-4">
              Nuk ka adresë të ruajtur.
            </p>
            <button
              onClick={onEdit}
              className="border border-info text-info text-xs font-bold uppercase tracking-wide px-4 py-2 rounded hover:bg-info hover:text-white transition-colors"
            >
              ADD ADDRESS
            </button>
          </>
        )}
      </div>
    </div>
  );
}

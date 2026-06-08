import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../services/authService";
import { userService } from "../../services/userService";
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
  Camera,
  Eye,
  EyeOff,
  Save,
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

function getPrimaryRole(user) {
  const roles = user?.roles || [];

  if (roles.includes("admin") || roles.includes("super_admin")) return "admin";
  if (roles.includes("manager")) return "manager";
  if (roles.includes("editor")) return "editor";
  if (roles.includes("support")) return "support";

  return "customer";
}

function getRoleDetails(role) {
  const roleDetails = {
    admin: {
      title: "Admin account",
      description: "You have full access to product, user, order, and system settings.",
      highlights: ["Manage users", "Update site settings", "Review orders and reports"],
    },
    manager: {
      title: "Manager account",
      description: "You can oversee catalog, orders, and operational settings.",
      highlights: ["Manage products and categories", "Handle orders", "Track performance"],
    },
    editor: {
      title: "Editor account",
      description: "You can update catalog content and keep product data clean.",
      highlights: ["Edit products", "Manage categories and brands", "Maintain content quality"],
    },
    support: {
      title: "Support account",
      description: "You can assist customers and monitor order-related issues.",
      highlights: ["Review orders", "Handle reviews", "Support customer requests"],
    },
    customer: {
      title: "Customer account",
      description: "You can manage your profile, orders, wishlist, and preferences.",
      highlights: ["Update profile", "Change password", "Manage notifications"],
    },
  };

  return roleDetails[role] || roleDetails.customer;
}

export default function SettingsPage() {
  const currentUser = authService.getCurrentUser();
  const primaryRole = getPrimaryRole(currentUser);
  const roleDetails = getRoleDetails(primaryRole);
  const displayName = currentUser?.name || "";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // Account form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const response = await userService.getProfile();
        const profile = response?.data || {};
        const primaryAddress =
          profile.addresses?.find((address) => address.is_default) ||
          profile.addresses?.[0] ||
          null;

        if (!isMounted) return;

        setFirstName(profile.first_name || "");
        setLastName(profile.last_name || "");
        setEmail(profile.email || currentUser?.email || "");
        setPhone(profile.phone || primaryAddress?.phone || "");
        setSecondaryEmail(profile.secondary_email || profile.secondaryEmail || "");
        setCountry(primaryAddress?.country || "");
        setState(primaryAddress?.state || "");
        setZipCode(primaryAddress?.zip_code || "");
      } catch (error) {
        if (!isMounted) return;

        setEmail(currentUser?.email || "");
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [currentUser?.email]);

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(true);

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

  const handleSaveAccount = (e) => {
    e.preventDefault();
    const normalize = (value) => {
      const trimmed = value.trim();
      return trimmed ? trimmed : null;
    };

    console.log("Account saved:", {
      firstName: normalize(firstName),
      lastName: normalize(lastName),
      email: normalize(email),
      secondaryEmail: normalize(secondaryEmail),
      phone: normalize(phone),
      country: normalize(country),
      state: normalize(state),
      zipCode: normalize(zipCode),
    });
    alert("Të dhënat e llogarisë u ruajtën!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwordet nuk përputhen!");
      return;
    }
    console.log("Password changed");
    alert("Password u ndryshua me sukses!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      onClick={onChange}
      className={`w-11 h-6 rounded-full relative transition-colors ${checked ? "bg-primary" : "bg-gray-200"}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
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
          <span className="text-info font-medium">Settings</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-white rounded-lg border border-gray-100 overflow-hidden h-fit">
            <nav className="flex flex-col py-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.name === "Setting";
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
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-dark via-dark-700 to-primary rounded-lg text-white p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">
                    Current role
                  </p>
                  <h2 className="text-2xl font-bold mb-2">{roleDetails.title}</h2>
                  <p className="text-sm text-white/80 max-w-2xl">
                    {roleDetails.description}
                  </p>
                </div>

                <div className="bg-white/10 border border-white/15 rounded-lg px-4 py-3 min-w-[220px]">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-2">
                    Signed in as
                  </p>
                  <p className="font-semibold">{displayName}</p>
                  <p className="text-sm text-white/75">{currentUser?.email || email}</p>
                  <span className="inline-flex mt-3 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    {primaryRole}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                {roleDetails.highlights.map((item) => (
                  <div key={item} className="rounded-lg bg-white/10 px-4 py-3 text-sm text-white/90">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white border border-gray-100 rounded-lg">
              <div className="px-5 py-3 border-b border-gray-100">
                <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                  ACCOUNT SETTINGS
                </h3>
              </div>

              <form onSubmit={handleSaveAccount} className="p-5">
                {/* Profile picture */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="relative">
                    <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center text-primary font-bold text-2xl">
                      {firstName || lastName ? (
                        <>
                          {firstName?.charAt(0)?.toUpperCase() || ""}
                          {lastName?.charAt(0)?.toUpperCase() || ""}
                        </>
                      ) : (
                        <Camera size={20} />
                      )}
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                      aria-label="Change photo"
                    >
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark mb-1">
                      Profile Picture
                    </h4>
                    <p className="text-xs text-dark-300">
                      JPG, PNG ose GIF. Madhësia max 2MB.
                    </p>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-semibold text-dark mb-2 block">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dark mb-2 block">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-semibold text-dark mb-2 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dark mb-2 block">
                      Secondary Email
                    </label>
                    <input
                      type="email"
                      value={secondaryEmail}
                      onChange={(e) => setSecondaryEmail(e.target.value)}
                      className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-semibold text-dark mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dark mb-2 block">
                      Country/Region
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    >
                      <option value="" disabled>
                        Select country
                      </option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Kosovo">Kosovo</option>
                      <option value="Albania">Albania</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-xs font-semibold text-dark mb-2 block">
                      State
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dark mb-2 block">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-600 text-white font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wide transition-colors flex items-center gap-2"
                >
                  <Save size={14} /> Save Changes
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className="bg-white border border-gray-100 rounded-lg">
              <div className="px-5 py-3 border-b border-gray-100">
                <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                  CHANGE PASSWORD
                </h3>
              </div>

              <form onSubmit={handleChangePassword} className="p-5">
                <div className="space-y-4 mb-5">
                  <div>
                    <label className="text-xs font-semibold text-dark mb-2 block">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-300 hover:text-dark"
                      >
                        {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-dark mb-2 block">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-300 hover:text-dark"
                      >
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-dark mb-2 block">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-300 hover:text-dark"
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-600 text-white font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wide transition-colors"
                >
                  Change Password
                </button>
              </form>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white border border-gray-100 rounded-lg">
              <div className="px-5 py-3 border-b border-gray-100">
                <h3 className="text-xs font-bold text-dark-300 tracking-wider">
                  NOTIFICATION PREFERENCES
                </h3>
              </div>

              <div className="p-5 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-dark mb-1">
                      Email Notifications
                    </h4>
                    <p className="text-xs text-dark-300">
                      Merr njoftime në email për aktivitetin e llogarisë
                    </p>
                  </div>
                  <Toggle
                    checked={emailNotif}
                    onChange={() => setEmailNotif(!emailNotif)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-dark mb-1">
                      SMS Notifications
                    </h4>
                    <p className="text-xs text-dark-300">
                      Merr njoftime me SMS për porositë
                    </p>
                  </div>
                  <Toggle
                    checked={smsNotif}
                    onChange={() => setSmsNotif(!smsNotif)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-dark mb-1">
                      Order Updates
                    </h4>
                    <p className="text-xs text-dark-300">
                      Lajmërime për statusin e porosive
                    </p>
                  </div>
                  <Toggle
                    checked={orderUpdates}
                    onChange={() => setOrderUpdates(!orderUpdates)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-dark mb-1">
                      Promotions & Deals
                    </h4>
                    <p className="text-xs text-dark-300">
                      Oferta speciale dhe zbritje
                    </p>
                  </div>
                  <Toggle
                    checked={promotions}
                    onChange={() => setPromotions(!promotions)}
                  />
                </div>
              </div>
            </div>

            {/* Delete Account */}
            <div className="bg-white border border-danger/20 rounded-lg">
              <div className="px-5 py-3 border-b border-danger/20 bg-danger/5">
                <h3 className="text-xs font-bold text-danger tracking-wider">
                  DELETE ACCOUNT
                </h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-dark mb-2 font-semibold">
                  A jeni i sigurt që doni të fshini llogarinë tuaj?
                </p>
                <p className="text-xs text-dark-300 mb-4">
                  Pas fshirjes, të gjitha të dhënat tuaja do të humbasin
                  përgjithmonë. Ky veprim nuk mund të anulohet.
                </p>
                <button className="border border-danger text-danger hover:bg-danger hover:text-white text-xs font-bold uppercase tracking-wide px-6 py-2.5 rounded transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tags,
  Award,
  ShoppingBag,
  Users,
  Ticket,
  Star,
  Settings,
  LogOut,
  Store,
} from "lucide-react";
import { getUserRole, getMenuForRole } from "./adminMenu";
import { authService } from "../../services/authService";

const iconMap = {
  LayoutDashboard,
  Package,
  Tags,
  Award,
  ShoppingBag,
  Users,
  Ticket,
  Star,
  Settings,
};

// Grupimi i menu-së në seksione (encodes strukturën e panelit)
const SECTIONS = [
  { label: null, paths: ["/admin"] },
  {
    label: "Katalogu",
    paths: ["/admin/products", "/admin/categories", "/admin/brands"],
  },
  {
    label: "Shitjet",
    paths: ["/admin/orders", "/admin/coupons", "/admin/reviews"],
  },
  { label: "Sistemi", paths: ["/admin/users", "/admin/settings"] },
];

export default function AdminLayout({ children, title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const role = getUserRole();
  const menu = getMenuForRole(role);
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const initials = (user?.name || "A U")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const today = new Date().toLocaleDateString("sq-AL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Ndaj menu-në e filtruar sipas rolit nëpër seksione
  const grouped = SECTIONS.map((s) => ({
    label: s.label,
    items: s.paths.map((p) => menu.find((m) => m.path === p)).filter(Boolean),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar — navy i brandit Clicon */}
      <aside className="w-64 bg-accent-navy flex flex-col fixed h-full text-white">
        <div className="px-6 py-5 flex items-center gap-2.5 border-b border-white/10">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-extrabold text-white text-lg">
            C
          </div>
          <div className="leading-tight">
            <p className="font-extrabold tracking-wide">CLICON</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
              Admin Panel
            </p>
          </div>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {grouped.map((group, gi) => (
            <div key={gi} className="mb-1">
              {group.label && (
                <p className="px-6 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                  {group.label}
                </p>
              )}
              {group.items.map((item) => {
                const Icon = iconMap[item.icon];
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-3 px-6 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-white/10 text-white font-semibold"
                        : "text-white/65 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {/* shirit portokalli për item-in aktiv */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-primary" />
                    )}
                    {Icon && (
                      <Icon
                        size={17}
                        className={isActive ? "text-primary" : ""}
                      />
                    )}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <Link
          to="/"
          className="flex items-center gap-3 px-6 py-3 text-sm text-white/65 hover:text-white hover:bg-white/5 border-t border-white/10 transition-colors"
        >
          <Store size={17} /> Kthehu te dyqani
        </Link>

        <div className="px-5 py-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-extrabold">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-[10px] uppercase tracking-wider text-primary font-bold">
              {role}
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Dil"
            className="text-white/50 hover:text-danger transition-colors"
          >
            <LogOut size={17} />
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 ml-64">
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-lg font-bold text-dark">{title}</h1>
          <span className="text-xs text-dark-300 capitalize">{today}</span>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
  
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

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full">
        <div className="px-6 py-5 border-b border-gray-100">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="font-bold text-dark text-lg">Clicon Admin</span>
          </Link>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {menu.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-dark-300 hover:bg-gray-50 hover:text-dark"
                }`}
              >
                {Icon && <Icon size={18} />}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t border-gray-100">
          <div className="mb-3">
            <p className="text-sm font-semibold text-dark">{user?.name}</p>
            <span className="text-[10px] bg-primary-50 text-primary px-2 py-0.5 rounded font-bold uppercase">
              {role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-danger hover:underline"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 ml-64">
        <header className="bg-white border-b border-gray-100 px-8 py-4">
          <h1 className="text-xl font-bold text-dark">{title}</h1>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

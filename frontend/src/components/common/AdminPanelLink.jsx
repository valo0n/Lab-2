import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

// Link drejt panelit admin — shfaqet VETËM nëse useri ka rolin Admin
export default function AdminPanelLink() {
  let isAdmin = false;
  try {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    isAdmin = (user.roles || []).some((r) => r.toLowerCase() === "admin");
  } catch (_) {}

  if (!isAdmin) return null;

  return (
    <Link
      to="/admin"
      className="flex items-center gap-3 px-6 py-3 text-sm font-bold transition-colors bg-amber-50 text-primary hover:bg-amber-100 border-b border-gray-100"
    >
      <LayoutDashboard size={18} />
      Admin Panel
    </Link>
  );
}

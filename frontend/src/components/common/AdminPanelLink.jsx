import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

// Rolet staf që kanë qasje në panel (customer-i JO)
const STAFF_ROLES = ["admin", "manager", "editor", "support"];

// Link drejt panelit — shfaqet vetëm për rolet staf, jo për customer
export default function AdminPanelLink() {
  let roles = [];
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    roles = (user.roles || []).map((r) => r.toLowerCase());
  } catch (_) {}

  const isStaff = roles.some((r) => STAFF_ROLES.includes(r));
  if (!isStaff) return null;

  const label = roles.includes("admin") ? "Admin Panel" : "Staff Panel";

  return (
    <Link
      to="/admin"
      className="flex items-center gap-3 px-6 py-3 text-sm font-bold transition-colors bg-amber-50 text-primary hover:bg-amber-100 border-b border-gray-100"
    >
      <LayoutDashboard size={18} />
      {label}
    </Link>
  );
}

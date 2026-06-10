// Konfigurimi i menu-se per cdo rol
// Cdo item ka: emrin, path, ikonen, dhe rolet qe e shohin

export const adminMenuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: "LayoutDashboard",
    roles: ["admin", "manager", "editor", "support"],
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: "Package",
    roles: ["admin", "manager", "editor"],
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: "Tags",
    roles: ["admin", "manager", "editor"],
  },
  {
    name: "Brands",
    path: "/admin/brands",
    icon: "Award",
    roles: ["admin", "manager", "editor"],
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: "ShoppingBag",
    roles: ["admin", "manager", "support"],
  },
  { name: "Users", path: "/admin/users", icon: "Users", roles: ["admin"] },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: "Ticket",
    roles: ["admin", "manager"],
  },
  {
    name: "Reviews",
    path: "/admin/reviews",
    icon: "Star",
    roles: ["admin", "manager", "support"],
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: "Settings",
    roles: ["admin"],
  },
];

// Merr rolin kryesor te userit (i pari nga lista)
export function getUserRole() {
  try {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const roles = (user.roles || []).map((r) => r.toLowerCase());
    if (roles.includes("admin") || roles.includes("super_admin"))
      return "admin";
    if (roles.includes("manager")) return "manager";
    if (roles.includes("editor")) return "editor";
    if (roles.includes("support")) return "support";
    return "customer";
  } catch {
    return "customer";
  }
}

// Filtro menu sipas rolit
export function getMenuForRole(role) {
  return adminMenuItems.filter((item) => item.roles.includes(role));
}

import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { getUserRole } from "./adminMenu";
import api from "../../services/api";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const role = getUserRole();
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, orders] = await Promise.all([
          api.get("/products").catch(() => ({ data: { data: [] } })),
          api.get("/orders/admin/all").catch(() => ({ data: { data: [] } })),
        ]);
        const orderList = orders.data?.data || [];
        const revenue = orderList.reduce(
          (sum, o) => sum + parseFloat(o.total || 0),
          0,
        );
        setStats({
          products: products.data?.data?.length || 0,
          orders: orderList.length,
          users: 0,
          revenue,
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Products",
      value: stats.products,
      icon: Package,
      color: "bg-blue-50 text-blue-500",
    },
    {
      label: "Total Orders",
      value: stats.orders,
      icon: ShoppingBag,
      color: "bg-orange-50 text-orange-500",
    },
    {
      label: "Revenue",
      value: `$${stats.revenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-green-50 text-green-500",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="mb-6">
        <p className="text-dark-300">
          Mirë se erdhe! Roli yt:{" "}
          <span className="text-primary font-bold uppercase">{role}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="bg-white rounded-lg border border-gray-100 p-6 flex items-center gap-4"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${c.color}`}
              >
                <Icon size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-dark">{c.value}</p>
                <p className="text-sm text-dark-300">{c.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <h3 className="font-bold text-dark mb-2">
          Çfarë mund të bësh me rolin "{role}":
        </h3>
        <ul className="text-sm text-dark-300 space-y-1 list-disc list-inside">
          {role === "admin" && (
            <>
              <li>Menaxho produkte, kategori, brande</li>
              <li>Menaxho porositë dhe statusin</li>
              <li>Menaxho përdoruesit dhe settings</li>
              <li>Menaxho kuponë dhe reviews</li>
            </>
          )}
          {role === "manager" && (
            <>
              <li>Menaxho produkte, kategori, brande</li>
              <li>Menaxho porositë dhe statusin</li>
              <li>Menaxho kuponë dhe reviews</li>
            </>
          )}
          {role === "editor" && (
            <>
              <li>Menaxho produkte, kategori, brande</li>
              <li>(S'ke qasje te porositë ose përdoruesit)</li>
            </>
          )}
          {role === "support" && (
            <>
              <li>Shiko dhe përditëso porositë</li>
              <li>Menaxho reviews</li>
              <li>(S'ke qasje te produktet ose përdoruesit)</li>
            </>
          )}
        </ul>
      </div>
    </AdminLayout>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SiteLayout from "../../components/common/SiteLayout";
import { authService } from "../../services/authService";
import { userService } from "../../services/userService";

const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return `$${amount.toFixed(2)}`;
};

export default function CustomerPage() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await userService.getDashboard();
        setDashboard(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load customer data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const currentUser = authService.getCurrentUser();
  const user = dashboard?.user || {};
  const recentOrders = dashboard?.recentOrders || [];
  const cards = dashboard?.cards || [];
  const browsing = dashboard?.browsing || [];
  const displayName = user.name || currentUser?.name || "Customer";
  const displayEmail = user.email || currentUser?.email || "—";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    authService.logout();
    navigate("/signin");
  };

  return (
    <SiteLayout
      title="Customer Dashboard"
      subtitle="Manage your orders, account details, and support requests."
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Customer" },
      ]}
    >
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
            Loading customer dashboard...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        ) : (
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                {initials || "CU"}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{displayName}</p>
                <p className="text-sm text-gray-500">{displayEmail}</p>
              </div>
            </div>

            <div className="my-5 border-t border-gray-200" />

            <nav className="space-y-2 text-sm">
              {[
                "Overview",
                "My Orders",
                "Wishlist",
                "Address Book",
                "Payment Methods",
                "Support Tickets",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`w-full rounded-md px-3 py-2 text-left transition ${
                    item === "Overview"
                      ? "bg-sky-50 font-semibold text-sky-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-6 w-full rounded-md border border-red-200 px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Sign out
            </button>
          </aside>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{dashboard?.stats?.total || 0}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Pending Orders</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{dashboard?.stats?.pending || 0}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Completed Orders</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{dashboard?.stats?.completed || 0}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Saved Cards</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{cards.length}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Recent Browsed Items</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{browsing.length}</p>
              </div>
            </div>

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-5 py-3">Order ID</th>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3">Total</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length ? recentOrders.map((order) => (
                      <tr key={order.id} className="border-t border-gray-200">
                        <td className="px-5 py-4 font-medium text-gray-900">{order.id}</td>
                        <td className="px-5 py-4 text-gray-600">{formatDate(order.date)}</td>
                        <td className="px-5 py-4 text-gray-600">{formatCurrency(order.total)}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              String(order.status).toUpperCase() === "COMPLETED"
                                ? "bg-green-50 text-green-600"
                                : String(order.status).toUpperCase() === "PENDING"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-blue-50 text-blue-600"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td className="px-5 py-4 text-sm text-gray-500" colSpan={4}>
                          No recent orders yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Billing & Browsing</h2>
              </div>
              <div className="grid gap-4 p-5 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Saved Cards</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {cards.length ? `${cards.length} saved payment method(s)` : "No cards saved yet."}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Recent Browsing</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {browsing.length ? `${browsing.length} recently viewed item(s)` : "No browsing history yet."}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        )}
      </section>
    </SiteLayout>
  );
}

import SiteLayout from "../../components/common/SiteLayout";

const recentOrders = [
  { id: "#CL-3021", date: "Apr 18, 2026", total: "$489.00", status: "Delivered" },
  { id: "#CL-3014", date: "Apr 12, 2026", total: "$129.00", status: "Shipped" },
  { id: "#CL-3002", date: "Apr 05, 2026", total: "$910.00", status: "Processing" },
];

export default function CustomerPage() {
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
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                JD
              </div>
              <div>
                <p className="font-semibold text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
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
          </aside>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">38</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Pending Orders</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">3</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Reward Points</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">1,280</p>
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
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-t border-gray-200">
                        <td className="px-5 py-4 font-medium text-gray-900">{order.id}</td>
                        <td className="px-5 py-4 text-gray-600">{order.date}</td>
                        <td className="px-5 py-4 text-gray-600">{order.total}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              order.status === "Delivered"
                                ? "bg-green-50 text-green-600"
                                : order.status === "Shipped"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

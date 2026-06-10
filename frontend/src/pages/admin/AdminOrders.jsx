import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import api from "../../services/api";
import DataToolbar from "../../components/common/DataToolbar";

const STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
];

const statusColor = (s) => {
  const v = (s || "").toLowerCase();
  if (["delivered", "confirmed"].includes(v)) return "text-green-600";
  if (["shipped"].includes(v)) return "text-blue-600";
  if (["pending", "processing"].includes(v)) return "text-amber-600";
  if (["cancelled", "returned"].includes(v)) return "text-red-600";
  return "text-dark-300";
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/orders/admin/all");
      setOrders(res.data?.data || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Nuk u ngarkuan porositë. A je i loguar si admin/manager?",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (id, status) => {
    setSavingId(id);
    try {
      await api.put(`/orders/${id}/status`, { status });
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o)),
      );
    } catch (err) {
      alert(err?.response?.data?.message || "Statusi nuk u përditësua.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <AdminLayout title="Orders">
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-dark-300 tracking-wider">
            TË GJITHA POROSITË
          </h3>
          <button
            onClick={load}
            className="text-primary text-xs font-bold uppercase hover:underline"
          >
            Rifresko
          </button>
          <DataToolbar entity="orders" />
        </div>

        {error && (
          <div className="m-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <p className="p-6 text-sm text-dark-300">Duke ngarkuar porositë...</p>
        ) : orders.length === 0 ? (
          <p className="p-6 text-sm text-dark-300">Nuk ka porosi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs text-dark-300 uppercase tracking-wide">
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Klienti</th>
                  <th className="px-5 py-3">Data</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Statusi</th>
                  <th className="px-5 py-3">Ndrysho statusin</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-gray-50">
                    <td className="px-5 py-3 font-medium text-dark">
                      #{o.order_number}
                    </td>
                    <td className="px-5 py-3 text-dark-300">
                      {o.user
                        ? `${o.user.first_name} ${o.user.last_name}`
                        : `User #${o.user_id}`}
                    </td>
                    <td className="px-5 py-3 text-dark-300">
                      {new Date(o.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-dark">
                      ${Number(o.total).toFixed(2)}
                    </td>
                    <td
                      className={`px-5 py-3 font-bold uppercase text-xs ${statusColor(o.status)}`}
                    >
                      {o.status}
                    </td>
                    <td className="px-5 py-3">
                      <select
                        value={(o.status || "").toLowerCase()}
                        disabled={savingId === o.id}
                        onChange={(e) => changeStatus(o.id, e.target.value)}
                        className="border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-primary bg-white disabled:opacity-50"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

import { useEffect, useState } from "react";
import { Trash2, Check, Star } from "lucide-react";
import AdminLayout from "./AdminLayout";
import api from "../../services/api";

export default function AdminReviews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/reviews");
      setItems(res.data?.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Nuk u ngarkuan review-et.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    try {
      await api.put(`/reviews/${id}/approve`);
      setItems((prev) =>
        prev.map((r) => (r.id === id ? { ...r, is_approved: true } : r)),
      );
    } catch (err) {
      alert(err?.response?.data?.message || "Nuk u aprovua.");
    }
  };

  const remove = async (id) => {
    if (!confirm("Fshi këtë review?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      setItems((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || "Nuk u fshi.");
    }
  };

  return (
    <AdminLayout title="Reviews">
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-dark-300 tracking-wider">
            REVIEW-ET ({items.length})
          </h3>
          <button
            onClick={load}
            className="text-primary text-xs font-bold uppercase hover:underline"
          >
            Rifresko
          </button>
        </div>

        {error && (
          <div className="m-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <p className="p-6 text-sm text-dark-300">Duke ngarkuar...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-dark-300">Nuk ka review.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs text-dark-300 uppercase">
                  <th className="px-5 py-3">Produkti</th>
                  <th className="px-5 py-3">Klienti</th>
                  <th className="px-5 py-3">Vlerësimi</th>
                  <th className="px-5 py-3">Koment</th>
                  <th className="px-5 py-3">Statusi</th>
                  <th className="px-5 py-3 text-right">Veprime</th>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => (
                  <tr key={r.id} className="border-t border-gray-50">
                    <td className="px-5 py-3 text-dark max-w-[200px] truncate">
                      {r.product?.name || `#${r.product_id}`}
                    </td>
                    <td className="px-5 py-3 text-dark-300">
                      {r.user
                        ? `${r.user.first_name} ${r.user.last_name}`
                        : `#${r.user_id}`}
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1 text-amber-500">
                        <Star size={14} fill="currentColor" />
                        {r.rating}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-dark-300 max-w-[280px] truncate">
                      {r.comment || "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-bold uppercase ${r.is_approved ? "text-green-600" : "text-amber-600"}`}
                      >
                        {r.is_approved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {!r.is_approved && (
                          <button
                            onClick={() => approve(r.id)}
                            className="text-dark-300 hover:text-green-600"
                            title="Aprovo"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => remove(r.id)}
                          className="text-dark-300 hover:text-red-600"
                          title="Fshi"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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

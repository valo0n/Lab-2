import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import api from "../../services/api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      // limit i lartë që admin t'i shohë të gjitha produktet
      const res = await api.get("/products", { params: { limit: 100 } });
      setProducts(res.data?.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Nuk u ngarkuan produktet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const imgUrl = (p) => {
    const u = p.images?.[0]?.image_url;
    if (!u) return null;
    return /^https?:/.test(u) ? u : `http://localhost:5000${u}`;
  };

  return (
    <AdminLayout title="Products">
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold text-dark-300 tracking-wider">
            TË GJITHA PRODUKTET ({products.length})
          </h3>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kërko produkt..."
            className="border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary w-56"
          />
        </div>

        {error && (
          <div className="m-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <p className="p-6 text-sm text-dark-300">Duke ngarkuar...</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-sm text-dark-300">Nuk ka produkte.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs text-dark-300 uppercase tracking-wide">
                  <th className="px-5 py-3">Produkti</th>
                  <th className="px-5 py-3">Kategoria</th>
                  <th className="px-5 py-3">Brandi</th>
                  <th className="px-5 py-3">Çmimi</th>
                  <th className="px-5 py-3">Stoku</th>
                  <th className="px-5 py-3">Statusi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {imgUrl(p) ? (
                            <img
                              src={imgUrl(p)}
                              alt={p.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-xs text-dark-300">—</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-dark truncate max-w-[260px]">
                            {p.name}
                          </p>
                          {p.sku && (
                            <p className="text-xs text-dark-300">
                              SKU: {p.sku}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-dark-300">
                      {p.category?.name || "—"}
                    </td>
                    <td className="px-5 py-3 text-dark-300">
                      {p.brand?.name || "—"}
                    </td>
                    <td className="px-5 py-3 text-dark">
                      ${Number(p.price).toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-dark-300">{p.stock_qty}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-bold uppercase ${p.is_active ? "text-green-600" : "text-red-600"}`}
                      >
                        {p.is_active ? "Active" : "Inactive"}
                      </span>
                      {p.is_featured && (
                        <span className="ml-2 text-xs text-amber-600">
                          ★ Featured
                        </span>
                      )}
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

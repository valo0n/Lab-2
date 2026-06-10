import { useEffect, useState } from "react";
import { Trash2, Pencil, Plus, X } from "lucide-react";
import AdminLayout from "./AdminLayout";
import api from "../../services/api";

const empty = {
  code: "",
  type: "percentage",
  value: "",
  min_order: "",
  usage_limit: "",
  is_active: true,
};

export default function AdminCoupons() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/coupons");
      setItems(res.data?.data || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Nuk u ngarkuan kuponët. A je i loguar si admin/manager?",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setForm(empty);
    setEditId(null);
    setShowForm(true);
  };
  const openEdit = (c) => {
    setForm({
      code: c.code,
      type: c.type,
      value: c.value,
      min_order: c.min_order ?? "",
      usage_limit: c.usage_limit ?? "",
      is_active: c.is_active,
    });
    setEditId(c.id);
    setShowForm(true);
  };

  const save = async () => {
    if (!form.code.trim() || form.value === "") return;
    setSaving(true);
    try {
      if (editId) await api.put(`/coupons/${editId}`, form);
      else await api.post("/coupons", form);
      setShowForm(false);
      await load();
    } catch (err) {
      alert(err?.response?.data?.message || "Nuk u ruajt.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Fshi këtë kupon?")) return;
    try {
      await api.delete(`/coupons/${id}`);
      setItems((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || "Nuk u fshi.");
    }
  };

  const inputCls =
    "w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary";

  return (
    <AdminLayout title="Coupons">
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-dark-300 tracking-wider">
            KUPONËT ({items.length})
          </h3>
          <button
            onClick={openAdd}
            className="flex items-center gap-1 bg-primary text-white text-xs font-bold uppercase px-3 py-2 rounded hover:bg-primary/90"
          >
            <Plus size={14} /> Shto
          </button>
        </div>

        {showForm && (
          <div className="m-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold">
                {editId ? "Edito kuponin" : "Kupon i ri"}
              </h4>
              <button onClick={() => setShowForm(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-dark-300 mb-1">Kodi</label>
                <input
                  value={form.code}
                  onChange={(e) =>
                    setForm({ ...form, code: e.target.value.toUpperCase() })
                  }
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs text-dark-300 mb-1">Tipi</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className={inputCls}
                >
                  <option value="percentage">Përqindje (%)</option>
                  <option value="fixed">Fikse ($)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-dark-300 mb-1">
                  Vlera ({form.type === "percentage" ? "%" : "$"})
                </label>
                <input
                  type="number"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs text-dark-300 mb-1">
                  Min. porosia ($)
                </label>
                <input
                  type="number"
                  value={form.min_order}
                  onChange={(e) =>
                    setForm({ ...form, min_order: e.target.value })
                  }
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs text-dark-300 mb-1">
                  Limit përdorimi
                </label>
                <input
                  type="number"
                  value={form.usage_limit}
                  onChange={(e) =>
                    setForm({ ...form, usage_limit: e.target.value })
                  }
                  className={inputCls}
                  placeholder="bosh = pa limit"
                />
              </div>
              <label className="flex items-center gap-2 text-sm self-end pb-2">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm({ ...form, is_active: e.target.checked })
                  }
                />
                Aktiv
              </label>
            </div>
            <button
              onClick={save}
              disabled={saving}
              className="mt-3 bg-primary text-white text-sm font-bold px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
            >
              {saving ? "Duke ruajtur..." : "Ruaj"}
            </button>
          </div>
        )}

        {error && (
          <div className="m-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <p className="p-6 text-sm text-dark-300">Duke ngarkuar...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs text-dark-300 uppercase">
                  <th className="px-5 py-3">Kodi</th>
                  <th className="px-5 py-3">Zbritja</th>
                  <th className="px-5 py-3">Min.</th>
                  <th className="px-5 py-3">Përdorime</th>
                  <th className="px-5 py-3">Statusi</th>
                  <th className="px-5 py-3 text-right">Veprime</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr key={c.id} className="border-t border-gray-50">
                    <td className="px-5 py-3 font-bold text-dark">{c.code}</td>
                    <td className="px-5 py-3 text-dark-300">
                      {c.type === "percentage"
                        ? `${Number(c.value)}%`
                        : `$${Number(c.value)}`}
                    </td>
                    <td className="px-5 py-3 text-dark-300">
                      ${Number(c.min_order)}
                    </td>
                    <td className="px-5 py-3 text-dark-300">
                      {c.times_used}
                      {c.usage_limit ? ` / ${c.usage_limit}` : ""}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-bold uppercase ${c.is_active ? "text-green-600" : "text-red-600"}`}
                      >
                        {c.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="text-dark-300 hover:text-primary"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => remove(c.id)}
                          className="text-dark-300 hover:text-red-600"
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

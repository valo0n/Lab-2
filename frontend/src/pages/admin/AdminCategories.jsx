import { useEffect, useState } from "react";
import { Trash2, Pencil, Plus, X } from "lucide-react";
import AdminLayout from "./AdminLayout";
import api from "../../services/api";

const empty = { name: "", is_active: true };

export default function AdminCategories() {
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
      const res = await api.get("/categories");
      setItems(res.data?.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Nuk u ngarkuan kategoritë.");
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
    setForm({ name: c.name, is_active: c.is_active });
    setEditId(c.id);
    setShowForm(true);
  };

  const save = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/categories/${editId}`, form);
      } else {
        await api.post("/categories", form);
      }
      setShowForm(false);
      await load();
    } catch (err) {
      alert(err?.response?.data?.message || "Nuk u ruajt.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Fshi këtë kategori?")) return;
    try {
      await api.delete(`/categories/${id}`);
      setItems((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || "Nuk u fshi.");
    }
  };

  return (
    <AdminLayout title="Categories">
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-dark-300 tracking-wider">
            KATEGORITË ({items.length})
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
                {editId ? "Edito kategorinë" : "Kategori e re"}
              </h4>
              <button onClick={() => setShowForm(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs text-dark-300 mb-1">Emri</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <label className="flex items-center gap-2 text-sm pb-2">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm({ ...form, is_active: e.target.checked })
                  }
                />
                Aktive
              </label>
              <button
                onClick={save}
                disabled={saving}
                className="bg-primary text-white text-sm font-bold px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
              >
                {saving ? "Duke ruajtur..." : "Ruaj"}
              </button>
            </div>
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
                  <th className="px-5 py-3">Emri</th>
                  <th className="px-5 py-3">Slug</th>
                  <th className="px-5 py-3">Produkte</th>
                  <th className="px-5 py-3">Statusi</th>
                  <th className="px-5 py-3 text-right">Veprime</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr key={c.id} className="border-t border-gray-50">
                    <td className="px-5 py-3 font-medium text-dark">
                      {c.name}
                    </td>
                    <td className="px-5 py-3 text-dark-300">{c.slug}</td>
                    <td className="px-5 py-3 text-dark-300">
                      {c._count?.products ?? "—"}
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

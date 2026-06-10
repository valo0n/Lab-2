import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import api from "../../services/api";

export default function AdminSettings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [drafts, setDrafts] = useState({});
  const [savingKey, setSavingKey] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/settings");
      const data = res.data?.data || [];
      setItems(data);
      setDrafts(
        data.reduce((acc, s) => ({ ...acc, [s.key_name]: s.value ?? "" }), {}),
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Nuk u ngarkuan settings. A je i loguar si admin?",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (key) => {
    setSavingKey(key);
    try {
      await api.put(`/settings/${key}`, { value: drafts[key] });
      setItems((prev) =>
        prev.map((s) =>
          s.key_name === key ? { ...s, value: drafts[key] } : s,
        ),
      );
    } catch (err) {
      alert(err?.response?.data?.message || "Nuk u ruajt.");
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <AdminLayout title="Settings">
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h3 className="text-xs font-bold text-dark-300 tracking-wider">
            KONFIGURIMET E SISTEMIT
          </h3>
        </div>

        {error && (
          <div className="m-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <p className="p-6 text-sm text-dark-300">Duke ngarkuar...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-dark-300">Nuk ka konfigurime.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {items.map((s) => {
              const changed = drafts[s.key_name] !== (s.value ?? "");
              return (
                <div
                  key={s.key_name}
                  className="px-5 py-4 flex flex-wrap items-end gap-3"
                >
                  <div className="flex-1 min-w-[220px]">
                    <label className="block text-sm font-bold text-dark">
                      {s.key_name}
                    </label>
                    {s.description && (
                      <p className="text-xs text-dark-300">{s.description}</p>
                    )}
                  </div>
                  <input
                    value={drafts[s.key_name] ?? ""}
                    onChange={(e) =>
                      setDrafts({ ...drafts, [s.key_name]: e.target.value })
                    }
                    className="flex-1 min-w-[220px] border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={() => save(s.key_name)}
                    disabled={!changed || savingKey === s.key_name}
                    className="bg-primary text-white text-sm font-bold px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-40"
                  >
                    {savingKey === s.key_name ? "..." : "Ruaj"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

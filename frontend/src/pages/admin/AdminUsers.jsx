import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import api from "../../services/api";
import DataToolbar from "../../components/common/DataToolbar";

const roleColor = (r) => {
  const v = (r || "").toLowerCase();
  if (v === "admin") return "bg-primary/10 text-primary";
  if (v === "manager") return "bg-blue-50 text-blue-600";
  if (v === "editor") return "bg-purple-50 text-purple-600";
  if (v === "support") return "bg-amber-50 text-amber-600";
  return "bg-gray-100 text-dark-300";
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/users/admin/all");
      setUsers(res.data?.data || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Nuk u ngarkuan userat. A je i loguar si admin?",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = users.filter(
    (u) =>
      `${u.first_name} ${u.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout title="Users">
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold text-dark-300 tracking-wider">
            USERAT E REGJISTRUAR ({users.length})
          </h3>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kërko user..."
            className="border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary w-56"
          />
          <DataToolbar entity="users" canImport onImported={load} />
        </div>

        {error && (
          <div className="m-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <p className="p-6 text-sm text-dark-300">Duke ngarkuar...</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-sm text-dark-300">Nuk ka usera.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs text-dark-300 uppercase tracking-wide">
                  <th className="px-5 py-3">Emri</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Rolet</th>
                  <th className="px-5 py-3">Statusi</th>
                  <th className="px-5 py-3">Regjistruar</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-t border-gray-50">
                    <td className="px-5 py-3 font-medium text-dark">
                      {u.first_name} {u.last_name}
                    </td>
                    <td className="px-5 py-3 text-dark-300">{u.email}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {u.roles.length ? (
                          u.roles.map((r) => (
                            <span
                              key={r}
                              className={`text-xs font-bold px-2 py-0.5 rounded ${roleColor(r)}`}
                            >
                              {r}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-dark-300">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-bold uppercase ${u.is_active ? "text-green-600" : "text-red-600"}`}
                      >
                        {u.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-dark-300">
                      {new Date(u.created_at).toLocaleDateString()}
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

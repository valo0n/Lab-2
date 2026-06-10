import { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Toolbar Export (CSV/Excel/JSON) + Import (CSV/Excel/JSON) për listat admin.
// Përdorimi: <DataToolbar entity="products" canImport onImported={reload} />
export default function DataToolbar({ entity, canImport = false, onImported }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState("");

  const token = sessionStorage.getItem("token");

  const doExport = async (format) => {
    setBusy(format);
    try {
      const url = `${API_URL}/export/${entity}?format=${format}${format === "json" ? "&download=1" : ""}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        alert(d.message || "Export-i dështoi.");
        return;
      }
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${entity}-${new Date().toISOString().slice(0, 10)}.${format === "xlsx" ? "xlsx" : format}`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (_) {
      alert("Export-i dështoi.");
    } finally {
      setBusy("");
    }
  };

  const doImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy("import");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${API_URL}/import/${entity}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.success !== false) {
        alert(`U importuan ${d.data?.imported ?? 0} rreshta.`);
        onImported?.();
      } else {
        alert(d.message || "Import-i dështoi.");
      }
    } catch (_) {
      alert("Import-i dështoi.");
    } finally {
      setBusy("");
      e.target.value = "";
    }
  };

  const btn =
    "flex items-center gap-1 text-xs font-bold uppercase px-2.5 py-1.5 rounded border border-gray-200 text-dark-300 hover:border-primary hover:text-primary disabled:opacity-50";

  return (
    <div className="flex items-center gap-1.5">
      <span className="hidden sm:flex items-center gap-1 text-[10px] uppercase tracking-wider text-dark-300 mr-1">
        <Download size={12} /> Export
      </span>
      {["csv", "xlsx", "json"].map((f) => (
        <button
          key={f}
          onClick={() => doExport(f)}
          disabled={!!busy}
          className={btn}
        >
          {busy === f ? "..." : f === "xlsx" ? "Excel" : f.toUpperCase()}
        </button>
      ))}
      {canImport && (
        <>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={!!busy}
            className={`${btn} ml-2 border-primary/40 text-primary`}
          >
            <Upload size={12} /> {busy === "import" ? "..." : "Import"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.xlsx,.xls,.json"
            onChange={doImport}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}

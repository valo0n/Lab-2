import { useState, useEffect } from "react";
import { X } from "lucide-react";

const empty = {
  full_name: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zip_code: "",
  country: "",
};

export default function AddressModal({
  isOpen,
  onClose,
  onSave,
  address,
  title,
}) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (address) {
      setForm({
        full_name: address.full_name || "",
        phone: address.phone || "",
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        zip_code: address.zip_code || "",
        country: address.country || "",
      });
    } else {
      setForm(empty);
    }
    setError("");
  }, [address, isOpen]);

  if (!isOpen) return null;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (
      !form.full_name ||
      !form.street ||
      !form.city ||
      !form.zip_code ||
      !form.country
    ) {
      setError(
        "Plotëso fushat e detyrueshme (emri, rruga, qyteti, zip, shteti).",
      );
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Diçka shkoi keq. Provo përsëri.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-dark-300 tracking-wider">
            {title || "ADDRESS"}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-dark-300 hover:text-dark"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 text-xs text-danger bg-red-50 border border-red-100 rounded px-3 py-2">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <Field
            label="Full Name *"
            value={form.full_name}
            onChange={set("full_name")}
          />
          <Field
            label="Phone Number"
            value={form.phone}
            onChange={set("phone")}
          />
          <Field
            label="Street *"
            value={form.street}
            onChange={set("street")}
          />
          <div className="grid grid-cols-2 gap-3">
            <Field label="City *" value={form.city} onChange={set("city")} />
            <Field label="State" value={form.state} onChange={set("state")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Zip Code *"
              value={form.zip_code}
              onChange={set("zip_code")}
            />
            <Field
              label="Country *"
              value={form.country}
              onChange={set("country")}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-5 bg-primary hover:bg-primary-600 text-white font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wide transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Address"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-dark mb-1.5 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
      />
    </div>
  );
}

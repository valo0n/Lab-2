import { useState } from "react";
import { X } from "lucide-react";

export default function AddCardModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [brand, setBrand] = useState("visa");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const reset = () => {
    setName("");
    setNumber("");
    setBrand("visa");
    setExpiry("");
    setCvc("");
    setError("");
  };

  const handleSubmit = async () => {
    if (!name || !number || !expiry) {
      setError("Plotëso emrin, numrin dhe datën e skadimit.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (onAdd) await onAdd({ name, number, brand, expiry, cvc });
      reset();
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Karta nuk u shtua. Provo përsëri.",
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
        className="bg-white rounded-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-dark-300 tracking-wider">
            ADD NEW CARD
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

        <div className="mb-4">
          <label className="text-sm text-dark mb-2 block">Name on Card</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-dark mb-2 block">Card Number</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="**** **** **** ****"
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-dark mb-2 block">Card Type</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-white"
          >
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="amex">American Express</option>
            <option value="discover">Discover</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-sm text-dark mb-2 block">Expire Date</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm text-dark mb-2 block">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="***"
              className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-primary hover:bg-primary-600 text-white font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wide transition-colors disabled:opacity-60"
        >
          {saving ? "Adding..." : "Add Card"}
        </button>
      </div>
    </div>
  );
}

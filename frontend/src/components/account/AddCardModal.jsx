import { useState } from "react";
import { X } from "lucide-react";

export default function AddCardModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (onAdd) onAdd({ name, number, expiry, cvc });
    setName("");
    setNumber("");
    setExpiry("");
    setCvc("");
    onClose();
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
          className="bg-primary hover:bg-primary-600 text-white font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wide transition-colors"
        >
          Add Card
        </button>
      </div>
    </div>
  );
}

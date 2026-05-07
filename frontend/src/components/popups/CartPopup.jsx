import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartPopup({ isOpen, onClose }) {
  const { cartItems, removeFromCart, cartTotal, cartCount } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="absolute top-full right-0 mt-2 w-[340px] bg-white rounded-lg shadow-2xl border border-gray-100 z-50 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-dark">
            Shopping Cart{" "}
            <span className="text-dark-300 font-normal">
              ({String(cartCount).padStart(2, "0")})
            </span>
          </h3>
        </div>

        <div className="max-h-[280px] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-dark-300">
              Karta është bosh
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 px-4 py-3 border-b border-gray-100 last:border-0"
              >
                <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center text-2xl flex-shrink-0">
                  {item.image}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs text-dark line-clamp-2 mb-1 leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-xs text-dark-300">
                    {item.qty} ×{" "}
                    <span className="text-primary font-semibold">
                      ${item.price.toLocaleString()}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.name)}
                  aria-label="Remove"
                  className="text-dark-300 hover:text-danger flex-shrink-0"
                >
                  <FiX size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-dark-300">Sub-Total:</span>
            <span className="text-sm font-bold text-dark">
              ${cartTotal.toFixed(2)} USD
            </span>
          </div>
          <Link
            to="/checkout"
            onClick={onClose}
            className="block w-full bg-primary hover:bg-primary-600 text-white text-xs font-bold py-2.5 rounded mb-2 transition-colors text-center"
          >
            CHECKOUT NOW →
          </Link>
          <Link
            to="/cart"
            onClick={onClose}
            className="block w-full border border-gray-200 text-primary hover:bg-gray-50 text-xs font-bold py-2.5 rounded transition-colors text-center"
          >
            VIEW CART
          </Link>
        </div>
      </div>
    </>
  );
}

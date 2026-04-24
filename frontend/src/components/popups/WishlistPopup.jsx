import { FiX, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const wishlistItems = [
  { id: 1, name: 'Canon EOS 1500D DSLR Camera Body+ 18-55 mm', price: 1500, image: '📷' },
  { id: 2, name: 'Simple Mobile 5G LTE Galexy 12 Mini 512GB', price: 269, image: '📱' },
  { id: 3, name: 'Sony DSCHX8 High Zoom Point & Shoot Camera', price: 2300, image: '📹' },
];

export default function WishlistPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="absolute top-full right-0 mt-2 w-[340px] bg-white rounded-lg shadow-2xl border border-gray-100 z-50 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-dark">
            My Wishlist <span className="text-dark-300 font-normal">({String(wishlistItems.length).padStart(2, '0')})</span>
          </h3>
        </div>

        {/* Items */}
        <div className="max-h-[280px] overflow-y-auto">
          {wishlistItems.map(item => (
            <div key={item.id} className="flex items-start gap-3 px-4 py-3 border-b border-gray-100 last:border-0">
              <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center text-2xl flex-shrink-0">
                {item.image}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs text-dark line-clamp-2 mb-1 leading-snug">{item.name}</h4>
                <p className="text-primary font-semibold text-xs">${item.price.toLocaleString()}</p>
              </div>
              <button aria-label="Remove" className="text-dark-300 hover:text-danger flex-shrink-0">
                <FiX size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100">
          <button className="w-full bg-primary hover:bg-primary-600 text-white text-xs font-bold py-2.5 rounded mb-2 transition-colors flex items-center justify-center gap-2">
            <FiShoppingCart size={14} />
            ADD ALL TO CART
          </button>
          <Link
            to="/wishlist"
            onClick={onClose}
            className="block w-full border border-gray-200 text-primary hover:bg-gray-50 text-xs font-bold py-2.5 rounded transition-colors"
          >
            VIEW WISHLIST
          </Link>
        </div>
      </div>
    </>
  );
}

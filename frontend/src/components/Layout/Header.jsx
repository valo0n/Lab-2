import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';
import CartPopup from '../popups/CartPopup';
import WishlistPopup from '../popups/WishlistPopup';
import AccountPopup from '../popups/AccountPopup';

export default function Header({
  onMenuClick,
  cartOpen, onCartToggle,
  wishlistOpen, onWishlistToggle,
  accountOpen, onAccountToggle,
}) {
  return (
    <div className="bg-accent-blue text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 sm:h-20 flex items-center gap-3 sm:gap-6">
        <button onClick={onMenuClick} className="lg:hidden hover:text-primary transition-colors" aria-label="Open menu">
          <FiMenu size={24} />
        </button>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-base">C</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-wide">CLICON</span>
        </div>

        <div className="hidden sm:flex flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full h-10 sm:h-11 px-4 pr-12 rounded text-dark placeholder:text-gray-300 focus:outline-none text-sm"
          />
          <button className="absolute right-0 top-0 h-10 sm:h-11 px-3 sm:px-4 bg-primary hover:bg-primary-600 rounded-r text-white" aria-label="Search">
            <FiSearch size={18} />
          </button>
        </div>

        <button className="sm:hidden ml-auto hover:text-primary transition-colors" aria-label="Search">
          <FiSearch size={22} />
        </button>

        <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0 ml-auto sm:ml-0">
          {/* Cart button + popup */}
          <div className="relative">
            <button
              onClick={onCartToggle}
              className="relative hover:text-primary transition-colors"
              aria-label="Cart"
            >
              <FiShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-[10px] rounded-full flex items-center justify-center font-bold">2</span>
            </button>
            <CartPopup isOpen={cartOpen} onClose={onCartToggle} />
          </div>

          {/* Wishlist button + popup */}
          <div className="relative hidden sm:block">
            <button
              onClick={onWishlistToggle}
              className="relative hover:text-primary transition-colors"
              aria-label="Wishlist"
            >
              <FiHeart size={22} />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-[10px] rounded-full flex items-center justify-center font-bold">3</span>
            </button>
            <WishlistPopup isOpen={wishlistOpen} onClose={onWishlistToggle} />
          </div>

          {/* Account button + popup */}
          <div className="relative hidden sm:block">
            <button
              onClick={onAccountToggle}
              className="hover:text-primary transition-colors"
              aria-label="Account"
            >
              <FiUser size={22} />
            </button>
            <AccountPopup isOpen={accountOpen} onClose={onAccountToggle} />
          </div>
        </div>
      </div>

      <div className="sm:hidden px-3 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full h-10 px-3 pr-11 rounded text-dark placeholder:text-gray-300 focus:outline-none text-sm"
          />
          <button className="absolute right-0 top-0 h-10 px-3 bg-primary hover:bg-primary-600 rounded-r text-white" aria-label="Search">
            <FiSearch size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

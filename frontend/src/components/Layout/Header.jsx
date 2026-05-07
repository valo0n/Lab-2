import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import CartPopup from "../popups/CartPopup";
import WishlistPopup from "../popups/WishlistPopup";
import AccountPopup from "../popups/AccountPopup";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function Header({
  onMenuClick,
  cartOpen,
  onCartToggle,
  wishlistOpen,
  onWishlistToggle,
  accountOpen,
  onAccountToggle,
}) {
  const { cartCount } = useCart(); // ← KËTU, para return
  const { wishlistCount } = useWishlist();
  return (
    <div className="bg-accent-blue text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 sm:h-20 flex items-center gap-3 sm:gap-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden hover:text-primary transition-colors"
          aria-label="Open menu"
        >
          <FiMenu size={24} />
        </button>

        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <svg
            width="36"
            height="36"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM36 24C36 30.6274 30.6274 36 24 36C17.3726 36 12 30.6274 12 24C12 17.3726 17.3726 12 24 12C30.6274 12 36 17.3726 36 24ZM24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z"
              fill="white"
            />
          </svg>
          <span className="text-xl sm:text-2xl font-bold tracking-wide">
            CLICON
          </span>
        </Link>

        <div className="hidden sm:flex flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full h-10 sm:h-11 px-4 pr-12 rounded text-dark placeholder:text-gray-300 focus:outline-none text-sm"
          />
          <button
            className="absolute right-0 top-0 h-10 sm:h-11 px-3 sm:px-4 bg-primary hover:bg-primary-600 rounded-r text-white"
            aria-label="Search"
          >
            <FiSearch size={18} />
          </button>
        </div>

        <button
          className="sm:hidden ml-auto hover:text-primary transition-colors"
          aria-label="Search"
        >
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
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-[10px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
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
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-[10px] rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
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
          <button
            className="absolute right-0 top-0 h-10 px-3 bg-primary hover:bg-primary-600 rounded-r text-white"
            aria-label="Search"
          >
            <FiSearch size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

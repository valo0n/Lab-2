import { FiHeart, FiEye, FiShoppingCart } from "react-icons/fi";

export default function ProductCard({ product }) {
  const {
    name,
    price,
    oldPrice,
    discount,
    image,
    rating,
    reviews,
    badge,
    badgeColor = "primary",
  } = product;

  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg p-3 sm:p-4 hover:shadow-card-hover transition-all">
      {badge && (
        <span
          className={`absolute top-2 left-2 sm:top-3 sm:left-3 text-[9px] sm:text-[10px] font-bold text-white px-1.5 sm:px-2 py-0.5 rounded z-10 ${
            badgeColor === "red"
              ? "bg-danger"
              : badgeColor === "green"
                ? "bg-success"
                : "bg-primary"
          }`}
        >
          {badge}
        </span>
      )}

      {/* Quick action buttons — always visible on mobile, hover on desktop */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10">
        <button
          className="w-7 h-7 sm:w-8 sm:h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
          aria-label="Add to wishlist"
        >
          <FiHeart size={12} className="sm:w-[14px] sm:h-[14px]" />
        </button>
        <button
          className="w-7 h-7 sm:w-8 sm:h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
          aria-label="Quick view"
        >
          <FiEye size={12} className="sm:w-[14px] sm:h-[14px]" />
        </button>
      </div>

      {/* Image */}
      <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-2 sm:mb-3 overflow-hidden">
        <span className="text-3xl sm:text-5xl">{image}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
        <div className="flex text-warning text-[10px] sm:text-xs">
          {"★★★★★".split("").map((s, i) => (
            <span
              key={i}
              className={
                i < Math.round(rating) ? "text-warning" : "text-gray-200"
              }
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-[10px] sm:text-xs text-dark-300">
          ({reviews})
        </span>
      </div>

      {/* Name */}
      <h3 className="text-xs sm:text-sm font-medium text-dark mb-1 sm:mb-2 line-clamp-2 min-h-[32px] sm:min-h-[40px]">
        {name}
      </h3>

      {/* Price */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        <span className="text-primary font-bold text-sm sm:text-base">
          ${price}
        </span>
        {oldPrice && (
          <span className="text-dark-300 text-[10px] sm:text-xs line-through">
            ${oldPrice}
          </span>
        )}
        {discount && (
          <span className="text-success text-[10px] sm:text-xs font-semibold">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Add to cart — always visible on mobile, hover on desktop */}
      <button className="w-full mt-2 sm:mt-3 bg-primary-50 text-primary text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 rounded opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white flex items-center justify-center gap-1 sm:gap-2">
        <FiShoppingCart size={12} className="sm:w-[14px] sm:h-[14px]" />
        <span className="hidden sm:inline">ADD TO CART</span>
        <span className="sm:hidden">ADD</span>
      </button>
    </div>
  );
}

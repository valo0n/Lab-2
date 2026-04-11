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
    <div className="group relative bg-white border border-gray-100 rounded-lg p-4 hover:shadow-card-hover transition-all">
      {/* Badge */}
      {badge && (
        <span
          className={`absolute top-3 left-3 text-[10px] font-bold text-white px-2 py-0.5 rounded z-10 ${
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

      {/* Quick action buttons (visible on hover) */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button className="w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors">
          <FiHeart size={14} />
        </button>
        <button className="w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors">
          <FiEye size={14} />
        </button>
      </div>

      {/* Image */}
      <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
        <span className="text-5xl">{image}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-1.5">
        <div className="flex text-warning text-xs">
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
        <span className="text-xs text-dark-300">({reviews})</span>
      </div>

      {/* Name */}
      <h3 className="text-sm font-medium text-dark mb-2 line-clamp-2 min-h-[40px]">
        {name}
      </h3>

      {/* Price */}
      <div className="flex items-center gap-2">
        <span className="text-primary font-bold">${price}</span>
        {oldPrice && (
          <span className="text-dark-300 text-xs line-through">
            ${oldPrice}
          </span>
        )}
        {discount && (
          <span className="text-success text-xs font-semibold">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Add to cart button (visible on hover) */}
      <button className="w-full mt-3 bg-primary-50 text-primary text-xs font-bold py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white flex items-center justify-center gap-2">
        <FiShoppingCart size={14} />
        ADD TO CART
      </button>
    </div>
  );
}

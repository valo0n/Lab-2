import { useState } from "react";
import {
  FiX,
  FiHeart,
  FiShare2,
  FiMinus,
  FiPlus,
  FiShoppingCart,
} from "react-icons/fi";

export default function ProductQuickView({ isOpen, onClose, product }) {
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("128GB");

  if (!isOpen) return null;

  // Defaults për produkt - p.sh kur produkti nga ProductCard nuk ka të gjitha fushat
  const defaults = {
    name: "Samsung Galaxy S22 Ultra 5G — 256GB Phantom Black",
    price: 1199,
    oldPrice: 1399,
    discount: 14,
    rating: 4.8,
    reviews: 234,
    inStock: true,
    sku: "SM-S908B-256",
    brand: "Samsung",
    category: "Smartphones",
    image: "📱",
    description:
      "Experience the ultimate flagship with Samsung Galaxy S22 Ultra. Featuring a 108MP camera, 5G connectivity, S Pen included, and all-day battery life with super fast charging.",
    colors: [
      { name: "black", hex: "#191C1F" },
      { name: "burgundy", hex: "#6B1420" },
      { name: "white", hex: "#F5F5F5" },
      { name: "green", hex: "#2D5F3F" },
    ],
    sizes: ["128GB", "256GB", "512GB", "1TB"],
  };

  // Bashko produktin me defaults — nëse mungojnë fusha, përdor default
  const item = {
    ...defaults,
    ...(product || {}),
  };

  // Sigurohu që images, colors, sizes janë gjithmonë array
  const images = item.images || [
    item.image,
    item.image,
    item.image,
    item.image,
  ];
  const colors = item.colors || defaults.colors;
  const sizes = item.sizes || defaults.sizes;
  const description = item.description || defaults.description;
  const sku = item.sku || "N/A";
  const brand = item.brand || "Generic";
  const inStock = item.inStock !== undefined ? item.inStock : true;
  const reviews = item.reviews || 0;
  const rating = item.rating || 0;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg max-w-5xl w-full my-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-gray-50"
          >
            <FiX size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
            <div>
              <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center text-7xl sm:text-9xl mb-3">
                {images[selectedImage] || images[0]}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square bg-gray-50 rounded flex items-center justify-center text-2xl sm:text-3xl border-2 transition-colors ${selectedImage === i ? "border-primary" : "border-transparent hover:border-gray-200"}`}
                  >
                    {img}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="flex text-warning text-sm">
                    {"★★★★★".split("").map((s, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.round(rating)
                            ? "text-warning"
                            : "text-gray-200"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-dark-300">
                    ({reviews} reviews)
                  </span>
                </div>
                <span
                  className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${inStock ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}
                >
                  {inStock ? "IN STOCK" : "OUT OF STOCK"}
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl font-bold text-dark mb-3">
                {item.name}
              </h2>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-primary">
                  ${item.price}
                </span>
                {item.oldPrice && (
                  <>
                    <span className="text-dark-300 text-base sm:text-lg line-through">
                      ${item.oldPrice}
                    </span>
                    {item.discount && (
                      <span className="bg-danger text-white text-xs font-semibold px-2 py-0.5 rounded">
                        {item.discount}% OFF
                      </span>
                    )}
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-dark-300 mb-4 line-clamp-3">
                {description}
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                <div>
                  <span className="text-dark-300">SKU:</span>{" "}
                  <span className="font-semibold text-dark">{sku}</span>
                </div>
                <div>
                  <span className="text-dark-300">Brand:</span>{" "}
                  <span className="font-semibold text-dark">{brand}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-semibold text-dark mb-2 block">
                  Color:{" "}
                  <span className="text-dark-300 font-normal capitalize">
                    {selectedColor}
                  </span>
                </label>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      aria-label={c.name}
                      style={{ backgroundColor: c.hex }}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === c.name ? "border-primary ring-2 ring-primary/30" : "border-gray-100"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-semibold text-dark mb-2 block">
                  Storage:{" "}
                  <span className="text-dark-300 font-normal">
                    {selectedSize}
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded border text-xs font-semibold transition-colors ${selectedSize === s ? "border-primary bg-primary text-white" : "border-gray-100 text-dark hover:border-primary hover:text-primary"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <div className="flex items-center border border-gray-100 rounded">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Decrease"
                    className="w-9 h-10 flex items-center justify-center hover:bg-gray-50 text-dark"
                  >
                    <FiMinus size={14} />
                  </button>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, +e.target.value))}
                    className="w-10 h-10 text-center text-sm font-semibold focus:outline-none"
                  />
                  <button
                    onClick={() => setQty(qty + 1)}
                    aria-label="Increase"
                    className="w-9 h-10 flex items-center justify-center hover:bg-gray-50 text-dark"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>

                <button className="flex-1 bg-primary hover:bg-primary-600 text-white font-bold px-3 sm:px-6 py-2.5 sm:py-3 rounded text-xs sm:text-sm flex items-center justify-center gap-2">
                  <FiShoppingCart size={16} />
                  <span className="hidden sm:inline">ADD TO CART</span>
                  <span className="sm:hidden">ADD</span>
                </button>

                <button
                  aria-label="Wishlist"
                  className="w-10 h-10 border border-gray-100 rounded flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary text-dark"
                >
                  <FiHeart size={16} />
                </button>

                <button
                  aria-label="Share"
                  className="w-10 h-10 border border-gray-100 rounded flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary text-dark hidden sm:flex"
                >
                  <FiShare2 size={16} />
                </button>
              </div>

              <button className="w-full bg-dark hover:bg-dark-100 text-white font-bold py-3 rounded text-xs sm:text-sm mb-3">
                BUY IT NOW →
              </button>

              <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-2 text-[10px] sm:text-xs text-dark-300">
                <div>🚚 Free shipping over $50</div>
                <div>↩️ 30-day returns</div>
                <div>🛡️ 2-year warranty</div>
                <div>💳 Secure payment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

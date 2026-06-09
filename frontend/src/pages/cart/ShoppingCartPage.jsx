import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import { useCart } from "../../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_URL = API_URL.replace("/api", "");

function getProductId(item) {
  return (
    item?._id ||
    item?.id ||
    item?.product_id ||
    item?.productId ||
    item?.product?.id
  );
}

function getCartItemId(item) {
  return (
    item?.cart_item_id || item?.cartItemId || item?.id || getProductId(item)
  );
}

function getProduct(item) {
  return item?.product || item;
}

function isEmojiOrText(image) {
  // Nese eshte emoji ose tekst i shkurter (jo URL/path)
  if (!image || typeof image !== "string") return false;
  if (
    image.startsWith("http") ||
    image.startsWith("/") ||
    image.startsWith("uploads")
  )
    return false;
  return true; // emoji si 📦 ose tekst
}

function getImageUrl(image) {
  if (!image) return "/images/product-1.png";

  let imagePath = image;

  if (typeof image === "object") {
    imagePath =
      image.url ||
      image.image_url ||
      image.path ||
      image.src ||
      image.image ||
      image.filename ||
      "";
  }

  if (!imagePath) return "/images/product-1.png";
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/uploads")) return `${SERVER_URL}${imagePath}`;
  if (imagePath.startsWith("uploads")) return `${SERVER_URL}/${imagePath}`;

  return imagePath;
}

function getProductImage(product) {
  if (!product) return null;

  if (product.image) return product.image;

  if (Array.isArray(product.images) && product.images.length > 0) {
    const primary = product.images.find((img) => img.is_primary);
    return primary || product.images[0];
  }

  return null;
}

function getPrice(item) {
  const product = getProduct(item);

  return Number(
    item?.price ||
      product?.salePrice ||
      product?.sale_price ||
      product?.discount_price ||
      product?.price ||
      0,
  );
}

function getOldPrice(item) {
  const product = getProduct(item);

  return Number(
    product?.oldPrice || product?.old_price || product?.compare_at_price || 0,
  );
}

function getQuantity(item) {
  return Number(item?.quantity || item?.qty || 1);
}

function normalizeCartItems(items) {
  if (!Array.isArray(items)) return [];

  return items.map((item) => {
    const product = getProduct(item);

    return {
      ...item,
      product,
      id: getProductId(item),
      cart_item_id: getCartItemId(item),
      name: product?.name || item?.name || "Product",
      slug: product?.slug || item?.slug,
      image: getProductImage(product),
      price: getPrice(item),
      oldPrice: getOldPrice(item),
      quantity: getQuantity(item),
    };
  });
}

function Breadcrumb() {
  return (
    <div className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-sm text-gray-500 sm:px-6 lg:px-8">
        <Link to="/" className="hover:text-sky-600">
          Home
        </Link>
        <span>/</span>
        <span className="text-sky-600">Shopping Cart</span>
      </div>
    </div>
  );
}

export default function ShoppingCartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeByProductId,
    updateQuantity,
    clearCart: clearCtxCart,
    replaceCart,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // Context ngarkon cart-in nga localStorage automatikisht
  function fetchCart() {
    // Refresh manual - Context e mban gjendjen, ky vetem hiq loading
    setLoading(false);
  }

  function handleUpdateQuantity(item, type) {
    const productId = getProductId(item);
    const current = getQuantity(item);
    const newQuantity =
      type === "increase" ? current + 1 : Math.max(1, current - 1);
    updateQuantity(productId, newQuantity);
  }

  function removeItem(item) {
    const productId = getProductId(item);
    removeByProductId(productId);
  }

  function clearCart() {
    clearCtxCart();
  }

  async function applyCoupon() {
    if (!coupon.trim()) {
      setCouponMessage("Please enter a coupon code.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setActionLoading(true);
      setCouponMessage("");

      if (token) {
        const res = await fetch(`${API_URL}/coupons/validate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            code: coupon.trim(),
            order_total: subtotal,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          const discountValue = Number(data.data?.discount || 0);
          setCouponDiscount(discountValue);
          setCouponMessage(
            `Coupon applied — you saved $${discountValue.toFixed(2)}.`,
          );
          // Ruaje që ta përdorë checkout-i
          localStorage.setItem(
            "appliedCoupon",
            JSON.stringify({ code: coupon.trim(), discount: discountValue }),
          );
        } else {
          setCouponDiscount(0);
          setCouponMessage(data.message || "Invalid coupon code.");
          localStorage.removeItem("appliedCoupon");
        }
      } else {
        setCouponDiscount(0);
        setCouponMessage("Please log in to use a coupon.");
        localStorage.removeItem("appliedCoupon");
      }
    } catch (err) {
      console.error("Coupon error:", err);
      setCouponMessage("Coupon could not be applied.");
    } finally {
      setActionLoading(false);
    }
  }

  const { subtotal, shipping, discount, tax, total } = useMemo(() => {
    const subtotalValue = cartItems.reduce((sum, item) => {
      return sum + getPrice(item) * getQuantity(item);
    }, 0);

    const shippingValue = subtotalValue > 0 ? 0 : 0;
    const discountValue = Math.min(Number(couponDiscount || 0), subtotalValue);
    const taxValue = subtotalValue * 0.18;
    const totalValue = Math.max(
      0,
      subtotalValue + shippingValue + taxValue - discountValue,
    );

    return {
      subtotal: subtotalValue,
      shipping: shippingValue,
      discount: discountValue,
      tax: taxValue,
      total: totalValue,
    };
  }, [cartItems, couponDiscount]);

  const formatPrice = (value) => `$${Number(value || 0).toFixed(2)}`;

  const toggleCart = () => {
    setCartOpen((value) => !value);
    setWishlistOpen(false);
    setAccountOpen(false);
  };

  const toggleWishlist = () => {
    setWishlistOpen((value) => !value);
    setCartOpen(false);
    setAccountOpen(false);
  };

  const toggleAccount = () => {
    setAccountOpen((value) => !value);
    setCartOpen(false);
    setWishlistOpen(false);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopBar />

      <Header
        onMenuClick={() => setMobileMenuOpen(true)}
        cartOpen={cartOpen}
        onCartToggle={toggleCart}
        wishlistOpen={wishlistOpen}
        onWishlistToggle={toggleWishlist}
        accountOpen={accountOpen}
        onAccountToggle={toggleAccount}
      />

      <Navigation
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <Breadcrumb />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.8fr_0.9fr]">
          <section className="overflow-hidden rounded-sm border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-5">
              <h1 className="text-xl font-semibold text-gray-900">
                Shopping Cart
              </h1>
            </div>

            <div className="hidden grid-cols-[2.3fr_0.8fr_0.9fr_0.8fr] border-b border-gray-200 bg-gray-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 md:grid">
              <span>Products</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Sub-total</span>
            </div>

            {loading ? (
              <div className="px-6 py-12 text-center text-sm text-gray-500">
                Loading cart...
              </div>
            ) : error ? (
              <div className="px-6 py-12 text-center text-sm text-red-500">
                {error}
              </div>
            ) : cartItems.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm text-gray-500">Your cart is empty.</p>

                <Link
                  to="/shop-page"
                  className="mt-4 inline-flex items-center justify-center rounded-sm bg-orange-500 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white hover:bg-orange-600"
                >
                  Go to shop
                </Link>
              </div>
            ) : (
              cartItems.map((item) => {
                const product = getProduct(item);
                const productId = getProductId(item);
                const oldPrice = getOldPrice(item);
                const price = getPrice(item);
                const quantity = getQuantity(item);

                return (
                  <div
                    key={productId}
                    className="grid grid-cols-1 gap-4 border-b border-gray-200 px-6 py-5 md:grid-cols-[2.3fr_0.8fr_0.9fr_0.8fr] md:items-center"
                  >
                    <div className="flex items-start gap-4">
                      <button
                        type="button"
                        onClick={() => removeItem(item)}
                        className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-red-300 text-xs text-red-500 hover:bg-red-50"
                        aria-label={`Remove ${item.name}`}
                      >
                        ×
                      </button>

                      <Link
                        to={`/products/${item.slug || productId}`}
                        className="h-20 w-20 rounded bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0"
                      >
                        {isEmojiOrText(
                          item.image || getProductImage(product),
                        ) ? (
                          <span className="text-3xl">
                            {item.image || getProductImage(product)}
                          </span>
                        ) : (
                          <img
                            src={getImageUrl(
                              item.image || getProductImage(product),
                            )}
                            alt={item.name}
                            className="h-full w-full object-contain"
                          />
                        )}
                      </Link>

                      <div>
                        <Link to={`/products/${item.slug || productId}`}>
                          <h2 className="max-w-xs text-sm font-medium leading-6 text-gray-800 hover:text-orange-500">
                            {item.name}
                          </h2>
                        </Link>
                      </div>
                    </div>

                    <div className="text-sm text-gray-700">
                      {oldPrice > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 line-through">
                            {formatPrice(oldPrice)}
                          </span>

                          <span className="font-medium text-gray-800">
                            {formatPrice(price)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-medium text-gray-800">
                          {formatPrice(price)}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex w-fit items-center rounded-sm border border-gray-300">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item, "decrease")}
                          className="px-3 py-2 text-base text-gray-700 hover:bg-gray-50"
                        >
                          −
                        </button>

                        <span className="min-w-[44px] border-x border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-800">
                          {String(quantity).padStart(2, "0")}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item, "increase")}
                          className="px-3 py-2 text-base text-gray-700 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-gray-900">
                      {formatPrice(price * quantity)}
                    </div>
                  </div>
                );
              })
            )}

            <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/shop-page"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-sky-500 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-sky-600 hover:bg-sky-50"
              >
                ← Return to shop
              </Link>

              <button
                type="button"
                onClick={fetchCart}
                className="inline-flex items-center justify-center rounded-sm border border-sky-500 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-sky-600 hover:bg-sky-50"
              >
                Update cart
              </button>

              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex items-center justify-center rounded-sm border border-red-400 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-red-500 hover:bg-red-50"
                >
                  Clear cart
                </button>
              )}
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-sm border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Cart Totals
                </h2>
              </div>

              <div className="space-y-4 px-5 py-5 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Sub-total</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Discount</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(discount)}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <span>Tax</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(tax)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total)} USD</span>
                </div>

                <button
                  type="button"
                  onClick={proceedToCheckout}
                  disabled={cartItems.length === 0}
                  className="mt-2 w-full rounded-sm bg-orange-500 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Proceed to checkout →
                </button>
              </div>
            </div>

            <div className="rounded-sm border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-base font-semibold text-gray-900">
                  Coupon Code
                </h2>
              </div>

              <div className="px-5 py-5">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full rounded-sm border border-gray-300 px-3 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-sky-500"
                />

                {couponMessage && (
                  <p className="mt-2 text-xs text-gray-500">{couponMessage}</p>
                )}

                <button
                  type="button"
                  onClick={applyCoupon}
                  disabled={actionLoading || subtotal === 0}
                  className="mt-4 rounded-sm bg-sky-500 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Apply coupon
                </button>

                <p className="mt-3 text-xs text-gray-400">
                  Test local coupon: SAVE10
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

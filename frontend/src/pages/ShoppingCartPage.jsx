import { useMemo, useState } from "react";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

const initialCartItems = [
  {
    id: 1,
    name: "4K UHD LED Smart TV with Chromecast Built-in",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=300&q=80",
    oldPrice: 99,
    price: 70,
    quantity: 1,
  },
  {
    id: 2,
    name: "Wired Over-Ear Gaming Headphones with USB",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
    oldPrice: null,
    price: 250,
    quantity: 3,
  },
];

function Breadcrumb() {
  return (
    <div className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-sm text-gray-500 sm:px-6 lg:px-8">
        <span>Home</span>
        <span>/</span>
        <span className="text-sky-600">Shopping Cart</span>
      </div>
    </div>
  );
}

export default function ShoppingCartPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [cartItems, setCartItems] = useState(initialCartItems);

  const toggleCart = () => {
    setCartOpen((v) => !v);
    setWishlistOpen(false);
    setAccountOpen(false);
  };

  const toggleWishlist = () => {
    setWishlistOpen((v) => !v);
    setCartOpen(false);
    setAccountOpen(false);
  };

  const toggleAccount = () => {
    setAccountOpen((v) => !v);
    setCartOpen(false);
    setWishlistOpen(false);
  };

  const updateQuantity = (id, type) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id !== id) return item;

        const newQuantity =
          type === "increase"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);

        return { ...item, quantity: newQuantity };
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const { subtotal, shipping, discount, tax, total } = useMemo(() => {
    const subtotalValue = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shippingValue = 0;
    const discountValue = subtotalValue > 0 ? 24 : 0;
    const taxValue = subtotalValue * 0.1937;
    const totalValue = subtotalValue + shippingValue + taxValue - discountValue;

    return {
      subtotal: subtotalValue,
      shipping: shippingValue,
      discount: discountValue,
      tax: taxValue,
      total: totalValue,
    };
  }, [cartItems]);

  const formatPrice = (value) => `$${value.toFixed(2)}`;

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
              <h1 className="text-xl font-semibold text-gray-900">Shopping Cart</h1>
            </div>

            <div className="hidden grid-cols-[2.3fr_0.8fr_0.9fr_0.8fr] border-b border-gray-200 bg-gray-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 md:grid">
              <span>Products</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Sub-total</span>
            </div>

            <div>
              {cartItems.length === 0 ? (
                <div className="px-6 py-12 text-center text-sm text-gray-500">
                  Your cart is empty.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 gap-4 border-b border-gray-200 px-6 py-5 md:grid-cols-[2.3fr_0.8fr_0.9fr_0.8fr] md:items-center"
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-red-300 text-xs text-red-500 hover:bg-red-50"
                        aria-label={`Remove ${item.name}`}
                      >
                        ×
                      </button>

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded object-cover"
                      />

                      <div>
                        <h2 className="max-w-xs text-sm font-medium leading-6 text-gray-800">
                          {item.name}
                        </h2>
                      </div>
                    </div>

                    <div className="text-sm text-gray-700">
                      {item.oldPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 line-through">
                            ${item.oldPrice}
                          </span>
                          <span className="font-medium text-gray-800">
                            ${item.price}
                          </span>
                        </div>
                      ) : (
                        <span className="font-medium text-gray-800">${item.price}</span>
                      )}
                    </div>

                    <div>
                      <div className="flex w-fit items-center rounded-sm border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.id, "decrease")}
                          className="px-3 py-2 text-base text-gray-700 hover:bg-gray-50"
                        >
                          −
                        </button>
                        <span className="min-w-[44px] border-x border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-800">
                          {String(item.quantity).padStart(2, "0")}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, "increase")}
                          className="px-3 py-2 text-base text-gray-700 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-sm font-semibold text-gray-900">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <button className="inline-flex items-center justify-center gap-2 rounded-sm border border-sky-500 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-sky-600 hover:bg-sky-50">
                ← Return to shop
              </button>

              <button className="inline-flex items-center justify-center rounded-sm border border-sky-500 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-sky-600 hover:bg-sky-50">
                Update cart
              </button>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-sm border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Cart Totals</h2>
              </div>

              <div className="space-y-4 px-5 py-5 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Sub-total</span>
                  <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Discount</span>
                  <span className="font-medium text-gray-900">{formatPrice(discount)}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <span>Tax</span>
                  <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
                </div>

                <div className="flex items-center justify-between text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total)} USD</span>
                </div>

                <button className="mt-2 w-full rounded-sm bg-orange-500 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600">
                  Proceed to checkout →
                </button>
              </div>
            </div>

            <div className="rounded-sm border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-base font-semibold text-gray-900">Coupon Code</h2>
              </div>

              <div className="px-5 py-5">
                <input
                  type="text"
                  placeholder="Email address"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full rounded-sm border border-gray-300 px-3 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-sky-500"
                />

                <button className="mt-4 rounded-sm bg-sky-500 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white hover:bg-sky-600">
                  Apply coupon
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

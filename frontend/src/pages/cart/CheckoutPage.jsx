import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_URL = API_URL.replace("/api", "");

function getProductId(item) {
  return item?._id || item?.id || item?.product_id || item?.productId || item?.product?.id;
}

function getProduct(item) {
  return item?.product || item;
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
      0
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
      name: product?.name || item?.name || "Product",
      slug: product?.slug || item?.slug,
      image: getProductImage(product),
      price: getPrice(item),
      quantity: getQuantity(item),
    };
  });
}

function formatPrice(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shipDifferent, setShipDifferent] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const [billing, setBilling] = useState({
    first_name: "",
    last_name: "",
    company: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await fetch(`${API_URL}/cart`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();

            const backendItems =
              data.data?.items ||
              data.data ||
              data.items ||
              data.cart ||
              [];

            setCartItems(normalizeCartItems(backendItems));
            return;
          }
        } catch (backendError) {
          console.error("Backend cart failed:", backendError);
        }
      }

      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(normalizeCartItems(localCart));
    } catch (err) {
      console.error("Cart error:", err);
      setError("Cart could not be loaded.");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }

  const { subtotal, shipping, discount, tax, total } = useMemo(() => {
    const subtotalValue = cartItems.reduce((sum, item) => {
      return sum + getPrice(item) * getQuantity(item);
    }, 0);

    const shippingValue = subtotalValue > 0 ? 0 : 0;
    const discountValue = 0;
    const taxValue = subtotalValue * 0.18;
    const totalValue = Math.max(
      0,
      subtotalValue + shippingValue + taxValue - discountValue
    );

    return {
      subtotal: subtotalValue,
      shipping: shippingValue,
      discount: discountValue,
      tax: taxValue,
      total: totalValue,
    };
  }, [cartItems]);

  const handleBillingChange = (field, value) => {
    setBilling((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return false;
    }

    const requiredFields = [
      "first_name",
      "last_name",
      "address",
      "country",
      "state",
      "city",
      "zip_code",
      "email",
      "phone",
    ];

    for (const field of requiredFields) {
      if (!billing[field]?.trim()) {
        alert("Please fill all required billing fields.");
        return false;
      }
    }

    if (!billing.email.includes("@")) {
      alert("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  async function placeOrder() {
    if (!validateForm()) return;

    try {
      setPlacingOrder(true);
      setError("");

      const token = localStorage.getItem("token");

      const orderPayload = {
        billing_address: billing,
        shipping_address: shipDifferent ? billing : billing,
        payment_method: paymentMethod,
        notes: orderNotes,
        items: cartItems.map((item) => ({
          product_id: getProductId(item),
          quantity: getQuantity(item),
          price: getPrice(item),
        })),
        subtotal,
        shipping,
        discount,
        tax,
        total,
      };

      if (token) {
        const res = await fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderPayload),
        });

        if (!res.ok) {
          throw new Error("Order could not be created");
        }

        const data = await res.json();
        const order = data.data || data.order || data;

        localStorage.removeItem("cart");

        if (paymentMethod === "card") {
          await createPaymentIntent(order);
          return;
        }

        alert("Order placed successfully!");
        navigate(`/order-success/${order.id || order.order_number || ""}`);
        return;
      }

      const guestOrders = JSON.parse(localStorage.getItem("guestOrders") || "[]");
      const guestOrder = {
        ...orderPayload,
        id: Date.now(),
        order_number: `GUEST-${Date.now()}`,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      localStorage.setItem("guestOrders", JSON.stringify([...guestOrders, guestOrder]));
      localStorage.removeItem("cart");

      alert("Order placed successfully!");
      navigate("/order-success");
    } catch (err) {
      console.error("Place order error:", err);
      setError("Order could not be placed. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  }

  async function createPaymentIntent(order) {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/payments/create-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_id: order.id,
          orderId: order.id,
          amount: total,
        }),
      });

      if (!res.ok) {
        throw new Error("Payment intent failed");
      }

      const data = await res.json();

      alert("Order created. Stripe payment intent created.");
      navigate(`/order-success/${order.id || data.order_id || ""}`);
    } catch (err) {
      console.error("Payment error:", err);
      alert("Order created, but payment could not be initialized.");
      navigate("/order-success");
    }
  }

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

  const Input = ({ label, field, placeholder, className = "", type = "text" }) => (
    <div className={className}>
      <label className="mb-2 block text-xs font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={billing[field] || ""}
        onChange={(e) => handleBillingChange(field, e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-sm border border-gray-200 px-3 text-sm outline-none focus:border-orange-400"
      />
    </div>
  );

  const Select = ({ label, field, options }) => (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-700">
        {label}
      </label>

      <select
        value={billing[field] || ""}
        onChange={(e) => handleBillingChange(field, e.target.value)}
        className="h-11 w-full rounded-sm border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:border-orange-400"
      >
        <option value="">Select...</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
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

      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>{" "}
          &gt;{" "}
          <Link to="/cart" className="hover:text-blue-500">
            Shopping Cart
          </Link>{" "}
          &gt; <span className="text-blue-500">Checkout</span>
        </div>
      </div>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 lg:grid-cols-[1fr_330px]">
        <section>
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            Billing Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input label="First name" field="first_name" placeholder="First name" />
            <Input label="Last name" field="last_name" placeholder="Last name" />
            <Input
              label="Company Name (Optional)"
              field="company"
              placeholder="Company"
            />
          </div>

          <div className="mt-4">
            <Input label="Address" field="address" placeholder="Address" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <Select
              label="Country"
              field="country"
              options={["Kosovo", "Albania", "North Macedonia", "Serbia", "Germany"]}
            />
            <Select
              label="Region/State"
              field="state"
              options={["Prishtina", "Prizren", "Peja", "Gjilan", "Ferizaj"]}
            />
            <Select
              label="City"
              field="city"
              options={["Prishtina", "Prizren", "Peja", "Gjilan", "Ferizaj"]}
            />
            <Input label="Zip Code" field="zip_code" placeholder="10000" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Email" field="email" placeholder="email@example.com" type="email" />
            <Input label="Phone Number" field="phone" placeholder="+383..." />
          </div>

          <label className="mt-5 flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={shipDifferent}
              onChange={(e) => setShipDifferent(e.target.checked)}
              className="h-4 w-4"
            />
            Ship into different address
          </label>

          <div className="mt-8 rounded-sm border border-gray-200">
            <h3 className="border-b border-gray-200 px-6 py-4 text-base font-semibold">
              Payment Option
            </h3>

            <div className="grid grid-cols-2 border-b border-gray-200 md:grid-cols-5">
              {[
                ["cash", "$", "Cash on Delivery"],
                ["venmo", "V", "Venmo"],
                ["paypal", "P", "Paypal"],
                ["amazon", "a", "Amazon Pay"],
                ["card", "▣", "Debit/Credit Card"],
              ].map(([value, icon, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPaymentMethod(value)}
                  className="flex flex-col items-center gap-2 border-r border-gray-200 py-5 text-sm last:border-r-0"
                >
                  <span className="text-2xl font-bold text-orange-500">
                    {icon}
                  </span>
                  <span>{label}</span>
                  <span
                    className={`h-4 w-4 rounded-full border ${
                      paymentMethod === value
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
                <input
                  placeholder="Name on Card"
                  className="md:col-span-2 h-11 w-full rounded-sm border border-gray-200 px-3 text-sm outline-none focus:border-orange-400"
                />
                <input
                  placeholder="Card Number"
                  className="md:col-span-2 h-11 w-full rounded-sm border border-gray-200 px-3 text-sm outline-none focus:border-orange-400"
                />
                <input
                  placeholder="Expire Date DD/YY"
                  className="h-11 w-full rounded-sm border border-gray-200 px-3 text-sm outline-none focus:border-orange-400"
                />
                <input
                  placeholder="CVC"
                  className="h-11 w-full rounded-sm border border-gray-200 px-3 text-sm outline-none focus:border-orange-400"
                />
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Additional Information
            </h2>

            <label className="mb-2 block text-xs font-medium text-gray-700">
              Order Notes (Optional)
            </label>

            <textarea
              rows="5"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Notes about your order, e.g. special notes for delivery"
              className="w-full rounded-sm border border-gray-200 p-3 text-sm outline-none focus:border-orange-400"
            />
          </div>
        </section>

        <aside className="h-fit rounded-sm border border-gray-200 p-5">
          <h2 className="mb-5 text-lg font-semibold">Order Summary</h2>

          {loading ? (
            <div className="py-10 text-center text-sm text-gray-500">
              Loading order summary...
            </div>
          ) : cartItems.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-gray-500">Your cart is empty.</p>
              <Link
                to="/shop"
                className="mt-4 inline-block bg-orange-500 px-5 py-3 text-xs font-semibold uppercase text-white"
              >
                Go to shop
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                {cartItems.map((item) => {
                  const product = getProduct(item);
                  const productId = getProductId(item);

                  return (
                    <div key={productId} className="flex gap-3">
                      <img
                        src={getImageUrl(item.image || getProductImage(product))}
                        alt={item.name}
                        className="h-14 w-14 rounded object-contain"
                      />

                      <div className="flex-1 text-sm">
                        <p className="line-clamp-2 text-gray-700">
                          {item.name}
                        </p>

                        <p className="mt-1">
                          {getQuantity(item)} x{" "}
                          <span className="text-blue-500">
                            {formatPrice(getPrice(item))}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 space-y-3 border-b border-gray-200 pb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Sub-total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Discount</span>
                  <span>{formatPrice(discount)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="mt-5 flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)} USD</span>
              </div>

              {error && (
                <p className="mt-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={placeOrder}
                disabled={placingOrder || cartItems.length === 0}
                className="mt-6 w-full bg-orange-500 py-4 text-sm font-bold uppercase text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {placingOrder ? "Placing Order..." : "Place Order →"}
              </button>
            </>
          )}
        </aside>
      </main>

      <Footer />
    </div>
  );
}
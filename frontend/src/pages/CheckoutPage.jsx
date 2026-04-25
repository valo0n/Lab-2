import { useState } from "react";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

export default function CheckoutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

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

  const Input = ({ label, placeholder, className = "" }) => (
    <div className={className}>
      <label className="mb-2 block text-xs font-medium text-gray-700">
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="h-11 w-full rounded-sm border border-gray-200 px-3 text-sm outline-none focus:border-orange-400"
      />
    </div>
  );

  const Select = ({ label, placeholder }) => (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-700">
        {label}
      </label>
      <select className="h-11 w-full rounded-sm border border-gray-200 px-3 text-sm text-gray-400 outline-none focus:border-orange-400">
        <option>{placeholder}</option>
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
          Home &gt; Shopping Cart &gt;{" "}
          <span className="text-blue-500">Checkout</span>
        </div>
      </div>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 lg:grid-cols-[1fr_330px]">
        <section>
          <h2 className="mb-6 text-lg font-semibold text-gray-900">
            Billing Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input label="First name" placeholder="First name" />
            <Input label="Last name" placeholder="Last name" />
            <Input label="Company Name (Optional)" placeholder="" />
          </div>

          <div className="mt-4">
            <Input label="Address" placeholder="Address" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <Select label="Country" placeholder="Select..." />
            <Select label="Region/State" placeholder="Select..." />
            <Select label="City" placeholder="Select..." />
            <Input label="Zip Code" placeholder="" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Email" placeholder="" />
            <Input label="Phone Number" placeholder="" />
          </div>

          <label className="mt-5 flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="h-4 w-4" />
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

            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
              <Input
                label="Name on Card"
                placeholder=""
                className="md:col-span-2"
              />
              <Input
                label="Card Number"
                placeholder=""
                className="md:col-span-2"
              />
              <Input label="Expire Date" placeholder="DD/YY" />
              <Input label="CVC" placeholder="" />
            </div>
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
              placeholder="Notes about your order, e.g. special notes for delivery"
              className="w-full rounded-sm border border-gray-200 p-3 text-sm outline-none focus:border-orange-400"
            />
          </div>
        </section>

        <aside className="h-fit rounded-sm border border-gray-200 p-5">
          <h2 className="mb-5 text-lg font-semibold">Order Summary</h2>

          <div className="space-y-5">
            <div className="flex gap-3">
              <img
                src="/images/products/camera.png"
                alt="Camera"
                className="h-14 w-14 rounded object-cover"
              />
              <div className="flex-1 text-sm">
                <p className="line-clamp-2 text-gray-700">
                  Canon EOS 1500D DSLR Camera Body+ 18...
                </p>
                <p className="mt-1">
                  1 x <span className="text-blue-500">$70</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <img
                src="/images/products/headphones.png"
                alt="Headphones"
                className="h-14 w-14 rounded object-cover"
              />
              <div className="flex-1 text-sm">
                <p className="line-clamp-2 text-gray-700">
                  Wired Over-Ear Gaming Headphones with U...
                </p>
                <p className="mt-1">
                  3 x <span className="text-blue-500">$250</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-b border-gray-200 pb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Sub-total</span>
              <span>$320</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Discount</span>
              <span>$24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax</span>
              <span>$61.99</span>
            </div>
          </div>

          <div className="mt-5 flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>$357.99 USD</span>
          </div>

          <button className="mt-6 w-full bg-orange-500 py-4 text-sm font-bold uppercase text-white hover:bg-orange-600">
            Place Order →
          </button>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
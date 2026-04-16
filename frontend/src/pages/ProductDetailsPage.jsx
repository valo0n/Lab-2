import { useState } from "react";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

const productImages = [
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
];

const relatedProducts = [
  {
    id: 1,
    name: "Bose Sport Earbuds",
    price: "$1,500",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Samsung Galaxy S21 5G",
    price: "$1,500",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "JBL FLIP 4 Speaker",
    price: "$1,500",
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Portable Gaming Machine",
    price: "$1,500",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=400&q=80",
  },
];

function ProductCard({ product }) {
  return (
    <div className="flex items-center gap-3 rounded border border-gray-200 bg-white p-3 hover:shadow-sm transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-16 w-16 rounded object-cover"
      />
      <div>
        <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h4>
        <p className="mt-1 text-sm font-semibold text-sky-600">{product.price}</p>
      </div>
    </div>
  );
}

export default function ProductDetailsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedColor, setSelectedColor] = useState("orange");
  const [selectedSize, setSelectedSize] = useState("14-inch Liquid Retina XDR display");
  const [selectedMemory, setSelectedMemory] = useState("16GB unified memory");
  const [selectedStorage, setSelectedStorage] = useState("1TB SSD Storage");

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

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 gap-8 bg-white p-6 shadow-sm lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded border border-gray-200 bg-white">
              <img
                src={selectedImage}
                alt="MacBook Pro"
                className="h-[420px] w-full object-contain"
              />
            </div>

            <div className="mt-4 flex items-center gap-3 overflow-x-auto">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded border p-1 ${
                    selectedImage === img
                      ? "border-orange-500 ring-1 ring-orange-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex text-sm text-orange-400">★★★★★</div>
              <p className="text-sm text-gray-500">47 Star Rating | 21,617 User feedback</p>
            </div>

            <h1 className="text-2xl font-semibold leading-snug text-gray-900">
              2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM,
              256GB SSD Storage) - Space Gray
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              SKU: <span className="text-gray-700">AB245671</span>
            </p>
            <p className="text-sm text-gray-500">
              Brand: <span className="text-gray-700">Apple</span>
            </p>
            <p className="mt-1 text-sm text-green-600 font-medium">
              Availability: In Stock
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Category: <span className="text-gray-700">Electronics Devices</span>
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-bold text-sky-600">$1699</span>
              <span className="text-lg text-gray-400 line-through">$1999.00</span>
              <span className="rounded bg-yellow-400 px-2 py-1 text-xs font-semibold text-gray-900">
                21% OFF
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  {["orange", "gray", "zinc"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-7 w-7 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor:
                          color === "orange"
                            ? "#f59e0b"
                            : color === "gray"
                            ? "#d1d5db"
                            : "#9ca3af",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Size
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
                >
                  <option>14-inch Liquid Retina XDR display</option>
                  <option>13-inch Retina display</option>
                  <option>16-inch Liquid Retina display</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Memory
                </label>
                <select
                  value={selectedMemory}
                  onChange={(e) => setSelectedMemory(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
                >
                  <option>16GB unified memory</option>
                  <option>8GB unified memory</option>
                  <option>32GB unified memory</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Storage
                </label>
                <select
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
                >
                  <option>1TB SSD Storage</option>
                  <option>256GB SSD Storage</option>
                  <option>512GB SSD Storage</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex w-fit items-center rounded border border-gray-300">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-lg text-gray-700"
                >
                  -
                </button>
                <span className="border-x border-gray-300 px-5 py-2 text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 text-lg text-gray-700"
                >
                  +
                </button>
              </div>

              <button className="rounded bg-orange-500 px-8 py-3 text-sm font-semibold text-white hover:bg-orange-600">
                ADD TO CART
              </button>

              <button className="rounded border border-orange-500 px-8 py-3 text-sm font-semibold text-orange-500 hover:bg-orange-50">
                BUY NOW
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-600">
              <button className="hover:text-orange-500">♡ Add to Wishlist</button>
              <button className="hover:text-orange-500">⇄ Add to Compare</button>
              <div className="flex items-center gap-2">
                <span>Share product:</span>
                <span className="text-orange-500">f</span>
                <span className="text-orange-500">t</span>
                <span className="text-orange-500">p</span>
              </div>
            </div>

            <div className="mt-6 rounded border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-700">
                100% Guarantee Safe Checkout
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="rounded bg-white px-2 py-1 border">Visa</span>
                <span className="rounded bg-white px-2 py-1 border">MasterCard</span>
                <span className="rounded bg-white px-2 py-1 border">PayPal</span>
                <span className="rounded bg-white px-2 py-1 border">Amex</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white p-6 shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap gap-6 text-sm font-medium uppercase tracking-wide">
              {["description", "additional information", "specification", "review"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`border-b-2 pb-3 ${
                      activeTab === tab
                        ? "border-orange-500 text-orange-500"
                        : "border-transparent text-gray-500"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h3 className="mb-3 text-base font-semibold text-gray-900">Description</h3>
              <p className="text-sm leading-7 text-gray-600">
                The most powerful MacBook Pro ever is here. With the blazing-fast
                M1 Pro or M1 Max chip, the new 14-inch MacBook Pro delivers
                ground-breaking performance and amazing battery life.
              </p>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                Add to that a stunning Liquid Retina XDR display, the best camera
                and audio ever in a Mac notebook, and all the ports you need.
                The first notebook of its kind, this MacBook Pro is a beast.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-base font-semibold text-gray-900">Feature</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>✔ Free 1 Year Warranty</li>
                <li>✔ Free Shipping & Fasted Delivery</li>
                <li>✔ 100% Money-back guarantee</li>
                <li>✔ 24/7 Customer support</li>
                <li>✔ Secure payment method</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-base font-semibold text-gray-900">
                Shipping Information
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">Courier:</span> 2-4 days, free shipping
                </p>
                <p>
                  <span className="font-medium text-gray-800">Local Shipping:</span> up to one week, $19.00
                </p>
                <p>
                  <span className="font-medium text-gray-800">UPS Ground Shipping:</span> 4-6 days, $29.00
                </p>
                <p>
                  <span className="font-medium text-gray-800">Unishop Global Export:</span> 3-4 days, $39.00
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
              Related Product
            </h3>
            <div className="space-y-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
              Product Accessories
            </h3>
            <div className="space-y-3">
              {relatedProducts.map((product) => (
                <ProductCard key={`acc-${product.id}`} product={product} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
              Apple Product
            </h3>
            <div className="space-y-3">
              {relatedProducts.map((product) => (
                <ProductCard key={`apple-${product.id}`} product={product} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
              Featured Products
            </h3>
            <div className="space-y-3">
              {relatedProducts.map((product) => (
                <ProductCard key={`feat-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
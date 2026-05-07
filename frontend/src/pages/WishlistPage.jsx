import { useState } from "react";
import { Heart, ShoppingCart, Trash2, X, ArrowRight, Home } from "lucide-react";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import ProductQuickView from "../components/products/ProductQuickView";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function WishlistPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

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

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => addToCart(item));
  };

  const handleClearWishlist = () => {
    wishlistItems.forEach((item) => removeFromWishlist(item.name));
  };

  const subtotal = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-[#f7f7f8] font-sans text-[#191c1f]">
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

      <main>
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-sm text-gray-500 sm:px-6 lg:px-8">
            <Home className="h-4 w-4" />
            <span>Home</span>
            <span>/</span>
            <span className="font-medium text-[#2DA5F3]">Wishlist</span>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-[#FA8232]">
                Saved products
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-[#191c1f]">
                My Wishlist
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Review your favorite items and move them to cart anytime.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-sm text-gray-500">Items saved</p>
              <p className="mt-1 text-2xl font-semibold text-[#191c1f]">
                {wishlistCount}
              </p>
            </div>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF3EB]">
                <Heart className="h-7 w-7 text-[#FA8232]" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-[#191c1f]">
                Your wishlist is empty
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Looks like you have not added any products yet. Explore the
                store and save your favorites here.
              </p>
              <Link
                to="/shop-page"
                className="mt-6 bg-primary hover:bg-primary-600 text-white font-bold px-6 py-3 rounded text-sm inline-flex items-center gap-2"
              >
                Continue Shopping →
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="hidden grid-cols-[100px_1.4fr_0.8fr_0.7fr_0.8fr_56px] items-center border-b border-gray-200 bg-[#fdfdfd] px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 md:grid">
                  <span>Image</span>
                  <span>Product</span>
                  <span>Price</span>
                  <span>Status</span>
                  <span className="text-center">Action</span>
                  <span />
                </div>

                <div>
                  {wishlistItems.map((item, index) => (
                    <div
                      key={index}
                      className="grid gap-4 border-b border-gray-200 px-5 py-5 last:border-b-0 md:grid-cols-[100px_1.4fr_0.8fr_0.7fr_0.8fr_56px] md:items-center md:px-6"
                    >
                      <div className="h-24 w-24 overflow-hidden rounded-xl border border-gray-200 bg-white flex items-center justify-center">
                        {item.image && item.image.startsWith("http") ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-4xl">{item.image}</span>
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-[#FA8232]">
                          {item.category || "Product"}
                        </p>
                        <h3 className="mt-1 text-base font-semibold text-[#191c1f]">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => setQuickViewProduct(item)}
                          className="mt-2 text-sm font-medium text-[#2DA5F3] hover:underline"
                        >
                          Quick view
                        </button>
                      </div>

                      <div>
                        <p className="text-lg font-semibold text-[#191c1f]">
                          ${item.price}
                        </p>
                        {item.oldPrice && (
                          <p className="text-sm text-gray-400 line-through">
                            ${item.oldPrice}
                          </p>
                        )}
                      </div>

                      <div>
                        <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-green-50 text-green-600">
                          In Stock
                        </span>
                      </div>

                      <div className="md:text-center">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FA8232] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#e87428]"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to cart
                        </button>
                      </div>

                      <div className="flex md:justify-end">
                        <button
                          onClick={() => removeFromWishlist(item.name)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#191c1f]">
                  Wishlist Summary
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Total items</span>
                    <span className="font-medium text-[#191c1f]">
                      {wishlistCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Estimated value</span>
                    <span className="font-medium text-[#191c1f]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="my-6 border-t border-gray-200" />

                <button
                  onClick={handleAddAllToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#FA8232] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#e87428]"
                >
                  Add all to cart <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={handleClearWishlist}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-3 text-sm font-semibold text-[#191c1f] transition hover:bg-gray-50"
                >
                  Clear wishlist <Trash2 className="h-4 w-4" />
                </button>

                <p className="mt-4 text-xs leading-5 text-gray-500">
                  Saved products stay here until you remove them or move them to
                  cart.
                </p>
              </aside>
            </div>
          )}
        </section>
      </main>

      <Footer />

      <ProductQuickView
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct}
      />
    </div>
  );
}

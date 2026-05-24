import { useEffect, useState } from "react";
import TopBar from "../../components/layout/TopBar";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import { Home, X, Star, ShoppingCart, Heart } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_URL = API_URL.replace("/api", "");

function getImageUrl(image) {
  if (!image) return "/images/product-1.png";

  if (typeof image === "object") {
    image = image.url || image.path || image.image;
  }

  if (!image) return "/images/product-1.png";
  if (image.startsWith("http")) return image;
  if (image.startsWith("/uploads")) return `${SERVER_URL}${image}`;
  if (image.startsWith("uploads")) return `${SERVER_URL}/${image}`;

  return image;
}

function formatPrice(price) {
  if (price === undefined || price === null || price === "") return "$0";
  const cleanPrice = String(price).replace("$", "");
  return `$${cleanPrice}`;
}

function getBrand(product) {
  return product.brand?.name || product.brand || "N/A";
}

function getModel(product) {
  return product.model || product.sku || product.slug || "N/A";
}

function getStockStatus(product) {
  const inStock =
    product.stock > 0 ||
    product.inStock === true ||
    product.availability === "in_stock";

  return inStock ? "IN STOCK" : "OUT OF STOCK";
}

function getStockColor(product) {
  return getStockStatus(product) === "IN STOCK"
    ? "text-green-600"
    : "text-red-500";
}

function getRating(product) {
  return product.rating || product.averageRating || 5;
}

function getReviewCount(product) {
  return product.reviews || product.reviewCount || product.totalReviews || 0;
}

export default function ComparePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompareProducts();
  }, []);

  async function fetchCompareProducts() {
    try {
      setLoading(true);

      const localCompare = JSON.parse(localStorage.getItem("compare") || "[]");

      if (localCompare.length > 0) {
        setProducts(localCompare.slice(0, 3));
        return;
      }

      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();

      const productList = data.products || data.data || data || [];
      setProducts(productList.slice(0, 3));
    } catch (error) {
      console.error("Error fetching compare products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function removeFromCompare(productId) {
    const updatedProducts = products.filter(
      (product) => (product._id || product.id) !== productId
    );

    setProducts(updatedProducts);
    localStorage.setItem("compare", JSON.stringify(updatedProducts));
  }

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

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Home size={14} />
          <span>Home</span>
          <span>{">"}</span>
          <span className="text-blue-500">Compare</span>
        </div>
      </div>

      <main className="bg-white py-14">
        {loading ? (
          <div className="text-center text-gray-500 py-20">
            Loading compare products...
          </div>
        ) : products.length === 0 ? (
          <div className="max-w-5xl mx-auto border border-gray-200 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No products to compare.
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Add products to compare and they will appear here.
            </p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto border border-gray-200 overflow-x-auto">
            <div
              className="grid min-w-[900px]"
              style={{
                gridTemplateColumns: `180px repeat(${products.length}, minmax(220px, 1fr))`,
              }}
            >
              <div className="border-r border-gray-200" />

              {products.map((product) => {
                const productId = product._id || product.id;

                return (
                  <div
                    key={productId}
                    className="relative border-r border-gray-200 p-6"
                  >
                    <button
                      onClick={() => removeFromCompare(productId)}
                      className="absolute top-5 left-1/2 -translate-x-1/2 text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>

                    <div className="h-52 mt-8 flex items-center justify-center">
                      <img
                        src={getImageUrl(product.image || product.images?.[0])}
                        alt={product.name}
                        className="max-h-full object-contain"
                      />
                    </div>

                    <h3 className="text-sm text-gray-900 leading-5 min-h-[60px] mt-4">
                      {product.name}
                    </h3>

                    <div className="flex gap-2 mt-4">
                      <button
                        disabled={getStockStatus(product) === "OUT OF STOCK"}
                        className={`h-10 flex-1 text-xs font-semibold text-white flex items-center justify-center gap-2 ${
                          getStockStatus(product) === "OUT OF STOCK"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600"
                        }`}
                      >
                        ADD TO CART
                        <ShoppingCart size={15} />
                      </button>

                      <button className="w-10 h-10 border border-orange-200 text-orange-500 flex items-center justify-center hover:bg-orange-50">
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <CompareRow label="Customer feedback:" products={products}>
              {products.map((product) => (
                <div
                  key={product._id || product.id}
                  className="flex items-center gap-1"
                >
                  <div className="flex text-orange-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={13}
                        fill={star <= Math.round(getRating(product)) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({getReviewCount(product)})
                  </span>
                </div>
              ))}
            </CompareRow>

            <CompareRow label="Price:" products={products}>
              {products.map((product) => (
                <p
                  key={product._id || product.id}
                  className="text-lg font-semibold text-blue-500"
                >
                  {formatPrice(product.salePrice || product.price)}
                </p>
              ))}
            </CompareRow>

            <CompareRow label="Sold by:" products={products}>
              {products.map((product) => (
                <p key={product._id || product.id}>
                  {product.soldBy || product.vendor || getBrand(product)}
                </p>
              ))}
            </CompareRow>

            <CompareRow label="Brand:" products={products}>
              {products.map((product) => (
                <p key={product._id || product.id}>{getBrand(product)}</p>
              ))}
            </CompareRow>

            <CompareRow label="Model:" products={products}>
              {products.map((product) => (
                <p key={product._id || product.id}>{getModel(product)}</p>
              ))}
            </CompareRow>

            <CompareRow label="Stock status:" products={products}>
              {products.map((product) => (
                <p
                  key={product._id || product.id}
                  className={`font-semibold ${getStockColor(product)}`}
                >
                  {getStockStatus(product)}
                </p>
              ))}
            </CompareRow>

            <CompareRow label="Category:" products={products}>
              {products.map((product) => (
                <p key={product._id || product.id}>
                  {product.category?.name || product.category || "N/A"}
                </p>
              ))}
            </CompareRow>

            <CompareRow label="SKU:" products={products}>
              {products.map((product) => (
                <p key={product._id || product.id}>{product.sku || "N/A"}</p>
              ))}
            </CompareRow>

            <CompareRow label="Size:" products={products}>
              {products.map((product) => (
                <p key={product._id || product.id}>
                  {product.size || product.sizes?.[0] || "N/A"}
                </p>
              ))}
            </CompareRow>

            <CompareRow label="Weight:" products={products}>
              {products.map((product) => (
                <p key={product._id || product.id}>
                  {product.weight || "N/A"}
                </p>
              ))}
            </CompareRow>

            <CompareRow label="Description:" products={products}>
              {products.map((product) => (
                <p
                  key={product._id || product.id}
                  className="text-xs leading-5 text-gray-600"
                >
                  {product.description || "No description available."}
                </p>
              ))}
            </CompareRow>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function CompareRow({ label, children, products }) {
  return (
    <div
      className="grid min-w-[900px] text-sm"
      style={{
        gridTemplateColumns: `180px repeat(${products.length}, minmax(220px, 1fr))`,
      }}
    >
      <div className="bg-gray-100 border-r border-t border-gray-200 px-5 py-3 text-gray-600">
        {label}
      </div>

      {children.map((child, index) => (
        <div
          key={index}
          className="border-r border-t border-gray-200 px-5 py-3 text-gray-800"
        >
          {child}
        </div>
      ))}
    </div>
  );
}
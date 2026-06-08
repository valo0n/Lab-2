import { Children, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import { Home, X, Star, ShoppingCart, Heart } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_URL = API_URL.replace("/api", "");

function getProductId(product) {
  return product?._id || product?.id;
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

function formatPrice(price) {
  const number = Number(price || 0);
  return `$${number.toFixed(2)}`;
}

function getBrand(product) {
  return product?.brand?.name || product?.brand || "N/A";
}

function getCategory(product) {
  return product?.category?.name || product?.category || "N/A";
}

function getModel(product) {
  return product?.model || product?.sku || product?.slug || "N/A";
}

function getStockStatus(product) {
  const stockValue =
    product?.stock_quantity ??
    product?.stock ??
    product?.quantity ??
    product?.inventory ??
    0;

  const inStock =
    stockValue > 0 ||
    product?.inStock === true ||
    product?.availability === "in_stock";

  return inStock ? "IN STOCK" : "OUT OF STOCK";
}

function getStockColor(product) {
  return getStockStatus(product) === "IN STOCK"
    ? "text-green-600"
    : "text-red-500";
}

function getRating(product) {
  return Number(
    product?.avg_rating || product?.rating || product?.averageRating || 0,
  );
}

function getReviewCount(product) {
  return (
    product?.review_count ||
    product?.reviews ||
    product?.reviewCount ||
    product?.totalReviews ||
    product?._count?.reviews ||
    0
  );
}

function addToLocalStorageList(key, product) {
  const oldItems = JSON.parse(localStorage.getItem(key) || "[]");
  const productId = getProductId(product);

  const exists = oldItems.some(
    (item) => String(getProductId(item)) === String(productId),
  );

  if (!exists) {
    localStorage.setItem(key, JSON.stringify([...oldItems, product]));
  }
}

function readLocalStorageList(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn(`Invalid ${key} data in localStorage, resetting it.`, error);
    localStorage.removeItem(key);
    return [];
  }
}

export default function ComparePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCompareProducts();
  }, []);

  async function fetchCompareProducts() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await fetch(`${API_URL}/compare`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            const backendProducts =
              data.data || data.products || data.compare || [];

            if (Array.isArray(backendProducts) && backendProducts.length > 0) {
              const normalizedProducts = backendProducts.map((item) => {
                return item.product || item;
              });

              setProducts(normalizedProducts.slice(0, 3));
              return;
            }
          }
        } catch (backendError) {
          console.error("Backend compare failed:", backendError);
        }
      }

      const localCompare = readLocalStorageList("compare");

      if (Array.isArray(localCompare) && localCompare.length > 0) {
        setProducts(localCompare.slice(0, 3));
        return;
      }

      setProducts([]);
    } catch (error) {
      console.error("Error fetching compare products:", error);
      setError("Compare products could not be loaded.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  async function removeFromCompare(productId) {
    const token = localStorage.getItem("token");

    setProducts((currentProducts) => {
      const updatedProducts = currentProducts.filter(
        (product) => String(getProductId(product)) !== String(productId),
      );

      localStorage.setItem("compare", JSON.stringify(updatedProducts));
      return updatedProducts;
    });

    if (!token) return;

    try {
      await fetch(`${API_URL}/compare/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error removing compare product:", error);
    }
  }

  async function handleAddToCart(product) {
    const productId = getProductId(product);
    const token = localStorage.getItem("token");

    if (!token) {
      const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const existing = oldCart.find(
        (item) => String(getProductId(item)) === String(productId),
      );

      let newCart;

      if (existing) {
        newCart = oldCart.map((item) =>
          String(getProductId(item)) === String(productId)
            ? { ...item, quantity: Number(item.quantity || 1) + 1 }
            : item,
        );
      } else {
        newCart = [...oldCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      alert("Product added to cart");
      return;
    }

    try {
      setActionLoadingId(productId);

      const res = await fetch(`${API_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          productId,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product to cart");
      }

      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Could not add product to cart");
    } finally {
      setActionLoadingId(null);
    }
  }

  async function handleAddToWishlist(product) {
    const productId = getProductId(product);
    const token = localStorage.getItem("token");

    if (!token) {
      addToLocalStorageList("wishlist", product);
      alert("Product added to wishlist");
      return;
    }

    try {
      setActionLoadingId(productId);

      const res = await fetch(`${API_URL}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          productId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product to wishlist");
      }

      alert("Product added to wishlist");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      addToLocalStorageList("wishlist", product);
      alert("Product added to wishlist");
    } finally {
      setActionLoadingId(null);
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
        ) : error ? (
          <div className="max-w-5xl mx-auto border border-red-200 bg-red-50 p-10 text-center">
            <h2 className="text-xl font-semibold text-red-600">{error}</h2>
          </div>
        ) : products.length === 0 ? (
          <div className="max-w-5xl mx-auto border border-gray-200 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No products to compare.
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add products to compare and they will appear here.
            </p>

            <Link
              to="/shop-page"
              className="mt-5 inline-block bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              GO TO SHOP
            </Link>
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
                const productId = getProductId(product);
                const isOutOfStock = getStockStatus(product) === "OUT OF STOCK";

                return (
                  <div
                    key={productId}
                    className="relative border-r border-gray-200 p-6"
                  >
                    <button
                      type="button"
                      onClick={() => removeFromCompare(productId)}
                      className="absolute top-5 left-1/2 -translate-x-1/2 text-gray-400 hover:text-red-500"
                      title="Remove from compare"
                    >
                      <X size={16} />
                    </button>

                    <Link
                      to={`/products/${product.slug || productId}`}
                      className="h-52 mt-8 flex items-center justify-center"
                    >
                      <img
                        src={getImageUrl(getProductImage(product))}
                        alt={product.name}
                        className="max-h-full object-contain"
                      />
                    </Link>

                    <Link to={`/products/${product.slug || productId}`}>
                      <h3 className="text-sm text-gray-900 leading-5 min-h-[60px] mt-4 hover:text-orange-500">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex gap-2 mt-4">
                      <button
                        type="button"
                        disabled={isOutOfStock || actionLoadingId === productId}
                        onClick={() => handleAddToCart(product)}
                        className={`h-10 flex-1 text-xs font-semibold text-white flex items-center justify-center gap-2 ${
                          isOutOfStock
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600"
                        } disabled:opacity-60`}
                      >
                        ADD TO CART
                        <ShoppingCart size={15} />
                      </button>

                      <button
                        type="button"
                        disabled={actionLoadingId === productId}
                        onClick={() => handleAddToWishlist(product)}
                        className="w-10 h-10 border border-orange-200 text-orange-500 flex items-center justify-center hover:bg-orange-50 disabled:opacity-60"
                        title="Add to wishlist"
                      >
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <CompareRow label="Customer feedback:" products={products}>
              {products.map((product) => {
                const rating = getRating(product);

                return (
                  <div
                    key={getProductId(product)}
                    className="flex items-center gap-1"
                  >
                    <div className="flex text-orange-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={13}
                          fill={
                            star <= Math.round(rating || 5)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>

                    <span className="text-xs text-gray-500">
                      ({getReviewCount(product)})
                    </span>
                  </div>
                );
              })}
            </CompareRow>

            <CompareRow label="Price:" products={products}>
              {products.map((product) => (
                <p
                  key={getProductId(product)}
                  className="text-lg font-semibold text-blue-500"
                >
                  {formatPrice(
                    product.salePrice ||
                      product.sale_price ||
                      product.discount_price ||
                      product.price,
                  )}
                </p>
              ))}
            </CompareRow>

            <CompareRow label="Sold by:" products={products}>
              {products.map((product) => (
                <p key={getProductId(product)}>
                  {product.soldBy || product.vendor || getBrand(product)}
                </p>
              ))}
            </CompareRow>

            <CompareRow label="Brand:" products={products}>
              {products.map((product) => (
                <p key={getProductId(product)}>{getBrand(product)}</p>
              ))}
            </CompareRow>

            <CompareRow label="Model:" products={products}>
              {products.map((product) => (
                <p key={getProductId(product)}>{getModel(product)}</p>
              ))}
            </CompareRow>

            <CompareRow label="Stock status:" products={products}>
              {products.map((product) => (
                <p
                  key={getProductId(product)}
                  className={`font-semibold ${getStockColor(product)}`}
                >
                  {getStockStatus(product)}
                </p>
              ))}
            </CompareRow>

            <CompareRow label="Category:" products={products}>
              {products.map((product) => (
                <p key={getProductId(product)}>{getCategory(product)}</p>
              ))}
            </CompareRow>

            <CompareRow label="SKU:" products={products}>
              {products.map((product) => (
                <p key={getProductId(product)}>{product.sku || "N/A"}</p>
              ))}
            </CompareRow>

            <CompareRow label="Size:" products={products}>
              {products.map((product) => (
                <p key={getProductId(product)}>
                  {product.size ||
                    product.sizes?.[0] ||
                    product.variants?.[0]?.size ||
                    "N/A"}
                </p>
              ))}
            </CompareRow>

            <CompareRow label="Weight:" products={products}>
              {products.map((product) => (
                <p key={getProductId(product)}>{product.weight || "N/A"}</p>
              ))}
            </CompareRow>

            <CompareRow label="Description:" products={products}>
              {products.map((product) => (
                <p
                  key={getProductId(product)}
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
  const childrenArray = Children.toArray(children);

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

      {childrenArray.map((child, index) => (
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

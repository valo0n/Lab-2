import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import ProductReviews from "../../components/common/ProductReviews";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_URL = API_URL.replace("/api", "");

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

function formatPrice(price) {
  const number = Number(price || 0);
  return `$${number.toFixed(2)}`;
}

function getProductId(product) {
  return product?._id || product?.id;
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

function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug || product.id}`}
      className="flex items-center gap-3 rounded border border-gray-200 bg-white p-3 hover:shadow-sm transition"
    >
      <img
        src={getImageUrl(getProductImage(product))}
        alt={product.name}
        className="h-16 w-16 rounded object-contain"
      />

      <div>
        <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h4>

        <p className="mt-1 text-sm font-semibold text-sky-600">
          {formatPrice(product.salePrice || product.price)}
        </p>
      </div>
    </Link>
  );
}

export default function ProductDetailsPage() {
  const { slug } = useParams();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedMemory, setSelectedMemory] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  async function fetchProduct() {
    if (!slug) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/products/${slug}`);

      if (!res.ok) {
        throw new Error("Product not found");
      }

      const data = await res.json();
      const productData = data.product || data.data || data;

      setProduct(productData);

      // Regjistro shikimin te Browsing History (MongoDB) — vetëm për usera të loguar
      const browseToken = sessionStorage.getItem("token");
      if (browseToken && productData?.id) {
        fetch(`${API_URL}/users/browsing`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${browseToken}`,
          },
          body: JSON.stringify({
            product_id: productData.id,
            product_name: productData.name,
            product_slug: productData.slug,
            product_image: productData.images?.[0]?.image_url || null,
            product_price: productData.price,
            compare_price: productData.compare_price || null,
            category: productData.category?.name || null,
            brand: productData.brand?.name || null,
          }),
        }).catch(() => {});
      }

      const images =
        Array.isArray(productData.images) && productData.images.length > 0
          ? productData.images.map((img) => getImageUrl(img))
          : [getImageUrl(productData.image)];

      setProductImages(images);
      setSelectedImage(images[0]);

      const variants = Array.isArray(productData.variants)
        ? productData.variants
        : [];

      const colors = productData.colors || [
        ...new Set(variants.map((v) => v.color).filter(Boolean)),
      ];

      const sizes = productData.sizes || [
        ...new Set(variants.map((v) => v.size).filter(Boolean)),
      ];

      const memories = productData.memoryOptions || [
        ...new Set(variants.map((v) => v.memory).filter(Boolean)),
      ];

      const storages = productData.storageOptions || [
        ...new Set(variants.map((v) => v.storage).filter(Boolean)),
      ];

      setSelectedColor(colors[0] || "");
      setSelectedSize(sizes[0] || "");
      setSelectedMemory(memories[0] || "");
      setSelectedStorage(storages[0] || "");

      await fetchRelatedProducts(productData);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Product could not be loaded.");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRelatedProducts(productData) {
    try {
      const productId = getProductId(productData);

      if (!productId) {
        setRelatedProducts([]);
        return;
      }

      const relatedRes = await fetch(
        `${API_URL}/products/${productId}/related`,
      );

      if (relatedRes.ok) {
        const relatedData = await relatedRes.json();
        const related =
          relatedData.products || relatedData.data || relatedData || [];

        if (Array.isArray(related)) {
          setRelatedProducts(related);
          return;
        }
      }

      throw new Error("Related endpoint failed");
    } catch (err) {
      try {
        const categoryId = productData.category_id || productData.category?.id;

        const fallbackUrl = categoryId
          ? `${API_URL}/products?category=${categoryId}&limit=8`
          : `${API_URL}/products?limit=8`;

        const fallbackRes = await fetch(fallbackUrl);
        const fallbackData = await fallbackRes.json();

        const list = fallbackData.data || fallbackData.products || [];

        setRelatedProducts(
          list.filter(
            (item) =>
              String(getProductId(item)) !== String(getProductId(productData)),
          ),
        );
      } catch (fallbackError) {
        console.error("Error fetching related products:", fallbackError);
        setRelatedProducts([]);
      }
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

  const handleAddToWishlist = async () => {
    if (!product) return;

    const token = sessionStorage.getItem("token");

    if (!token) {
      addToLocalStorageList("wishlist", product);
      alert("Product added to wishlist");
      return;
    }

    try {
      setActionLoading(true);

      const res = await fetch(`${API_URL}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: getProductId(product),
          productId: getProductId(product),
        }),
      });

      if (!res.ok) throw new Error("Failed to add to wishlist");

      alert("Product added to wishlist");
    } catch (err) {
      console.error("Wishlist error:", err);
      addToLocalStorageList("wishlist", product);
      alert("Product added to wishlist");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddToCompare = async () => {
    if (!product) return;

    const token = sessionStorage.getItem("token");

    if (!token) {
      addToLocalStorageList("compare", product);
      alert("Product added to compare");
      return;
    }

    try {
      setActionLoading(true);

      const res = await fetch(`${API_URL}/compare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: getProductId(product),
          productId: getProductId(product),
        }),
      });

      if (!res.ok) throw new Error("Failed to add to compare");

      alert("Product added to compare");
    } catch (err) {
      console.error("Compare error:", err);
      addToLocalStorageList("compare", product);
      alert("Product added to compare");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    const token = sessionStorage.getItem("token");

    if (!token) {
      const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const productId = getProductId(product);

      const exists = oldCart.find(
        (item) => String(getProductId(item)) === String(productId),
      );

      let newCart;

      if (exists) {
        newCart = oldCart.map((item) =>
          String(getProductId(item)) === String(productId)
            ? { ...item, quantity: Number(item.quantity || 1) + quantity }
            : item,
        );
      } else {
        newCart = [...oldCart, { ...product, quantity }];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      alert("Product added to cart");
      return;
    }

    try {
      setActionLoading(true);

      const res = await fetch(`${API_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: getProductId(product),
          productId: getProductId(product),
          quantity,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      alert("Product added to cart");
    } catch (err) {
      console.error("Cart error:", err);
      alert("Could not add product to cart");
    } finally {
      setActionLoading(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    window.location.href = "/cart";
  };

  const brandName = product?.brand?.name || product?.brand || "N/A";
  const categoryName = product?.category?.name || product?.category || "N/A";

  const stockValue =
    product?.stock_quantity ??
    product?.stock ??
    product?.quantity ??
    product?.inventory ??
    0;

  const isInStock = stockValue > 0 || product?.inStock === true;

  const rating = Number(product?.avg_rating || product?.rating || 0);
  const reviewCount =
    product?.review_count || product?.reviews || product?._count?.reviews || 0;

  const colorOptions = useMemo(() => {
    if (Array.isArray(product?.colors) && product.colors.length > 0) {
      return product.colors;
    }

    if (Array.isArray(product?.variants)) {
      return [...new Set(product.variants.map((v) => v.color).filter(Boolean))];
    }

    return [];
  }, [product]);

  const sizeOptions = useMemo(() => {
    if (Array.isArray(product?.sizes) && product.sizes.length > 0) {
      return product.sizes;
    }

    if (Array.isArray(product?.variants)) {
      return [...new Set(product.variants.map((v) => v.size).filter(Boolean))];
    }

    return [];
  }, [product]);

  const memoryOptions = useMemo(() => {
    if (
      Array.isArray(product?.memoryOptions) &&
      product.memoryOptions.length > 0
    ) {
      return product.memoryOptions;
    }

    if (Array.isArray(product?.variants)) {
      return [
        ...new Set(product.variants.map((v) => v.memory).filter(Boolean)),
      ];
    }

    return [];
  }, [product]);

  const storageOptions = useMemo(() => {
    if (
      Array.isArray(product?.storageOptions) &&
      product.storageOptions.length > 0
    ) {
      return product.storageOptions;
    }

    if (Array.isArray(product?.variants)) {
      return [
        ...new Set(product.variants.map((v) => v.storage).filter(Boolean)),
      ];
    }

    return [];
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <TopBar />
        <Header />
        <Navigation />
        <div className="py-20 text-center text-gray-500">
          Loading product...
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <TopBar />
        <Header />
        <Navigation />
        <div className="py-20 text-center">
          <p className="text-gray-500">{error || "Product not found."}</p>
          <Link
            to="/shop-page"
            className="mt-4 inline-block rounded bg-orange-500 px-5 py-2 text-sm font-semibold text-white"
          >
            Back to shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
                alt={product.name}
                className="h-[420px] w-full object-contain"
              />
            </div>

            <div className="mt-4 flex items-center gap-3 overflow-x-auto">
              {productImages.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded border p-1 ${
                    selectedImage === img
                      ? "border-orange-500 ring-1 ring-orange-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full rounded object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex text-sm text-orange-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= Math.round(rating || 5) ? "★" : "☆"}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-500">
                {rating || 5} Star Rating | {reviewCount} User feedback
              </p>
            </div>

            <h1 className="text-2xl font-semibold leading-snug text-gray-900">
              {product.name}
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              SKU: <span className="text-gray-700">{product.sku || "N/A"}</span>
            </p>

            <p className="text-sm text-gray-500">
              Brand: <span className="text-gray-700">{brandName}</span>
            </p>

            <p
              className={`mt-1 text-sm font-medium ${
                isInStock ? "text-green-600" : "text-red-500"
              }`}
            >
              Availability: {isInStock ? "In Stock" : "Out of Stock"}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Category: <span className="text-gray-700">{categoryName}</span>
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-bold text-sky-600">
                {formatPrice(
                  product.salePrice || product.sale_price || product.price,
                )}
              </span>

              {(product.oldPrice ||
                product.old_price ||
                product.compare_at_price) && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(
                    product.oldPrice ||
                      product.old_price ||
                      product.compare_at_price,
                  )}
                </span>
              )}

              {product.discount && (
                <span className="rounded bg-yellow-400 px-2 py-1 text-xs font-semibold text-gray-900">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {(colorOptions.length > 0 ||
              sizeOptions.length > 0 ||
              memoryOptions.length > 0 ||
              storageOptions.length > 0) && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {colorOptions.length > 0 && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Color
                    </label>

                    <div className="flex items-center gap-3">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`h-7 w-7 rounded-full border-2 ${
                            selectedColor === color
                              ? "border-orange-500"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {sizeOptions.length > 0 && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Size
                    </label>

                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
                    >
                      {sizeOptions.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {memoryOptions.length > 0 && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Memory
                    </label>

                    <select
                      value={selectedMemory}
                      onChange={(e) => setSelectedMemory(e.target.value)}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
                    >
                      {memoryOptions.map((memory) => (
                        <option key={memory} value={memory}>
                          {memory}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {storageOptions.length > 0 && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Storage
                    </label>

                    <select
                      value={selectedStorage}
                      onChange={(e) => setSelectedStorage(e.target.value)}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
                    >
                      {storageOptions.map((storage) => (
                        <option key={storage} value={storage}>
                          {storage}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex w-fit items-center rounded border border-gray-300">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="px-4 py-2 text-lg text-gray-700"
                >
                  -
                </button>

                <span className="border-x border-gray-300 px-5 py-2 text-sm font-medium">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="px-4 py-2 text-lg text-gray-700"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={actionLoading || !isInStock}
                className="rounded bg-orange-500 px-8 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ADD TO CART
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={actionLoading || !isInStock}
                className="rounded border border-orange-500 px-8 py-3 text-sm font-semibold text-orange-500 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                BUY NOW
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-600">
              <button
                type="button"
                onClick={handleAddToWishlist}
                className="hover:text-orange-500"
              >
                ♡ Add to Wishlist
              </button>

              <button
                type="button"
                onClick={handleAddToCompare}
                className="hover:text-orange-500"
              >
                ⇄ Add to Compare
              </button>

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
                <span className="rounded bg-white px-2 py-1 border">
                  MasterCard
                </span>
                <span className="rounded bg-white px-2 py-1 border">
                  PayPal
                </span>
                <span className="rounded bg-white px-2 py-1 border">Amex</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white p-6 shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap gap-6 text-sm font-medium uppercase tracking-wide">
              {[
                "description",
                "additional information",
                "specification",
                "review",
              ].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`border-b-2 pb-3 ${
                    activeTab === tab
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab !== "review" && (
            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <h3 className="mb-3 text-base font-semibold text-gray-900">
                  Description
                </h3>

                <p className="text-sm leading-7 text-gray-600">
                  {product.description ||
                    "No description available for this product."}
                </p>

                {(product.longDescription || product.long_description) && (
                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    {product.longDescription || product.long_description}
                  </p>
                )}
              </div>

              <div>
                <h3 className="mb-3 text-base font-semibold text-gray-900">
                  Feature
                </h3>

                <ul className="space-y-3 text-sm text-gray-600">
                  {(Array.isArray(product.features) &&
                  product.features.length > 0
                    ? product.features
                    : [
                        "Free 1 Year Warranty",
                        "Free Shipping & Fasted Delivery",
                        "100% Money-back guarantee",
                        "24/7 Customer support",
                        "Secure payment method",
                      ]
                  ).map((feature) => (
                    <li key={feature}>✔ {feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-base font-semibold text-gray-900">
                  Shipping Information
                </h3>

                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">Courier:</span>{" "}
                    2-4 days, free shipping
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Local Shipping:
                    </span>{" "}
                    up to one week, $19.00
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      UPS Ground Shipping:
                    </span>{" "}
                    4-6 days, $29.00
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Unishop Global Export:
                    </span>{" "}
                    3-4 days, $39.00
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "review" && <ProductReviews productId={product.id} />}
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
                Related Product
              </h3>

              <div className="space-y-3">
                {relatedProducts.slice(0, 4).map((item) => (
                  <ProductCard key={getProductId(item)} product={item} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
                Product Accessories
              </h3>

              <div className="space-y-3">
                {relatedProducts.slice(0, 4).map((item) => (
                  <ProductCard
                    key={`acc-${getProductId(item)}`}
                    product={item}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
                Similar Products
              </h3>

              <div className="space-y-3">
                {relatedProducts.slice(0, 4).map((item) => (
                  <ProductCard
                    key={`similar-${getProductId(item)}`}
                    product={item}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
                Featured Products
              </h3>

              <div className="space-y-3">
                {relatedProducts.slice(0, 4).map((item) => (
                  <ProductCard
                    key={`feat-${getProductId(item)}`}
                    product={item}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

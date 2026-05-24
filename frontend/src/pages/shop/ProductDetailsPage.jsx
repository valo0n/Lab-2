import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";

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

function ProductCard({ product }) {
  return (
    <div className="flex items-center gap-3 rounded border border-gray-200 bg-white p-3 hover:shadow-sm transition">
      <img
        src={getImageUrl(product.image || product.images?.[0])}
        alt={product.name}
        className="h-16 w-16 rounded object-cover"
      />
      <div>
        <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h4>
        <p className="mt-1 text-sm font-semibold text-sky-600">
          {formatPrice(product.salePrice || product.price)}
        </p>
      </div>
    </div>
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
  const [selectedColor, setSelectedColor] = useState("orange");
  const [selectedSize, setSelectedSize] = useState("14-inch Liquid Retina XDR display");
  const [selectedMemory, setSelectedMemory] = useState("16GB unified memory");
  const [selectedStorage, setSelectedStorage] = useState("1TB SSD Storage");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/products/${slug}`);
        const data = await res.json();

        const productData = data.product || data.data || data;
        setProduct(productData);

        const images =
          productData.images && productData.images.length > 0
            ? productData.images.map((img) => getImageUrl(img))
            : [getImageUrl(productData.image)];

        setProductImages(images);
        setSelectedImage(images[0]);

        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }

        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }

        if (productData.memoryOptions && productData.memoryOptions.length > 0) {
          setSelectedMemory(productData.memoryOptions[0]);
        }

        if (productData.storageOptions && productData.storageOptions.length > 0) {
          setSelectedStorage(productData.storageOptions[0]);
        }

        const productId = productData._id || productData.id;

        if (productId) {
          const relatedRes = await fetch(`${API_URL}/products/${productId}/related`);
          const relatedData = await relatedRes.json();

          setRelatedProducts(
            relatedData.products || relatedData.data || relatedData || []
          );
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

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

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <TopBar />
        <Header />
        <Navigation />
        <div className="py-20 text-center text-gray-500">
          Product not found.
        </div>
        <Footer />
      </div>
    );
  }

  const brandName = product.brand?.name || product.brand || "N/A";
  const categoryName = product.category?.name || product.category || "N/A";
  const isInStock = product.stock > 0 || product.inStock === true;

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
              <p className="text-sm text-gray-500">
                {product.rating || 5} Star Rating | {product.reviews || product.reviewCount || 0} User feedback
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
            <p className="mt-1 text-sm text-green-600 font-medium">
              Availability: {isInStock ? "In Stock" : "Out of Stock"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Category: <span className="text-gray-700">{categoryName}</span>
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-bold text-sky-600">
                {formatPrice(product.salePrice || product.price)}
              </span>

              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}

              {product.discount && (
                <span className="rounded bg-yellow-400 px-2 py-1 text-xs font-semibold text-gray-900">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  {(product.colors && product.colors.length > 0
                    ? product.colors
                    : ["orange", "gray", "zinc"]
                  ).map((color) => (
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
                            : color === "zinc"
                            ? "#9ca3af"
                            : color,
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
                  {(product.sizes && product.sizes.length > 0
                    ? product.sizes
                    : [
                        "14-inch Liquid Retina XDR display",
                        "13-inch Retina display",
                        "16-inch Liquid Retina display",
                      ]
                  ).map((size) => (
                    <option key={size}>{size}</option>
                  ))}
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
                  {(product.memoryOptions && product.memoryOptions.length > 0
                    ? product.memoryOptions
                    : [
                        "16GB unified memory",
                        "8GB unified memory",
                        "32GB unified memory",
                      ]
                  ).map((memory) => (
                    <option key={memory}>{memory}</option>
                  ))}
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
                  {(product.storageOptions && product.storageOptions.length > 0
                    ? product.storageOptions
                    : [
                        "1TB SSD Storage",
                        "256GB SSD Storage",
                        "512GB SSD Storage",
                      ]
                  ).map((storage) => (
                    <option key={storage}>{storage}</option>
                  ))}
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

              <button
                onClick={() => {
                  const existingCompare = JSON.parse(localStorage.getItem("compare") || "[]");

                  const productId = product._id || product.id;

                  const alreadyExists = existingCompare.some(
                    (item) => (item._id || item.id) === productId
                  );

                  if (!alreadyExists) {
                    const updatedCompare = [...existingCompare, product].slice(0, 3);
                    localStorage.setItem("compare", JSON.stringify(updatedCompare));
                  }
                }}
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
              <h3 className="mb-3 text-base font-semibold text-gray-900">
                Description
              </h3>
              <p className="text-sm leading-7 text-gray-600">
                {product.description || "No description available for this product."}
              </p>

              {product.longDescription && (
                <p className="mt-4 text-sm leading-7 text-gray-600">
                  {product.longDescription}
                </p>
              )}
            </div>

            <div>
              <h3 className="mb-3 text-base font-semibold text-gray-900">
                Feature
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {(product.features && product.features.length > 0
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
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
              Product Accessories
            </h3>
            <div className="space-y-3">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={`acc-${product._id || product.id}`}
                  product={product}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
              Apple Product
            </h3>
            <div className="space-y-3">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={`apple-${product._id || product.id}`}
                  product={product}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
              Featured Products
            </h3>
            <div className="space-y-3">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={`feat-${product._id || product.id}`}
                  product={product}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
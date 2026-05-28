import { useEffect, useMemo, useState } from "react";
import TopBar from "../../components/layout/TopBar";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import { Home, Search, Star, Heart, Eye, ShoppingCart } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_URL = API_URL.replace("/api", "");

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  });

  const limit = 12;

  useEffect(() => {
    fetchSidebarData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, selectedCategory, selectedBrand, sort, minPrice, maxPrice]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchProducts(1);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const fetchSidebarData = async () => {
    try {
      setSidebarLoading(true);

      const [categoryRes, brandRes] = await Promise.all([
        fetch(`${API_URL}/categories/tree`),
        fetch(`${API_URL}/brands`),
      ]);

      const categoryData = await categoryRes.json();
      const brandData = await brandRes.json();

      setCategories(categoryData.data || categoryData.categories || []);
      setBrands(brandData.data || brandData.brands || []);
    } catch (err) {
      console.error("Error fetching sidebar data:", err);
    } finally {
      setSidebarLoading(false);
    }
  };

  const fetchProducts = async (customPage = page) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.set("page", customPage);
      params.set("limit", limit);

      if (search.trim()) params.set("search", search.trim());
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedBrand) params.set("brand", selectedBrand);
      if (sort) params.set("sort", sort);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);

      const res = await fetch(`${API_URL}/products?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();

      const productList = data.data || data.products || [];
      const pagination = data.meta || {
        page: customPage,
        limit,
        total: productList.length,
        totalPages: 1,
      };

      setProducts(Array.isArray(productList) ? productList : []);
      setMeta(pagination);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Products could not be loaded.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "/images/product-1.png";

    let imagePath = image;

    if (typeof image === "object") {
      imagePath =
        image.url ||
        image.image_url ||
        image.path ||
        image.src ||
        image.filename ||
        "";
    }

    if (!imagePath) return "/images/product-1.png";
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("/uploads")) return `${SERVER_URL}${imagePath}`;
    if (imagePath.startsWith("uploads")) return `${SERVER_URL}/${imagePath}`;

    return imagePath;
  };

  const getPrimaryImage = (product) => {
    if (product.image) return product.image;

    if (Array.isArray(product.images) && product.images.length > 0) {
      const primary = product.images.find((img) => img.is_primary);
      return primary || product.images[0];
    }

    return null;
  };

  const getRating = (product) => {
    return Number(product.avg_rating || product.rating || 0);
  };

  const getReviewCount = (product) => {
    return product.review_count || product.reviews || product._count?.reviews || 0;
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  const handleBrandChange = (brandId) => {
    setSelectedBrand((prev) => (prev === brandId ? "" : brandId));
    setPage(1);
  };

  const handlePricePreset = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedBrand("");
    setSort("newest");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  const addToLocalStorageList = (key, product) => {
    const oldItems = JSON.parse(localStorage.getItem(key) || "[]");
    const exists = oldItems.some((item) => String(item.id) === String(product.id));

    if (!exists) {
      localStorage.setItem(key, JSON.stringify([...oldItems, product]));
    }
  };

  const handleAddToWishlist = (product) => {
    addToLocalStorageList("wishlist", product);
    alert("Product added to wishlist");
  };

  const handleAddToCompare = (product) => {
    addToLocalStorageList("compare", product);
    alert("Product added to compare");
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = oldCart.find((item) => String(item.id) === String(product.id));

      let newCart;

      if (existing) {
        newCart = oldCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        newCart = [...oldCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      alert("Product added to cart");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product to cart");
      }

      alert("Product added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Could not add product to cart");
    }
  };

  const visiblePages = useMemo(() => {
    const totalPages = Number(meta.totalPages || 1);
    const currentPage = Number(meta.page || page);

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [meta, page]);

  const activeCategoryName = useMemo(() => {
    if (!selectedCategory) return "All Products";

    const flatCategories = categories.flatMap((cat) => [
      cat,
      ...(cat.subcategories || []),
    ]);

    return (
      flatCategories.find((cat) => String(cat.id) === String(selectedCategory))
        ?.name || "Selected Category"
    );
  }, [categories, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopBar />
      <Header />
      <Navigation />

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Home size={14} />
          <span>Home</span>
          <span>{">"}</span>
          <span>Shop</span>
          <span>{">"}</span>
          <span className="text-blue-500">{activeCategoryName}</span>
        </div>
      </div>

      <main className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <aside>
            <FilterSection title="CATEGORY">
              <label className="flex items-center gap-2 text-sm text-gray-600 mb-3 cursor-pointer">
                <input
                  type="radio"
                  name="cat"
                  checked={selectedCategory === ""}
                  onChange={() => handleCategoryChange("")}
                  className="accent-orange-500"
                />
                All Categories
              </label>

              {sidebarLoading ? (
                <p className="text-sm text-gray-400">Loading categories...</p>
              ) : (
                categories.map((category) => (
                  <div key={category.id}>
                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-3 cursor-pointer">
                      <input
                        type="radio"
                        name="cat"
                        checked={String(selectedCategory) === String(category.id)}
                        onChange={() => handleCategoryChange(String(category.id))}
                        className="accent-orange-500"
                      />
                      {category.name}
                      {category._count?.products !== undefined && (
                        <span className="text-xs text-gray-400">
                          ({category._count.products})
                        </span>
                      )}
                    </label>

                    {category.subcategories?.map((sub) => (
                      <label
                        key={sub.id}
                        className="flex items-center gap-2 text-sm text-gray-500 mb-3 ml-5 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="cat"
                          checked={String(selectedCategory) === String(sub.id)}
                          onChange={() => handleCategoryChange(String(sub.id))}
                          className="accent-orange-500"
                        />
                        {sub.name}
                      </label>
                    ))}
                  </div>
                ))
              )}
            </FilterSection>

            <FilterSection title="PRICE RANGE">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <input
                  placeholder="Min price"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setPage(1);
                  }}
                  type="number"
                  min="0"
                  className="border px-3 py-2 text-sm outline-none"
                />
                <input
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setPage(1);
                  }}
                  type="number"
                  min="0"
                  className="border px-3 py-2 text-sm outline-none"
                />
              </div>

              {[
                { label: "All Price", min: "", max: "" },
                { label: "Under $25", min: "", max: "25" },
                { label: "$25 to $100", min: "25", max: "100" },
                { label: "$100 to $300", min: "100", max: "300" },
                { label: "$300 to $500", min: "300", max: "500" },
                { label: "$500 to $1,000", min: "500", max: "1000" },
              ].map((item) => (
                <label
                  key={item.label}
                  className="flex items-center gap-2 text-sm text-gray-600 mb-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="price"
                    checked={minPrice === item.min && maxPrice === item.max}
                    onChange={() => handlePricePreset(item.min, item.max)}
                    className="accent-orange-500"
                  />
                  {item.label}
                </label>
              ))}
            </FilterSection>

            <FilterSection title="POPULAR BRANDS">
              {sidebarLoading ? (
                <p className="text-sm text-gray-400">Loading brands...</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {brands.map((brand) => (
                    <label
                      key={brand.id}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={String(selectedBrand) === String(brand.id)}
                        onChange={() => handleBrandChange(String(brand.id))}
                        className="accent-orange-500"
                      />
                      {brand.name}
                    </label>
                  ))}
                </div>
              )}
            </FilterSection>

            <FilterSection title="POPULAR TAG">
              <div className="flex flex-wrap gap-2">
                {["Game", "Phone", "TV", "Laptop", "SSD", "Graphics Card", "Power Bank"].map(
                  (tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSearch(tag);
                        setPage(1);
                      }}
                      className="border px-3 py-1 text-xs text-gray-600 hover:border-orange-500 hover:text-orange-500"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </FilterSection>

            <button
              type="button"
              onClick={clearFilters}
              className="w-full border border-orange-500 text-orange-500 py-3 text-sm font-semibold hover:bg-orange-50"
            >
              CLEAR FILTERS
            </button>

            <div className="border border-orange-200 p-4 text-center mt-6">
              <img src="/images/watch-ad.png" alt="" className="mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">
                Heavy on Features. Light on Price.
              </h3>
              <p className="text-sm text-gray-500 my-2">
                Only for: <span className="bg-yellow-300 px-2 py-1">$299 USD</span>
              </p>
              <button className="w-full bg-orange-500 text-white py-3 text-sm font-semibold mt-3">
                SHOP NOW
              </button>
            </div>
          </aside>

          <section>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="relative w-full md:w-[430px]">
                <input
                  placeholder="Search for anything..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-200 h-11 px-4 pr-10 text-sm outline-none"
                />
                <Search size={18} className="absolute right-3 top-3 text-gray-500" />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className="border border-gray-200 h-10 px-3 text-sm outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Best Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 px-4 py-3 flex flex-col sm:flex-row sm:justify-between gap-2 text-sm mb-5">
              <span className="text-gray-600">
                Active Filters:{" "}
                <b className="text-gray-900">
                  {activeCategoryName}
                  {selectedBrand &&
                    ` / ${
                      brands.find((b) => String(b.id) === String(selectedBrand))?.name ||
                      "Brand"
                    }`}
                </b>
              </span>
              <span className="text-gray-600">
                <b className="text-gray-900">{meta.total || products.length}</b> Results found.
              </span>
            </div>

            {error && (
              <div className="border border-red-200 bg-red-50 text-red-600 px-4 py-3 text-sm mb-5">
                {error}
              </div>
            )}

            {loading ? (
              <p className="text-center py-10 text-gray-500">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-center py-10 text-gray-500">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {products.map((product) => {
                  const rating = getRating(product);
                  const reviewCount = getReviewCount(product);

                  return (
                    <div
                      key={product._id || product.id}
                      className="border border-gray-200 p-3 relative group bg-white"
                    >
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-semibold px-2 py-1 z-10">
                          {product.badge}
                        </span>
                      )}

                      {product.is_featured && !product.badge && (
                        <span className="absolute top-3 left-3 bg-blue-500 text-white text-[10px] font-semibold px-2 py-1 z-10">
                          FEATURED
                        </span>
                      )}

                      <a
                        href={`/products/${product.slug || product.id}`}
                        className="h-40 flex items-center justify-center mb-3"
                      >
                        <img
                          src={getImageUrl(getPrimaryImage(product))}
                          alt={product.name}
                          className="max-h-full object-contain"
                        />
                      </a>

                      <div className="flex text-orange-400 mb-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            size={13}
                            fill={i <= Math.round(rating) ? "currentColor" : "none"}
                          />
                        ))}
                        <span className="text-gray-400 text-xs ml-1">
                          ({reviewCount})
                        </span>
                      </div>

                      <a href={`/products/${product.slug || product.id}`}>
                        <h3 className="text-sm text-gray-800 leading-5 min-h-[42px] hover:text-orange-500">
                          {product.name}
                        </h3>
                      </a>

                      <p className="text-sm font-semibold text-blue-500 mt-2">
                        ${Number(product.price || 0).toFixed(2)}
                      </p>

                      <div className="absolute inset-0 bg-white/70 hidden group-hover:flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddToWishlist(product)}
                          className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-orange-500 hover:text-white"
                          title="Add to wishlist"
                        >
                          <Heart size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="w-10 h-10 rounded-full bg-orange-500 text-white shadow flex items-center justify-center"
                          title="Add to cart"
                        >
                          <ShoppingCart size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAddToCompare(product)}
                          className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-orange-500 hover:text-white"
                          title="Add to compare"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {meta.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="w-9 h-9 border rounded-full text-orange-500 disabled:opacity-40"
                >
                  ‹
                </button>

                {visiblePages.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-full text-sm ${
                      n === Number(meta.page || page)
                        ? "bg-orange-500 text-white"
                        : "border text-gray-600"
                    }`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={page >= meta.totalPages}
                  onClick={() =>
                    setPage((prev) => Math.min(Number(meta.totalPages || 1), prev + 1))
                  }
                  className="w-9 h-9 border rounded-full text-orange-500 disabled:opacity-40"
                >
                  ›
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="border-b border-gray-200 pb-5 mb-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import { productService } from "../../services/productService";

const tabs = ["All Product", "Smart Phone", "Headphone", "Tv & Home"];

// Map tab → category slug në backend
const tabToCategory = {
  "All Product": null,
  "Smart Phone": "smartphone",
  Headphone: "headphones",
  "Tv & Home": "tv-homes",
};

export default function FeaturedProducts({ onQuickView }) {
  const [active, setActive] = useState("All Product");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = { is_featured: true, limit: 8 };
        const result = await productService.getAll(params);
        const transformed = result.data.map((p) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          price: parseFloat(p.price),
          oldPrice: p.compare_price ? parseFloat(p.compare_price) : null,
          discount: p.compare_price
            ? Math.round(((p.compare_price - p.price) / p.compare_price) * 100)
            : null,
          image: p.images?.[0]?.image_url || "📦",
          rating: parseFloat(p.avg_rating) || 0,
          reviews: p.review_count || 0,
          category: p.category?.slug,
        }));
        setProducts(transformed);
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter sipas tab
  const filtered =
    active === "All Product"
      ? products
      : products.filter((p) => p.category === tabToCategory[active]);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-dark">
          Featured Products
        </h2>
        <div className="flex items-center gap-1 overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0 sm:overflow-visible">
          <div className="flex items-center gap-1 min-w-max sm:flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded transition-colors whitespace-nowrap ${
                  active === tab
                    ? "bg-primary text-white"
                    : "text-dark-300 hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-warning rounded-lg p-4 sm:p-6 flex flex-row lg:flex-col justify-between items-start lg:min-h-[400px] relative overflow-hidden">
          <div>
            <p className="text-dark text-[10px] sm:text-xs font-semibold mb-1">
              COMPUTER & ACCESSORIES
            </p>
            <h3 className="text-3xl sm:text-5xl font-bold text-dark">32%</h3>
            <p className="text-dark text-lg sm:text-2xl font-bold">Discount</p>
            <p className="text-dark-200 text-xs mt-2 hidden sm:block">
              For all electronics products
            </p>
          </div>
          <Link
            to="/shop-page"
            className="bg-dark text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded self-end lg:self-start lg:mt-4 inline-block"
          >
            SHOP NOW →
          </Link>
        </div>

        {loading ? (
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-lg p-4 animate-pulse"
              >
                <div className="aspect-square bg-gray-100 rounded mb-3"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded mb-2"></div>
                <div className="h-5 bg-gray-100 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="lg:col-span-3 flex items-center justify-center text-dark-300 py-12">
            S'ka produkte në këtë kategori
          </div>
        ) : (
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

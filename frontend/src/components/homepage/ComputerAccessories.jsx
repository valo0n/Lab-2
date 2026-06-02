import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import { productService } from "../../services/productService";

const tabs = [
  "All Product",
  "Keyboard & Mouse",
  "Headphone",
  "Webcam",
  "Printer",
];

export default function ComputerAccessories({ onQuickView }) {
  const [active, setActive] = useState("All Product");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Merr nga kategoria "accessories" ose të gjitha
        const result = await productService.getAll({
          limit: 8,
          sort: "newest",
        });
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
        }));
        setProducts(transformed);
      } catch (err) {
        console.error("Failed to fetch accessories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-dark">
          Computer Accessories
        </h2>
        <div className="flex items-center gap-1 overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-1 min-w-max sm:flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded transition-colors whitespace-nowrap ${
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
        ) : (
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          <div className="bg-warning rounded-lg p-4 sm:p-6 relative overflow-hidden min-h-[160px] sm:min-h-[200px]">
            <p className="text-dark text-[10px] font-bold mb-1">XIAOMI</p>
            <h3 className="text-base sm:text-xl font-bold text-dark mb-1 leading-tight">
              True Wireless
              <br />
              Earbuds
            </h3>
            <p className="text-primary font-bold text-lg sm:text-2xl mb-2">
              $199 USD
            </p>
            <Link
              to="/shop-page"
              className="bg-dark text-white text-[10px] font-bold px-3 py-1.5 rounded inline-block"
            >
              SHOP NOW →
            </Link>
            <div className="absolute -bottom-4 -right-4 text-3xl sm:text-5xl">
              🎧
            </div>
          </div>
          <div className="bg-accent-blue text-white rounded-lg p-4 sm:p-6 relative overflow-hidden min-h-[160px] sm:min-h-[200px]">
            <p className="text-warning text-[10px] font-bold mb-1">
              SUMMER SALES
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1 leading-tight">
              37%
              <br />
              DISCOUNT
            </h3>
            <Link
              to="/shop-page"
              className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded mt-2 inline-block"
            >
              SHOP NOW →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

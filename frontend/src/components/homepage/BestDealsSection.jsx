import { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import { productService } from "../../services/productService";

export default function BestDealsSection({ onQuickView }) {
  const [time, setTime] = useState({
    days: 364,
    hours: 21,
    mins: 57,
    secs: 21,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { days, hours, mins, secs } = prev;
        if (secs > 0) secs--;
        else {
          secs = 59;
          if (mins > 0) mins--;
          else {
            mins = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await productService.getBestDeals();
        // Transform data për ProductCard
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
          badge: p.is_featured ? "HOT" : null,
          badgeColor: "primary",
        }));
        setProducts(transformed);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("S'mund të ngarkohen produktet");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const TimeBox = ({ value, label }) => (
    <div className="bg-dark text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded text-center min-w-[38px] sm:min-w-[48px]">
      <div className="font-bold text-sm sm:text-lg leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[8px] sm:text-[9px] uppercase mt-0.5 text-gray-300">
        {label}
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-dark">Best Deals</h2>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-dark text-xs sm:text-sm font-semibold">
            Deals ends in:
          </span>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <TimeBox value={time.days} label="Days" />
            <span className="text-dark font-bold">:</span>
            <TimeBox value={time.hours} label="Hour" />
            <span className="text-dark font-bold">:</span>
            <TimeBox value={time.mins} label="Min" />
            <span className="text-dark font-bold">:</span>
            <TimeBox value={time.secs} label="Sec" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {[...Array(10)].map((_, i) => (
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
      ) : error ? (
        <div className="text-center py-12 text-dark-300">{error}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {products.map((p, i) => (
            <ProductCard
              key={p.id || i}
              product={p}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}
    </section>
  );
}

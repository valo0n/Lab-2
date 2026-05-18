import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categoryService } from "../../services/productService";

// Default icons për kategori (fallback)
const categoryIcons = {
  "computer-laptop": "💻",
  smartphone: "📱",
  headphones: "🎧",
  accessories: "⌨️",
  "camera-photo": "📷",
  "tv-homes": "📺",
  gaming: "🎮",
  smartwatches: "⌚",
};

export default function ShopWithCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const result = await categoryService.getAll();
        // Merr vetëm 6 të parat
        setCategories(result.data.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-4 sm:mb-6 text-center">
        Shop with Categories
      </h2>

      {loading ? (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-lg p-3 sm:p-6 animate-pulse"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gray-100 rounded-full mx-auto mb-2"></div>
              <div className="h-3 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop-page?category=${cat.slug}`}
              className="bg-white border border-gray-100 rounded-lg p-3 sm:p-6 flex flex-col items-center hover:border-primary hover:shadow-card-hover transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gray-50 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-primary-50 transition-colors">
                <span className="text-2xl sm:text-4xl">
                  {categoryIcons[cat.slug] || "📦"}
                </span>
              </div>
              <h3 className="text-[10px] sm:text-sm font-medium text-dark text-center group-hover:text-primary transition-colors leading-tight">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

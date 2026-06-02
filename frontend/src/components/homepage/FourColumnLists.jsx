import { useState, useEffect } from "react";
import { productService } from "../../services/productService";

function MiniRow({ item }) {
  return (
    <div className="flex items-center gap-2 py-2 sm:py-3 border-b border-gray-100 last:border-0">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded flex items-center justify-center text-lg sm:text-2xl flex-shrink-0 overflow-hidden">
        {typeof item.image === "string" &&
        /^(https?:|\/?uploads)/.test(item.image) ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          item.image
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[11px] sm:text-xs font-medium text-dark line-clamp-2 mb-0.5">
          {item.name}
        </h4>
        <div className="flex text-warning text-[9px] mb-0.5">
          {"★★★★★".split("").map((s, i) => (
            <span
              key={i}
              className={
                i < Math.round(item.rating) ? "text-warning" : "text-gray-200"
              }
            >
              ★
            </span>
          ))}
        </div>
        <p className="text-primary font-bold text-xs sm:text-sm">
          ${item.price}
        </p>
      </div>
    </div>
  );
}

function transform(products) {
  return products.map((p) => ({
    name: p.name,
    price: parseFloat(p.price),
    image: p.images?.[0]?.image_url || "📦",
    rating: parseFloat(p.avg_rating) || 0,
  }));
}

export default function FourColumnLists() {
  const [columns, setColumns] = useState([
    { title: "Flash Sale Today", items: [] },
    { title: "Best Sellers", items: [] },
    { title: "Top Rated", items: [] },
    { title: "New Arrival", items: [] },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [flash, best, top, newArr] = await Promise.all([
          productService.getAll({ limit: 3, sort: "popular" }),
          productService.getAll({ limit: 3, sort: "popular" }),
          productService.getAll({ limit: 3, sort: "rating" }),
          productService.getAll({ limit: 3, sort: "newest" }),
        ]);

        setColumns([
          { title: "Flash Sale Today", items: transform(flash.data) },
          { title: "Best Sellers", items: transform(best.data) },
          { title: "Top Rated", items: transform(top.data) },
          { title: "New Arrival", items: transform(newArr.data) },
        ]);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-lg p-4 animate-pulse"
            >
              <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="flex gap-2 py-2 border-b border-gray-100"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-100 rounded mb-1"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {columns.map((col, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-lg p-4"
          >
            <h3 className="text-sm font-bold text-dark mb-2 pb-2 border-b-2 border-primary inline-block">
              {col.title}
            </h3>
            <div>
              {col.items.map((item, j) => (
                <MiniRow key={j} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

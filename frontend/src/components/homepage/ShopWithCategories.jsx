const categories = [
  { name: "Computer & Laptop", icon: "💻" },
  { name: "SmartPhone", icon: "📱" },
  { name: "Headphones", icon: "🎧" },
  { name: "Accessories", icon: "⌨️" },
  { name: "Camera & Photo", icon: "📷" },
  { name: "TV & Homes", icon: "📺" },
];

export default function ShopWithCategories() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-4 sm:mb-6 text-center">
        Shop with Categories
      </h2>

      <div className="relative">
        <button
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-9 h-9 bg-white border border-gray-100 rounded-full items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors z-10 shadow-card"
          aria-label="Previous"
        >
          ‹
        </button>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 md:px-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-lg p-3 sm:p-6 flex flex-col items-center hover:border-primary hover:shadow-card-hover transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gray-50 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-primary-50 transition-colors">
                <span className="text-2xl sm:text-4xl">{cat.icon}</span>
              </div>
              <h3 className="text-[10px] sm:text-sm font-medium text-dark text-center group-hover:text-primary transition-colors leading-tight">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>

        <button
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-9 h-9 bg-white border border-gray-100 rounded-full items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors z-10 shadow-card"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </section>
  );
}

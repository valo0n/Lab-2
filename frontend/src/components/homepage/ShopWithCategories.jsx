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
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-dark mb-6 text-center">
        Shop with Categories
      </h2>

      <div className="relative">
        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors z-10 shadow-card">
          ‹
        </button>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-lg p-6 flex flex-col items-center hover:border-primary hover:shadow-card-hover transition-all cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-primary-50 transition-colors">
                <span className="text-4xl">{cat.icon}</span>
              </div>
              <h3 className="text-sm font-medium text-dark text-center group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>

        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors z-10 shadow-card">
          ›
        </button>
      </div>
    </section>
  );
}

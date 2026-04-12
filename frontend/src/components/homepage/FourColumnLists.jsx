const columns = [
  {
    title: "Flash Sale Today",
    items: [
      {
        name: "Sony Wireless Headphones — Premium Sound Quality",
        price: 348,
        image: "🎧",
        rating: 4.8,
      },
      {
        name: "Bingo Wireless Bluetooth Headphones",
        price: 79,
        image: "🎧",
        rating: 4.5,
      },
      {
        name: "Vivo X70 Pro Smartphone with Triple Camera",
        price: 699,
        image: "📱",
        rating: 4.7,
      },
    ],
  },
  {
    title: "Best Sellers",
    items: [
      {
        name: "Samsung Galaxy Watch 5 Pro 45mm",
        price: 449,
        image: "⌚",
        rating: 4.6,
      },
      {
        name: "JBL True Wireless Earbuds with Mic",
        price: 99,
        image: "🎧",
        rating: 4.4,
      },
      {
        name: "Apple Pencil 2nd Generation Stylus",
        price: 129,
        image: "✏️",
        rating: 4.9,
      },
    ],
  },
  {
    title: "Top Rated",
    items: [
      {
        name: "Canon EOS R6 Mark II Camera Body",
        price: 2499,
        image: "📷",
        rating: 4.9,
      },
      {
        name: "Anker Soundcore Liberty 3 Pro Earbuds",
        price: 169,
        image: "🎧",
        rating: 4.7,
      },
      {
        name: "Wireless Mouse Ergonomic 2.4G Connection",
        price: 39,
        image: "🖱️",
        rating: 4.5,
      },
    ],
  },
  {
    title: "New Arrival",
    items: [
      {
        name: "iPhone 14 Pro Max — Deep Purple 256GB",
        price: 1099,
        image: "📱",
        rating: 4.8,
      },
      {
        name: "Mechanical Gaming Keyboard with RGB",
        price: 149,
        image: "⌨️",
        rating: 4.6,
      },
      {
        name: "Bose Soundbar 900 with Dolby Atmos",
        price: 899,
        image: "🔊",
        rating: 4.7,
      },
    ],
  },
];

function MiniProductRow({ item }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 border-b border-gray-100 last:border-0">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded flex items-center justify-center text-lg sm:text-2xl flex-shrink-0">
        {item.image}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[11px] sm:text-xs font-medium text-dark line-clamp-2 mb-0.5 sm:mb-1">
          {item.name}
        </h4>
        <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
          <div className="flex text-warning text-[9px] sm:text-[10px]">
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
        </div>
        <p className="text-primary font-bold text-xs sm:text-sm">
          ${item.price}
        </p>
      </div>
    </div>
  );
}

export default function FourColumnLists() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {columns.map((col, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-lg p-4 sm:p-5"
          >
            <h3 className="text-sm sm:text-base font-bold text-dark mb-2 pb-2 sm:pb-3 border-b-2 border-primary inline-block">
              {col.title}
            </h3>
            <div>
              {col.items.map((item, j) => (
                <MiniProductRow key={j} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

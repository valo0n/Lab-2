import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

const mainCategories = [
  { id: "computer", name: "Computer & Laptop" },
  { id: "accessories", name: "Computer Accessories" },
  { id: "smartphone", name: "SmartPhone" },
  { id: "headphone", name: "Headphone" },
  { id: "mobile-acc", name: "Mobile Accessories" },
  { id: "gaming", name: "Gaming Console" },
  { id: "camera", name: "Camera & Photo" },
  { id: "tv", name: "TV & Homes Appliances" },
  { id: "watches", name: "Watchs & Accessories" },
  { id: "gps", name: "GPS & Navigation" },
  { id: "wearable", name: "Warable Technology" },
];

const subCategoriesMap = {
  smartphone: {
    title: "FEATURED PHONES",
    items: [
      "All",
      "iPhone",
      "Sansung",
      "Realme",
      "Xiaomi",
      "Oppo",
      "Vivo",
      "OnePlus",
      "Huawei",
      "Infinix",
      "Tecno",
    ],
  },
  computer: {
    title: "FEATURED LAPTOPS",
    items: [
      "All",
      "MacBook",
      "Dell",
      "HP",
      "Lenovo",
      "Asus",
      "Acer",
      "MSI",
      "Razer",
      "Samsung",
    ],
  },
  headphone: {
    title: "FEATURED HEADPHONES",
    items: [
      "All",
      "Wireless",
      "Wired",
      "Gaming",
      "Sport",
      "Noise-Cancelling",
      "In-Ear",
      "Over-Ear",
    ],
  },
  camera: {
    title: "FEATURED CAMERAS",
    items: [
      "All",
      "DSLR",
      "Mirrorless",
      "Action",
      "Instant",
      "Drone",
      "Lenses",
    ],
  },
  accessories: {
    title: "FEATURED ACCESSORIES",
    items: [
      "All",
      "Keyboards",
      "Mice",
      "Webcams",
      "USB Hubs",
      "Monitors",
      "Speakers",
    ],
  },
  "mobile-acc": {
    title: "MOBILE ACCESSORIES",
    items: [
      "All",
      "Chargers",
      "Cables",
      "Cases",
      "Power Banks",
      "Stands",
      "Screen Guards",
    ],
  },
  gaming: {
    title: "FEATURED CONSOLES",
    items: [
      "All",
      "PlayStation",
      "Xbox",
      "Nintendo",
      "Controllers",
      "Games",
      "VR Headsets",
    ],
  },
  tv: {
    title: "FEATURED TVS",
    items: ["All", "Smart TV", "OLED", "4K", "8K", "Soundbars", "Projectors"],
  },
  watches: {
    title: "FEATURED WATCHES",
    items: ["All", "Smart Watch", "Analog", "Digital", "Fitness Trackers"],
  },
  gps: {
    title: "FEATURED GPS",
    items: ["All", "Car GPS", "Handheld", "Marine", "Sports"],
  },
  wearable: {
    title: "FEATURED WEARABLES",
    items: ["All", "Smartwatches", "Fitness Bands", "VR", "AR Glasses"],
  },
};

const featuredProducts = [
  {
    name: "Samsung Electronics Samsung Galaxy S21 5G",
    price: 160,
    image: "🎮",
  },
  {
    name: "Simple Mobile 5G LTE Galexy 12 Mini 512GB Gaming Phone",
    price: 1500,
    image: "📱",
  },
  {
    name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
    price: 2300,
    oldPrice: 3200,
    image: "📷",
  },
];

export default function MegaMenu({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState("smartphone");

  if (!isOpen) return null;

  const subData =
    subCategoriesMap[activeCategory] || subCategoriesMap.smartphone;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-30" onClick={onClose} />

      <div
        className="absolute top-full left-0 bg-white shadow-2xl z-40 rounded-b-lg overflow-hidden"
        style={{ width: "min(1000px, calc(100vw - 2rem))" }}
      >
        <div className="grid grid-cols-12 min-h-[450px]">
          {/* LEFT — Main Categories */}
          <div className="col-span-4 border-r border-gray-100 py-2">
            {mainCategories.map((cat) => (
              <button
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat.id)}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center justify-between px-5 py-2.5 text-sm text-left transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary-50 text-primary font-semibold"
                    : "text-dark hover:bg-gray-50"
                }`}
              >
                <span>{cat.name}</span>
                <FiChevronRight
                  size={14}
                  className={
                    activeCategory === cat.id ? "text-primary" : "text-dark-300"
                  }
                />
              </button>
            ))}
          </div>

          {/* MIDDLE — Sub-categories */}
          <div className="col-span-3 border-r border-gray-100 py-2 bg-gray-50/30">
            {subData.items.map((item, i) => (
              <button
                key={i}
                className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${
                  i === 1
                    ? "bg-primary-50 text-primary font-semibold"
                    : "text-dark hover:text-primary hover:bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* RIGHT — Featured products + promo banner */}
          <div className="col-span-5 p-4">
            <h4 className="text-xs font-bold text-dark mb-3">
              {subData.title}
            </h4>

            <div className="space-y-3 mb-4">
              {featuredProducts.map((p, i) => (
                <a
                  href="#"
                  key={i}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
                    {typeof p.image === "string" &&
                    /^(https?:|\/?uploads)/.test(p.image) ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      p.image
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-medium text-dark line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                      {p.name}
                    </h5>
                    <div className="flex items-center gap-2">
                      {p.oldPrice && (
                        <span className="text-dark-300 text-xs line-through">
                          ${p.oldPrice}
                        </span>
                      )}
                      <span className="text-primary font-bold text-sm">
                        ${p.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-warning rounded-lg p-4 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="text-4xl">🎧</div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-dark mb-1">
                    21% Discount
                  </h4>
                  <p className="text-xs text-dark-200 mb-2 leading-snug">
                    Escape the noise, It's time to hear the magic with Xiaomi
                    Earbuds.
                  </p>
                  <p className="text-xs text-dark-300 mb-2">
                    Starting price:{" "}
                    <span className="font-bold text-dark">$99 USD</span>
                  </p>
                  <button className="bg-primary hover:bg-primary-600 text-white text-xs font-bold px-4 py-2 rounded transition-colors">
                    SHOP NOW →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

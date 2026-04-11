import { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";

const dealProducts = [
  {
    name: "Sony PlayStation 5 Console with Wireless Controller",
    price: 499,
    oldPrice: 599,
    discount: 17,
    image: "🎮",
    rating: 4.8,
    reviews: 234,
    badge: "HOT",
  },
  {
    name: "DJI Mavic Mini Drone with 4K Camera",
    price: 899,
    image: "🚁",
    rating: 4.7,
    reviews: 156,
  },
  {
    name: "Sony Alpha A7 III Mirrorless Camera",
    price: 1999,
    oldPrice: 2299,
    discount: 13,
    image: "📷",
    rating: 4.9,
    reviews: 89,
    badge: "NEW",
    badgeColor: "green",
  },
  {
    name: "Xbox Wireless Controller — Carbon Black",
    price: 59,
    oldPrice: 79,
    discount: 25,
    image: "🎮",
    rating: 4.6,
    reviews: 412,
  },
  {
    name: "Sony WH-1000XM4 Wireless Headphones",
    price: 348,
    oldPrice: 399,
    discount: 13,
    image: "🎧",
    rating: 4.9,
    reviews: 678,
    badge: "-13%",
    badgeColor: "red",
  },
  {
    name: 'Apple iPad Pro 12.9" with M2 Chip',
    price: 1099,
    image: "📱",
    rating: 4.8,
    reviews: 234,
  },
  {
    name: "Portable Wireless Mouse 1600 DPI",
    price: 29,
    oldPrice: 49,
    image: "🖱️",
    rating: 4.4,
    reviews: 321,
  },
  {
    name: "Dell Curved 4K UHD Monitor 32 inch",
    price: 549,
    image: "🖥️",
    rating: 4.7,
    reviews: 145,
  },
  {
    name: "Smart Camera 5MP Wireless Monitoring",
    price: 89,
    oldPrice: 129,
    discount: 31,
    image: "📹",
    rating: 4.5,
    reviews: 267,
  },
  {
    name: "JBL Flip 5 Waterproof Portable Speaker",
    price: 119,
    image: "🔊",
    rating: 4.8,
    reviews: 543,
    badge: "BEST",
    badgeColor: "green",
  },
];

export default function BestDealsSection() {
  const [time, setTime] = useState({
    days: 364,
    hours: 21,
    mins: 57,
    secs: 21,
  });

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

  const TimeBox = ({ value, label }) => (
    <div className="bg-dark text-white px-3 py-2 rounded text-center min-w-[48px]">
      <div className="font-bold text-lg leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[9px] uppercase mt-0.5 text-gray-300">{label}</div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-dark">Best Deals</h2>
          <span className="text-dark-300 text-sm hidden md:inline">
            Don't wait. The time will never be just right.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-dark text-sm font-semibold">
            Deals ends in:
          </span>
          <div className="flex items-center gap-1">
            <TimeBox value={time.days} label="Days" />
            <span className="text-dark font-bold">:</span>
            <TimeBox value={time.hours} label="Hour" />
            <span className="text-dark font-bold">:</span>
            <TimeBox value={time.mins} label="Min" />
            <span className="text-dark font-bold">:</span>
            <TimeBox value={time.secs} label="Sec" />
          </div>
          <a
            href="#"
            className="text-primary font-semibold text-sm hover:underline ml-2 hidden md:inline"
          >
            Browse All Product →
          </a>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {dealProducts.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </section>
  );
}

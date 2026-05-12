import TopBar from "../../components/layout/TopBar";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import { Home, X, Star, ShoppingCart, Heart } from "lucide-react";

const products = [
  {
    image: "/images/compare-1.png",
    name: "Gamdias ARES M2 Gaming Keyboard, Mouse and Mouse Mat Combo",
    price: "$899.00",
    soldBy: "Clicon",
    brand: "StarTech",
    model: "ARES M2 and ZEUS E2",
    stock: "IN STOCK",
    stockColor: "text-green-600",
  },
  {
    image: "/images/compare-2.png",
    name: "Apple iMac 24” 4K Retina Display M1 8 Core CPU, 8 Core GPU, 256GB SSD, Blue",
    price: "$1,699.00",
    soldBy: "Apple",
    brand: "Apple",
    model: "Apple iMac 24” M1 Blue 2021",
    stock: "IN STOCK",
    stockColor: "text-green-600",
  },
  {
    image: "/images/compare-3.png",
    name: "Samsung Galaxy S21 FE 5G Cell Phone, Factory Unlocked Android Smartphone",
    price: "$699.99",
    soldBy: "Clicon",
    brand: "Samsung",
    model: "S21 FE",
    stock: "OUT OF STOCK",
    stockColor: "text-red-500",
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopBar />
      <Header />
      <Navigation />

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Home size={14} />
          <span>Home</span>
          <span>{">"}</span>
          <span className="text-blue-500">Compare</span>
        </div>
      </div>

      <main className="bg-white py-14">
        <div className="max-w-5xl mx-auto border border-gray-200">
          <div className="grid grid-cols-4">
            <div className="border-r border-gray-200" />

            {products.map((product, index) => (
              <div key={index} className="relative border-r border-gray-200 p-6">
                <button className="absolute top-5 left-1/2 -translate-x-1/2 text-gray-400">
                  <X size={16} />
                </button>

                <div className="h-52 mt-8 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full object-contain"
                  />
                </div>

                <h3 className="text-sm text-gray-900 leading-5 min-h-[60px] mt-4">
                  {product.name}
                </h3>

                <div className="flex gap-2 mt-4">
                  <button
                    className={`h-10 flex-1 text-xs font-semibold text-white flex items-center justify-center gap-2 ${
                      index === 2 ? "bg-gray-400" : "bg-orange-500"
                    }`}
                  >
                    ADD TO CARD
                    <ShoppingCart size={15} />
                  </button>

                  <button className="w-10 h-10 border border-orange-200 text-orange-500 flex items-center justify-center">
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <CompareRow label="Customer feedback:">
            {products.map((_, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="flex text-orange-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={13} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">(67,746,358)</span>
              </div>
            ))}
          </CompareRow>

          <CompareRow label="Price:">
            {products.map((product, index) => (
              <p key={index} className="text-lg font-semibold text-blue-500">
                {product.price}
              </p>
            ))}
          </CompareRow>

          <CompareRow label="Sold by:">
            {products.map((product, index) => (
              <p key={index}>{product.soldBy}</p>
            ))}
          </CompareRow>

          <CompareRow label="Brand:">
            {products.map((product, index) => (
              <p key={index}>{product.brand}</p>
            ))}
          </CompareRow>

          <CompareRow label="Model:">
            {products.map((product, index) => (
              <p key={index}>{product.model}</p>
            ))}
          </CompareRow>

          <CompareRow label="Stock status:">
            {products.map((product, index) => (
              <p key={index} className={`font-semibold ${product.stockColor}`}>
                {product.stock}
              </p>
            ))}
          </CompareRow>

          <CompareRow label="Size:">
            <p>6.71 inches, 110.5 cm</p>
            <p>6.7 inches, 109.8 cm</p>
            <p>6.4 inches, 98.9 cm</p>
          </CompareRow>

          <CompareRow label="Weight:">
            <p>650 g (7.41 oz)</p>
            <p>240 g (8.47 oz)</p>
            <p>177 g (6.24 oz)</p>
          </CompareRow>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function CompareRow({ label, children }) {
  return (
    <div className="grid grid-cols-4 text-sm">
      <div className="bg-gray-100 border-r border-t border-gray-200 px-5 py-3 text-gray-600">
        {label}
      </div>

      {children.map((child, index) => (
        <div
          key={index}
          className="border-r border-t border-gray-200 px-5 py-3 text-gray-800"
        >
          {child}
        </div>
      ))}
    </div>
  );
}
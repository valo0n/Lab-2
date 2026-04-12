export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold">CLICON</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
              Customer Supports:
              <br />
              <span className="text-white font-semibold text-sm sm:text-base">
                (629)-555-0129
              </span>
            </p>
            <p className="text-gray-300 text-[11px] sm:text-xs">
              4517 Washington Ave.
              <br />
              Manchester, Kentucky 39495
            </p>
            <p className="text-gray-300 text-[11px] sm:text-xs mt-2">
              info@kinbo.com
            </p>
          </div>

          {/* Top Category */}
          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-xs sm:text-sm">
              TOP CATEGORY
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-300 text-[11px] sm:text-xs">
              <li>
                <a href="#" className="hover:text-primary">
                  Computer & Laptop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  SmartPhone
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Headphones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Camera & Photo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  TV & Homes
                </a>
              </li>
              <li>
                <a href="#" className="text-primary font-semibold">
                  Browse All Product →
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-xs sm:text-sm">
              QUICK LINKS
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-300 text-[11px] sm:text-xs">
              <li>
                <a href="#" className="hover:text-primary">
                  Shop Product
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Shopping Cart
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Compare
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Customer Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-xs sm:text-sm">
              DOWNLOAD APP
            </h4>
            <div className="space-y-2">
              <button className="flex items-center gap-2 bg-dark-100 hover:bg-dark-200 transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded w-full text-left">
                <span className="text-xl sm:text-2xl">📱</span>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-gray-300">
                    Get it on
                  </p>
                  <p className="text-[11px] sm:text-xs font-bold text-white">
                    Google Play
                  </p>
                </div>
              </button>
              <button className="flex items-center gap-2 bg-dark-100 hover:bg-dark-200 transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded w-full text-left">
                <span className="text-xl sm:text-2xl">🍎</span>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-gray-300">
                    Download on
                  </p>
                  <p className="text-[11px] sm:text-xs font-bold text-white">
                    App Store
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Popular Tag — full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-xs sm:text-sm">
              POPULAR TAG
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                "iPhone",
                "TV",
                "Asus Laptops",
                "Macbook",
                "SSD",
                "Graphics Card",
                "Power Bank",
                "Smart TV",
                "Speaker",
                "Tablet",
                "Microwave",
                "Samsung",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-dark-100 hover:bg-primary hover:text-white text-gray-300 text-[9px] sm:text-[10px] px-2 py-1 rounded cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-100 mt-8 sm:mt-10 pt-4 sm:pt-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-gray-300 text-[10px] sm:text-xs text-center md:text-left">
            Ecommerce Software by Clicon © 2026 | All Rights Reserved
          </p>
          <div className="flex items-center gap-2 sm:gap-3 text-gray-300 text-[10px] sm:text-xs flex-wrap justify-center">
            <span>💳 VISA</span>
            <span>💳 Mastercard</span>
            <span>💳 PayPal</span>
            <span>💳 Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

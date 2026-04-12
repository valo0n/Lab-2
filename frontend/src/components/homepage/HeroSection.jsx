export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Main banner — Xbox */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 sm:p-8 lg:p-10 relative overflow-hidden h-64 sm:h-72 lg:h-80">
          <div className="relative z-10 max-w-md">
            <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 sm:mb-3">
              The Best Place to Play
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark mb-2 sm:mb-4 leading-tight">
              Xbox Consoles
            </h1>
            <p className="text-dark-300 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none">
              Save up to 50% on select Xbox games. Get 3 months of PC Game Pass
              for $2 USD.
            </p>
            <button className="bg-primary hover:bg-primary-600 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded text-xs sm:text-sm transition-colors">
              SHOP NOW →
            </button>
          </div>

          <div className="absolute top-4 right-4 sm:top-8 sm:right-12 w-14 h-14 sm:w-20 sm:h-20 bg-info rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg">
            $299
          </div>

          <div className="absolute bottom-0 right-0 w-48 h-40 sm:w-72 sm:h-64 bg-gradient-to-tl from-dark/10 to-transparent rounded-tl-full" />

          <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-10 flex gap-2">
            <span className="w-5 sm:w-6 h-1.5 bg-primary rounded-full" />
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
          </div>
        </div>

        {/* Side banners */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
          {/* Banner 1 — Google Pixel */}
          <div className="bg-gradient-to-br from-dark to-dark-100 rounded-lg p-4 sm:p-6 text-white relative overflow-hidden h-36 lg:h-[152px]">
            <span className="inline-block bg-primary text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded mb-2">
              SUMMER SALE
            </span>
            <h3 className="text-base sm:text-lg font-bold leading-tight mb-2">
              New Google
              <br />
              Pixel 6 Pro
            </h3>
            <button className="bg-primary hover:bg-primary-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded">
              SHOP NOW →
            </button>
            <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full" />
            <div className="absolute top-2 right-2 text-[9px] sm:text-xs font-bold bg-warning text-dark px-1.5 sm:px-2 py-0.5 rounded">
              -25% OFF
            </div>
          </div>

          {/* Banner 2 — Xiaomi FlipBuds */}
          <div className="bg-white border border-gray-100 rounded-lg p-4 sm:p-6 relative overflow-hidden h-36 lg:h-[152px]">
            <h3 className="text-base sm:text-lg font-bold text-dark leading-tight mb-1">
              Xiaomi
              <br />
              FlipBuds Pro
            </h3>
            <p className="text-primary font-bold text-[10px] sm:text-xs mb-2 sm:mb-3">
              $299 USD
            </p>
            <button className="bg-primary hover:bg-primary-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded">
              SHOP NOW →
            </button>
            <div className="absolute -top-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

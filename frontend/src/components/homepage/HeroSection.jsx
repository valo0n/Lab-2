export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main banner — Xbox */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-10 relative overflow-hidden h-80">
          <div className="relative z-10 max-w-md">
            <p className="text-primary text-sm font-bold uppercase tracking-wider mb-3">
              The Best Place to Play
            </p>
            <h1 className="text-4xl font-bold text-dark mb-4 leading-tight">
              Xbox Consoles
            </h1>
            <p className="text-dark-300 text-sm mb-6">
              Save up to 50% on select Xbox games. Get 3 months of PC Game Pass
              for $2 USD.
            </p>
            <button className="bg-primary hover:bg-primary-600 text-white font-bold px-6 py-3 rounded text-sm transition-colors">
              SHOP NOW →
            </button>
          </div>

          {/* Decorative price badge */}
          <div className="absolute top-8 right-12 w-20 h-20 bg-info rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
            $299
          </div>

          {/* Decorative gamepad placeholder */}
          <div className="absolute bottom-0 right-0 w-72 h-64 bg-gradient-to-tl from-dark/10 to-transparent rounded-tl-full" />

          {/* Carousel dots */}
          <div className="absolute bottom-6 left-10 flex gap-2">
            <span className="w-6 h-1.5 bg-primary rounded-full" />
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
          </div>
        </div>

        {/* Side banners */}
        <div className="flex flex-col gap-4">
          {/* Banner 1 — Google Pixel */}
          <div className="bg-gradient-to-br from-dark to-dark-100 rounded-lg p-6 text-white relative overflow-hidden h-[152px]">
            <span className="inline-block bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2">
              SUMMER SALE
            </span>
            <h3 className="text-lg font-bold leading-tight mb-2">
              New Google
              <br />
              Pixel 6 Pro
            </h3>
            <button className="bg-primary hover:bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded">
              SHOP NOW →
            </button>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
            <div className="absolute top-3 right-3 text-xs font-bold bg-warning text-dark px-2 py-0.5 rounded">
              -25% OFF
            </div>
          </div>

          {/* Banner 2 — Xiaomi FlipBuds */}
          <div className="bg-white border border-gray-100 rounded-lg p-6 relative overflow-hidden h-[152px]">
            <h3 className="text-lg font-bold text-dark leading-tight mb-1">
              Xiaomi
              <br />
              FlipBuds Pro
            </h3>
            <p className="text-primary font-bold text-xs mb-3">$299 USD</p>
            <button className="bg-primary hover:bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded">
              SHOP NOW →
            </button>
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gray-50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

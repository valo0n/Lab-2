export default function MacBookProBanner() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="bg-orange-100 rounded-lg p-5 sm:p-8 lg:p-10 relative overflow-hidden flex items-center min-h-[200px] sm:min-h-[260px]">
        <div className="relative z-10 max-w-[60%] md:max-w-md">
          <span className="inline-block bg-primary text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3">
            SAVE UP TO $200.00
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-dark mb-1 sm:mb-2 leading-tight">
            Macbook Pro
          </h2>
          <p className="text-dark-200 text-[10px] sm:text-sm mb-0 sm:mb-1 hidden sm:block">
            Apple M1 Max Chip. 32GB Unified
          </p>
          <p className="text-dark-200 text-[10px] sm:text-sm mb-2 sm:mb-4 hidden sm:block">
            Memory, 1TB SSD Storage
          </p>
          <p className="text-dark text-lg sm:text-2xl font-bold mb-2 sm:mb-4">
            $1099 USD
          </p>
          <button className="bg-primary hover:bg-primary-600 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded text-[10px] sm:text-sm">
            SHOP NOW →
          </button>
        </div>

        {/* MacBook visual */}
        <div className="absolute right-3 sm:right-6 lg:right-12 top-1/2 -translate-y-1/2">
          <div className="w-32 h-20 sm:w-56 sm:h-36 lg:w-72 lg:h-44 bg-dark rounded-lg shadow-card-hover flex items-center justify-center text-white text-2xl sm:text-4xl lg:text-6xl">
            💻
          </div>
        </div>
      </div>
    </section>
  );
}

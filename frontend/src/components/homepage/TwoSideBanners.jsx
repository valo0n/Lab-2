export default function TwoSideBanners() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Apple HomePod Mini */}
        <div className="bg-gray-50 rounded-lg p-5 sm:p-8 relative overflow-hidden h-40 sm:h-48 flex items-center">
          <div className="relative z-10 max-w-[65%]">
            <span className="inline-block bg-info text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded mb-1 sm:mb-2">
              INTRODUCING
            </span>
            <h3 className="text-lg sm:text-2xl font-bold text-dark leading-tight mb-1">
              New Apple
              <br />
              Homepod Mini
            </h3>
            <p className="text-dark-300 text-[10px] sm:text-xs mb-2 sm:mb-3 hidden sm:block">
              Jam-packed with innovation,
              <br />
              HomePod mini delivers a powerful sound.
            </p>
            <button className="bg-primary hover:bg-primary-600 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded">
              SHOP NOW →
            </button>
          </div>
          <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center text-4xl sm:text-6xl shadow-card">
            🔊
          </div>
        </div>

        {/* Xiaomi Mi 11 Ultra */}
        <div className="bg-dark rounded-lg p-5 sm:p-8 relative overflow-hidden h-40 sm:h-48 flex items-center text-white">
          <div className="relative z-10 max-w-[65%]">
            <span className="inline-block bg-warning text-dark text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded mb-1 sm:mb-2">
              INTRODUCING NEW
            </span>
            <h3 className="text-lg sm:text-2xl font-bold leading-tight mb-1">
              Xiaomi Mi 11 Ultra
              <br />
              12GB+256GB
            </h3>
            <p className="text-gray-300 text-[10px] sm:text-xs mb-2 sm:mb-3 hidden sm:block">
              Mi 11 Ultra has been the most
              <br />
              expensive phone with snapdragon 888.
            </p>
            <button className="bg-primary hover:bg-primary-600 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded">
              SHOP NOW →
            </button>
          </div>
          <div className="absolute right-3 sm:right-6 top-3 sm:top-4 w-12 h-12 sm:w-16 sm:h-16 bg-info rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
            $590
          </div>
          <div className="absolute right-6 sm:right-12 bottom-2 sm:bottom-4 text-5xl sm:text-7xl">
            📱
          </div>
        </div>
      </div>
    </section>
  );
}

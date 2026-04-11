export default function TwoSideBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Apple HomePod Mini */}
        <div className="bg-gray-50 rounded-lg p-8 relative overflow-hidden h-48 flex items-center">
          <div className="relative z-10">
            <span className="inline-block bg-info text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2">
              INTRODUCING
            </span>
            <h3 className="text-2xl font-bold text-dark mb-1">
              New Apple
              <br />
              Homepod Mini
            </h3>
            <p className="text-dark-300 text-xs mb-3">
              Jam-packed with innovation,
              <br />
              HomePod mini delivers a powerful sound.
            </p>
            <button className="bg-primary hover:bg-primary-600 text-white text-xs font-bold px-4 py-2 rounded">
              SHOP NOW →
            </button>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl shadow-card">
            🔊
          </div>
        </div>

        {/* Xiaomi Mi 11 Ultra */}
        <div className="bg-dark rounded-lg p-8 relative overflow-hidden h-48 flex items-center text-white">
          <div className="relative z-10">
            <span className="inline-block bg-warning text-dark text-[10px] font-bold px-2 py-0.5 rounded mb-2">
              INTRODUCING NEW
            </span>
            <h3 className="text-2xl font-bold mb-1">
              Xiaomi Mi 11 Ultra
              <br />
              12GB+256GB
            </h3>
            <p className="text-gray-300 text-xs mb-3">
              Mi 11 Ultra has been the most
              <br />
              expensive phone with snapdragon 888.
            </p>
            <button className="bg-primary hover:bg-primary-600 text-white text-xs font-bold px-4 py-2 rounded">
              SHOP NOW →
            </button>
          </div>
          <div className="absolute right-6 top-4 w-16 h-16 bg-info rounded-full flex items-center justify-center font-bold text-sm">
            $590
          </div>
          <div className="absolute right-12 bottom-4 text-7xl">📱</div>
        </div>
      </div>
    </section>
  );
}

export default function TopBar() {
  return (
    <div className="bg-dark text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between">
        {/* Left: Black Friday badge + message */}
        <div className="flex items-center gap-4">
          <span className="bg-accent-yellow text-dark font-bold px-2 py-0.5 text-xs rounded">
            Black Friday
          </span>
          <span className="hidden md:inline text-gray-300 text-xs">
            Up to 59% OFF — Limited time offer on all products
          </span>
          <button className="bg-primary hover:bg-primary-600 text-white font-semibold px-3 py-1 text-xs rounded">
            SHOP NOW →
          </button>
        </div>

        {/* Right: Social + currency + language */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 text-gray-300">
            <span>Follow us:</span>
            <a href="#" className="hover:text-primary">
              f
            </a>
            <a href="#" className="hover:text-primary">
              t
            </a>
            <a href="#" className="hover:text-primary">
              in
            </a>
            <a href="#" className="hover:text-primary">
              ig
            </a>
          </div>
          <select className="bg-transparent text-gray-300 outline-none">
            <option>Eng</option>
          </select>
          <select className="bg-transparent text-gray-300 outline-none">
            <option>USD</option>
          </select>
        </div>
      </div>
    </div>
  );
}

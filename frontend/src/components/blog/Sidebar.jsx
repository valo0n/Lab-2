function Sidebar() {
  return (
    <div className="space-y-6">

      {/* CATEGORY */}
      <div className="border p-4 rounded bg-white">
        <h2 className="font-semibold mb-3">CATEGORY</h2>

        {[
          "All",
          "Electronics Devices",
          "Computer & Laptop",
          "SmartPhone",
        ].map((cat, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input type="radio" name="cat" />
            <span>{cat}</span>
          </div>
        ))}
      </div>

      {/* LATEST BLOG */}
      <div className="border p-4 rounded bg-white">
        <h2 className="font-semibold mb-3">LATEST BLOG</h2>

        {[1,2,3].map((item) => (
          <div key={item} className="flex gap-3 mb-3">
            <img
              src="https://via.placeholder.com/60"
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="text-sm">
                Curabitur pulvinar aliquam lectus...
              </p>
              <span className="text-xs text-gray-500">
                28 Nov, 2015
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* TAGS */}
      <div className="border p-4 rounded bg-white">
        <h2 className="font-semibold mb-3">POPULAR TAG</h2>

        <div className="flex flex-wrap gap-2">
          {["Game", "iPhone", "TV", "Laptop"].map((tag) => (
            <span
              key={tag}
              className="border px-2 py-1 text-sm cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Sidebar
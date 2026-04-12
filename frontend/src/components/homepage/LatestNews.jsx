const posts = [
  {
    image: '⚙️',
    bgColor: 'bg-gray-50',
    author: 'Cameron Williamson',
    date: '21 Dec 2022',
    title: 'Cracked deals on a new MacBook Pro M2 chip, Apple Watch Series 8 and More',
    excerpt: 'In the world of technology, things change at a rapid pace and finding good deals can be tricky.'
  },
  {
    image: '💡',
    bgColor: 'bg-orange-50',
    author: 'Jenny Wilson',
    date: '15 Dec 2022',
    title: 'Modal launches new affordable wireless earbuds, smartwatch and laptop',
    excerpt: 'Tech company brings affordable products to the market with high quality and great design.'
  },
  {
    image: '📱',
    bgColor: 'bg-blue-50',
    author: 'Robert Fox',
    date: '10 Dec 2022',
    title: 'Apple WWDC 2022 keynote: M2 chip, iOS 16, MacBook Air and more',
    excerpt: 'Apple unveiled major updates across its software and hardware lineup at this year\'s WWDC event.'
  },
];

export default function LatestNews() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-dark">Latest News</h2>
        <p className="text-dark-300 text-xs sm:text-sm mt-1 sm:mt-2">Get the latest news, updates and tips</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((post, i) => (
          <article key={i} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-card-hover transition-shadow cursor-pointer group">
            <div className={`h-36 sm:h-48 ${post.bgColor} flex items-center justify-center text-5xl sm:text-7xl`}>
              {post.image}
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-dark-300 mb-2 sm:mb-3 flex-wrap">
                <span>👤 {post.author}</span>
                <span>📅 {post.date}</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-dark-300 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">{post.excerpt}</p>
              <button className="text-primary text-[10px] sm:text-xs font-bold hover:underline">
                READ MORE →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

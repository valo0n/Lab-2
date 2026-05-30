import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import TopBar from "../../components/Layout/TopBar";
import Header from "../../components/Layout/Header";
import Navigation from "../../components/Layout/Navigation";
import Footer from "../../components/Layout/Footer";
import {
  Home,
  ChevronRight,
  Search,
  User,
  Calendar,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const categories = [
  "All",
  "Electronics Devices",
  "Computer & Laptop",
  "Computer Accessories",
  "SmartPhone",
  "Headphone",
  "Mobile Accessories",
  "Gaming Console",
  "Camera & Photo",
];

const tags = [
  "Game",
  "iPhone",
  "TV",
  "Asus Laptops",
  "Macbook",
  "SSD",
  "Graphics Card",
  "Speaker",
  "Tablet",
  "Microwave",
  "Samsung",
  "Power Bank",
];

// timestamp per sortim sipas dates
const posts = [
  {
    id: 1,
    image: "https://picsum.photos/seed/tech1/400/250",
    author: "Cameron",
    date: "1 Feb, 2020",
    ts: new Date("2020-02-01").getTime(),
    comments: 738,
    category: "Headphone",
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    desc: "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/watch2/400/250",
    author: "Floyd Miles",
    date: "17 Oct, 2020",
    ts: new Date("2020-10-17").getTime(),
    comments: 826,
    category: "SmartPhone",
    title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus.",
    desc: "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/office3/400/250",
    author: "Marvin McKinney",
    date: "8 Sep, 2020",
    ts: new Date("2020-09-08").getTime(),
    comments: 738,
    category: "Computer & Laptop",
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    desc: "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/chip4/400/250",
    author: "Darlene",
    date: "24 May, 2020",
    ts: new Date("2020-05-24").getTime(),
    comments: 826,
    category: "Computer Accessories",
    title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus.",
    desc: "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.",
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/matrix5/400/250",
    author: "Brooklyn Simmons",
    date: "21 Sep, 2020",
    ts: new Date("2020-09-21").getTime(),
    comments: 920,
    category: "Electronics Devices",
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    desc: "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/plasma6/400/250",
    author: "Devon Lane",
    date: "22 Oct, 2020",
    ts: new Date("2020-10-22").getTime(),
    comments: 540,
    category: "Camera & Photo",
    title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus.",
    desc: "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.",
  },
  {
    id: 7,
    image: "https://picsum.photos/seed/keyb7/400/250",
    author: "Bessie Cooper",
    date: "8 Jan, 2021",
    ts: new Date("2021-01-08").getTime(),
    comments: 738,
    category: "Computer Accessories",
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    desc: "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    id: 8,
    image: "https://picsum.photos/seed/imac8/400/250",
    author: "Kristin Watson",
    date: "1 Mar, 2021",
    ts: new Date("2021-03-01").getTime(),
    comments: 1024,
    category: "Gaming Console",
    title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus.",
    desc: "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.",
  },
];

function BlogCard({ post }) {
  const detailUrl = `/blog-detail?title=${encodeURIComponent(post.title)}&author=${encodeURIComponent(post.author)}&date=${encodeURIComponent(post.date)}&comments=${post.comments}&image=${encodeURIComponent(post.image)}`;

  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden bg-white hover:shadow-card-hover transition-shadow">
      <Link to={detailUrl}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-52 object-cover"
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-4 text-xs text-dark-300 mb-3">
          <span className="flex items-center gap-1">
            <User size={14} className="text-primary" /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} className="text-primary" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={14} className="text-primary" /> {post.comments}
          </span>
        </div>
        <Link to={detailUrl}>
          <h2 className="font-semibold text-dark mb-2 leading-snug hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-sm text-dark-300 mb-4 leading-relaxed">
          {post.desc}
        </p>
        <Link
          to={detailUrl}
          className="inline-flex border border-gray-200 text-primary text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded hover:bg-primary hover:text-white transition-colors items-center gap-2"
        >
          Read More <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const toggleCart = () => {
    setCartOpen((v) => !v);
    setWishlistOpen(false);
    setAccountOpen(false);
  };
  const toggleWishlist = () => {
    setWishlistOpen((v) => !v);
    setCartOpen(false);
    setAccountOpen(false);
  };
  const toggleAccount = () => {
    setAccountOpen((v) => !v);
    setCartOpen(false);
    setWishlistOpen(false);
  };

  // Filtrim + sortim funksional
  const displayedPosts = useMemo(() => {
    let result = [...posts];

    // 1. Filtro sipas kategorise
    if (activeCat !== "All") {
      result = result.filter((p) => p.category === activeCat);
    }

    // 2. Filtro sipas search
    if (search.trim()) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.author.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // 3. Sortim
    if (sortBy === "popular") {
      result.sort((a, b) => b.comments - a.comments);
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.ts - a.ts);
    } else if (sortBy === "oldest") {
      result.sort((a, b) => a.ts - b.ts);
    }

    return result;
  }, [activeCat, search, sortBy]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <TopBar />
      <Header
        onMenuClick={() => setMobileMenuOpen(true)}
        cartOpen={cartOpen}
        onCartToggle={toggleCart}
        wishlistOpen={wishlistOpen}
        onWishlistToggle={toggleWishlist}
        accountOpen={accountOpen}
        onAccountToggle={toggleAccount}
      />
      <Navigation
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm">
          <Home size={14} className="text-dark-300" />
          <Link to="/" className="text-dark-300 hover:text-primary">
            Home
          </Link>
          <ChevronRight size={14} className="text-dark-300" />
          <span className="text-dark-300">Pages</span>
          <ChevronRight size={14} className="text-dark-300" />
          <span className="text-info font-medium">Blog</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-gray-100 rounded-lg p-5">
              <h3 className="font-bold text-dark mb-4 text-sm tracking-wide">
                CATEGORY
              </h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 text-sm text-dark-300 cursor-pointer hover:text-primary transition-colors"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={activeCat === cat}
                      onChange={() => {
                        setActiveCat(cat);
                        setCurrentPage(1);
                      }}
                      className="accent-primary"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="border border-gray-100 rounded-lg p-5">
              <h3 className="font-bold text-dark mb-4 text-sm tracking-wide">
                LATEST BLOG
              </h3>
              <div className="space-y-4">
                {posts.slice(0, 3).map((p) => (
                  <div key={p.id} className="flex gap-3">
                    <img
                      src={p.image}
                      alt=""
                      className="w-16 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs text-dark line-clamp-2 mb-1">
                        {p.title}
                      </p>
                      <span className="text-[10px] text-dark-300">
                        {p.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-100 rounded-lg p-5">
              <h3 className="font-bold text-dark mb-4 text-sm tracking-wide">
                GALLERY
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(8)].map((_, i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/gal${i}/80/80`}
                    alt=""
                    className="w-full aspect-square object-cover rounded"
                  />
                ))}
              </div>
            </div>

            <div className="border border-gray-100 rounded-lg p-5">
              <h3 className="font-bold text-dark mb-4 text-sm tracking-wide">
                POPULAR TAG
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearch(tag)}
                    className="border border-gray-200 text-dark-300 text-xs px-3 py-1.5 rounded hover:border-primary hover:text-primary cursor-pointer transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Blog content */}
          <div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search..."
                  className="w-full border border-gray-200 rounded h-11 px-4 pr-10 text-sm text-dark outline-none focus:border-primary"
                />
                <Search
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-dark-300">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded h-11 px-3 text-sm text-dark outline-none focus:border-primary cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Aktive filter info */}
            {(activeCat !== "All" || search) && (
              <div className="bg-gray-50 border border-gray-100 rounded px-4 py-3 flex items-center justify-between text-sm mb-5">
                <span className="text-dark-300">
                  {activeCat !== "All" && (
                    <>
                      Kategoria: <b className="text-dark">{activeCat}</b>
                    </>
                  )}
                  {search && (
                    <>
                      {" "}
                      {activeCat !== "All" ? " • " : ""}Search:{" "}
                      <b className="text-dark">{search}</b>
                    </>
                  )}
                </span>
                <span className="text-dark-300">
                  <b className="text-dark">{displayedPosts.length}</b> rezultate
                </span>
              </div>
            )}

            {displayedPosts.length === 0 ? (
              <div className="text-center py-16 text-dark-300">
                S'u gjet asnje postim. Provo nje kategori ose kerkim tjeter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {displayedPosts.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  ←
                </button>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCurrentPage(n)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${n === currentPage ? "bg-primary text-white" : "border border-gray-200 text-dark hover:bg-gray-50"}`}
                  >
                    {String(n).padStart(2, "0")}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(6, currentPage + 1))}
                  className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

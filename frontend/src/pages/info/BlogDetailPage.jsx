import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  Send,
  Share2,
  Link as LinkIcon,
  RotateCw,
} from "lucide-react";

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

const latestBlogs = [
  {
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    date: "28 Nov, 2015",
    image: "https://picsum.photos/seed/lb1/80/80",
  },
  {
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    date: "28 Nov, 2015",
    image: "https://picsum.photos/seed/lb2/80/80",
  },
  {
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    date: "28 Nov, 2015",
    image: "https://picsum.photos/seed/lb3/80/80",
  },
];

const initialComments = [
  {
    name: "Annette Black",
    date: "26 Apr, 2021",
    avatar: "https://i.pravatar.cc/40?img=1",
    text: "In a nisi commodo, porttitor ligula consequat, tincidunt dui. Nulla volutpat, metus eu aliquam malesuada, elit libero venenatis urna, consequat maximus arcu diam non diam.",
  },
  {
    name: "Devon Lane",
    date: "24 Apr, 2021",
    avatar: "https://i.pravatar.cc/40?img=2",
    text: "Quisque eget tortor lobortis, facilisis metus eu, elementum est. Nunc sit amet erat quis ex convallis suscipit. Nam hendrerit, velit ut aliquam euismod, nibh tortor rutrum nisi.",
  },
  {
    name: "Jacob Jones",
    date: "20 Apr, 2021",
    avatar: "https://i.pravatar.cc/40?img=3",
    text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
  },
  {
    name: "Jane Cooper",
    date: "18 Apr, 2021",
    avatar: "https://i.pravatar.cc/40?img=4",
    text: "Pellentesque feugiat, nibh vel vehicula pretium, nibh nibh bibendum elit, a volutpat arcu dui nec orci. Aenean dui odio, ullamcorper quis turpis ac, volutpat imperdiet ex.",
  },
  {
    name: "Darrell Steward",
    date: "7 Apr, 2021",
    avatar: "https://i.pravatar.cc/40?img=5",
    text: "Nulla molestie interdum ultricies.",
  },
];

export default function BlogDetailPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const title =
    searchParams.get("title") ||
    "How artist collective Meow Wolf's website complements their immersive venues";
  const author = searchParams.get("author") || "Marvin McKinney";
  const date = searchParams.get("date") || "8 Sep, 2020";
  const comments_count = searchParams.get("comments") || "738";
  const image =
    searchParams.get("image") ||
    "https://picsum.photos/seed/blogdetail/900/500";

  // Comment form + lista funksionale
  const [comments, setComments] = useState(initialComments);
  const [visibleCount, setVisibleCount] = useState(5);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");

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

  const handlePostComment = () => {
    if (!fullName.trim() || !commentText.trim()) {
      alert("Ju lutem plotesoni emrin dhe komentin");
      return;
    }

    const today = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const randomAvatar = `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`;

    const newComment = {
      name: fullName,
      date: today,
      avatar: randomAvatar,
      text: commentText,
    };

    // Shto komentin e ri ne fillim te listes
    setComments([newComment, ...comments]);
    setVisibleCount((c) => c + 1);

    // Pastro formen
    setFullName("");
    setEmail("");
    setCommentText("");
  };

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
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm flex-wrap">
          <Home size={14} className="text-dark-300" />
          <Link to="/" className="text-dark-300 hover:text-primary">
            Home
          </Link>
          <ChevronRight size={14} className="text-dark-300" />
          <span className="text-dark-300">Pages</span>
          <ChevronRight size={14} className="text-dark-300" />
          <Link to="/blog" className="text-dark-300 hover:text-primary">
            Blog
          </Link>
          <ChevronRight size={14} className="text-dark-300" />
          <span className="text-info font-medium">Blog Detail</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main content */}
          <article>
            <img
              src={image}
              alt={title}
              className="w-full h-[400px] object-cover rounded-lg mb-6"
            />

            <div className="flex items-center gap-4 text-xs text-dark-300 mb-4">
              <span className="flex items-center gap-1 text-primary font-medium">
                Electronics
              </span>
              <span className="flex items-center gap-1">
                <User size={14} className="text-primary" /> {author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-primary" /> {date}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare size={14} className="text-primary" />{" "}
                {comments_count}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-dark mb-4 leading-tight">
              {title}
            </h1>

            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <img
                  src="https://i.pravatar.cc/40?img=12"
                  alt=""
                  className="w-9 h-9 rounded-full"
                />
                <span className="text-sm font-medium text-dark">
                  Cameron Williamson
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center hover:opacity-90">
                  <MessageSquare size={16} />
                </button>
                <button className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-90">
                  <Share2 size={16} />
                </button>
                <button className="w-9 h-9 rounded-full bg-sky-400 text-white flex items-center justify-center hover:opacity-90">
                  <Send size={16} />
                </button>
                <button className="w-9 h-9 rounded-full bg-gray-200 text-dark flex items-center justify-center hover:opacity-90">
                  <LinkIcon size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-sm text-dark-300 leading-relaxed">
              <p>
                Sed a laoreet erat, in vehicula erat. Vivamus a viverra ipsum,
                ut interdum tellus. Donec quis ex quis metus sodales facilisis
                ut nec ex. Ut commodo lacus vel odio venenatis, sit amet lacinia
                lacus cursus. Ut sodales laoreet dapibus.
              </p>

              <blockquote className="bg-orange-50 border-l-4 border-primary p-5 rounded my-6">
                <p className="text-dark italic">
                  "Vintage meets vogue is the only way to describe this serif
                  typeface. Neue World encompasses the mode high-fashion
                  aesthetic of the 1960s with a commercial take."
                </p>
              </blockquote>

              <p>
                Mauris fermentum faucibus risus a efficitur. Morbi sit amet arcu
                turpis. Ut nisl velit, mattis at augue vel, molestie egestas
                justo. Aliquam elementum nibh neque, eu ornare nunc feugiat sed.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                iaculis nunc urna, id lobortis elit dapibus et. Etiam ultricies
                leo justo, nec vehicula augue auctor et. Sed finibus volutpat
                dui.
              </p>

              <div className="grid grid-cols-2 gap-4 my-6">
                <img
                  src="https://picsum.photos/seed/robot/400/300"
                  alt=""
                  className="w-full h-64 object-cover rounded-lg"
                />
                <img
                  src="https://picsum.photos/seed/crypto/400/300"
                  alt=""
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <p>
                Proin pulvinar quam at aliquet sagittis. Quisque laoreet luctus
                bibendum. Aenean in dignissim orci. Suspendisse at augue eget
                neque dictum vestibulum eu ac orci.
              </p>
            </div>

            {/* Leave a Comment */}
            <div className="mt-10">
              <h3 className="text-lg font-bold text-dark mb-5">
                Leave a Comment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-dark mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-200 rounded h-11 px-3 text-sm text-dark outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded h-11 px-3 text-sm text-dark outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-dark mb-2">
                  Description
                </label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="What's your thought about this blog..."
                  rows={4}
                  className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm text-dark outline-none focus:border-primary resize-none"
                />
              </div>
              <button
                onClick={handlePostComment}
                className="bg-primary hover:bg-primary-600 text-white text-xs font-bold uppercase tracking-wide px-6 py-3 rounded transition-colors"
              >
                Post Comment
              </button>
            </div>

            {/* Comments */}
            <div className="mt-10">
              <h3 className="text-lg font-bold text-dark mb-5">
                Comments{" "}
                <span className="text-dark-300 font-normal">
                  ({comments.length})
                </span>
              </h3>
              <div className="space-y-5">
                {comments.slice(0, visibleCount).map((c, i) => (
                  <div
                    key={i}
                    className="flex gap-3 pb-5 border-b border-gray-100 last:border-0"
                  >
                    <img
                      src={c.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-dark">
                          {c.name}
                        </h4>
                        <span className="text-xs text-dark-300">
                          • {c.date}
                        </span>
                      </div>
                      <p className="text-sm text-dark-300 leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {visibleCount < comments.length && (
                <button
                  onClick={() => setVisibleCount((c) => c + 5)}
                  className="mt-6 border border-primary text-primary text-xs font-bold uppercase tracking-wide px-6 py-3 rounded hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                >
                  <RotateCw size={14} /> Load More
                </button>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-gray-100 rounded-lg p-5">
              <h3 className="font-bold text-dark mb-4 text-sm tracking-wide">
                SEARCH
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full border border-gray-200 rounded h-10 px-3 pr-9 text-sm text-dark outline-none focus:border-primary"
                />
                <Search
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-300"
                />
              </div>
            </div>

            <div className="border border-gray-100 rounded-lg p-5">
              <h3 className="font-bold text-dark mb-4 text-sm tracking-wide">
                LATEST BLOG
              </h3>
              <div className="space-y-4">
                {latestBlogs.map((b, i) => (
                  <div key={i} className="flex gap-3">
                    <img
                      src={b.image}
                      alt=""
                      className="w-16 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs text-dark line-clamp-2 mb-1">
                        {b.title}
                      </p>
                      <span className="text-[10px] text-dark-300">
                        {b.date}
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
                    src={`https://picsum.photos/seed/dgal${i}/80/80`}
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
                  <span
                    key={tag}
                    className="border border-gray-200 text-dark-300 text-xs px-3 py-1.5 rounded hover:border-primary hover:text-primary cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

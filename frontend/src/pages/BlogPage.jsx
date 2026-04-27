import BlogCard from "../components/blog/BlogCard"
import Sidebar from "../components/blog/Sidebar"

function BlogPage() {

  const posts = [
    {
      image: "https://via.placeholder.com/400",
      author: "Cameron",
      date: "1 Feb, 2020",
      comments: 738,
      title: "Curabitur pulvinar aliquam lectus",
      description: "Mauris scelerisque odio id rutrum volutpat..."
    },
    {
      image: "https://via.placeholder.com/400",
      author: "Floyd",
      date: "17 Oct, 2020",
      comments: 826,
      title: "Curabitur massa orci",
      description: "Pellentesque vestibulum lorem vel gravida..."
    },
  ]

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* top filter */}
      <div className="flex justify-between mb-6">
        <input
          placeholder="Search..."
          className="border px-4 py-2 w-1/3"
        />

        <select className="border px-4 py-2">
          <option>Most Popular</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <div className="col-span-1">
          <Sidebar />
        </div>

        {/* BLOGS */}
        <div className="col-span-3 grid grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>

      </div>

    </div>
  )
}

export default BlogPage
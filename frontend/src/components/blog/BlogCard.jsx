function BlogCard({ post }) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <img
        src={post.image}
        alt=""
        className="w-full h-48 object-cover rounded"
      />

      <div className="flex gap-4 text-sm text-gray-500 mt-3">
        <span>👤 {post.author}</span>
        <span>📅 {post.date}</span>
        <span>💬 {post.comments}</span>
      </div>

      <h2 className="font-semibold text-lg mt-2">
        {post.title}
      </h2>

      <p className="text-gray-500 text-sm mt-2">
        {post.description}
      </p>

      <button className="mt-4 border px-4 py-2 text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white transition">
        READ MORE →
      </button>
    </div>
  )
}

export default BlogCard
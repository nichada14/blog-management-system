import { Link } from "react-router-dom";
import type { BlogCardProps } from "../types/props";

export default function BlogCard({ blog, isOwner, onEdit, onDelete }: BlogCardProps) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4 hover:shadow-lg transition-all">
      {/* Blog title */}
      <h2 className="text-xl font-semibold text-blue-700">{blog.title}</h2>

      {/* Author name and creation date */}
      <p className="text-sm text-gray-500 mt-1">
        ✍️ {blog.author.username} • 🕓 {new Date(blog.createdAt).toLocaleString()}
      </p>

      {/* Link to blog detail page */}
      <div className="mt-2">
        <Link to={`/blogs/${blog.id}`} className="text-blue-500 hover:underline">
          Read More...
        </Link>
      </div>

      {/* Show edit and delete buttons only if current user is the owner */}
      {isOwner && (
        <div className="mt-3 flex gap-3">
          <button onClick={onEdit} className="text-sm text-yellow-600 hover:underline" aria-label="Edit blog">
            ✏️ Edit
          </button>
          <button onClick={onDelete} className="text-sm text-red-600 hover:underline" aria-label="Delete blog">
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}

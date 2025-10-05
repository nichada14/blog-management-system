import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import BlogSearch from "../components/BlogSearch";
import { useNavigate } from "react-router-dom";
import type { Blog } from "../types/blog";

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch all blogs from API (with optional search query)
  const fetchBlogs = async (query = "") => {
    try {
      const res = await axios.get("/api/blogs", {
        params: { search: query },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBlogs(res.data);
    } catch (error) {
      // Redirect to login if unauthorized
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/auth");
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle searching blogs by keyword
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    fetchBlogs(query);
  };

  // Delete blog by id, only owner allowed (handled on server)
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure to delete this blog?")) return;
    try {
      await axios.delete(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <button
          onClick={() => navigate("/blogs/create")}
          className="bg-[#FEC709] hover:bg-yellow-600 text-black px-4 py-2 rounded cursor-pointer"
        >
          + Create Blog
        </button>
      </div>

      {/* Search component */}
      <BlogSearch onSearch={handleSearch} />

      {/* List all blogs */}
      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            isOwner={false} 
            onDelete={() => handleDelete(blog.id)}
            onEdit={() => navigate(`/blogs/edit/${blog.id}`)}
          />
        ))
      )}
    </div>
  );
}

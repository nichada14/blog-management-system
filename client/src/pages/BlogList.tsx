import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import BlogSearch from "../components/BlogSearch";
import { useNavigate } from "react-router-dom";
import type { Blog } from "../types/blog";

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId") || "";

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBlogs(res.data);
      setFilteredBlogs(res.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/auth");
      } else {
        console.error("Failed to fetch blogs", error);
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    const lowerQuery = query.toLowerCase();

    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(lowerQuery)
    );

    setFilteredBlogs(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure to delete this blog?")) return;

    try {
      await axios.delete(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // อัปเดตทั้งสอง state หลังลบ
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setFilteredBlogs((prev) => prev.filter((b) => b.id !== id));
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

      <BlogSearch onSearch={handleSearch} />

      {filteredBlogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        filteredBlogs.map((blog) => {
          const isOwner = String(blog.author.id) === currentUserId;
          return (
            <BlogCard
              key={blog.id}
              blog={blog}
              isOwner={isOwner}
              onDelete={isOwner ? () => handleDelete(blog.id) : undefined}
              onEdit={() => {
                if (isOwner) {
                  navigate(`/blogs/edit/${blog.id}`);
                } else {
                  alert("Not authorized to edit this blog");
                }
              }}
            />
          );
        })
      )}
    </div>
  );
}

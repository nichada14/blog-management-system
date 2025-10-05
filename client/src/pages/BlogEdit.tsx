import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BlogForm from "../components/BlogForm";
import type { Blog } from "../types/blog";


export default function BlogEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch blog detail by ID on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBlog(res.data);
      } catch (error) {
        alert("Failed to fetch blog");
        navigate("/blogs");
      }
    };
    fetchBlog();
  }, [id, navigate]);

  // Handle update blog with API call
  const handleUpdate = async (data: { title: string; content: string }) => {
    setIsLoading(true);
    try {
      await axios.put(`/api/blogs/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate(`/blogs/${id}`); // After success, redirect to blog detail page
    } catch (error) {
      alert("Failed to update blog");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading or blog form
  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
      <BlogForm initialData={{ title: blog.title, content: blog.content }} onSubmit={handleUpdate} isLoading={isLoading} />
    </div>
  );
}

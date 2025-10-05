import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentList from "../components/CommentList";
import CommentInput from "../components/CommentInput";
import type { Blog } from "../types/blog";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch blog detail including comments
  const fetchBlogDetail = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBlog(res.data);
    } catch (error) {
      alert("Failed to load blog");
      navigate("/blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  // Handle submit new comment to API, then reload comments
  const handleAddComment = async (content: string) => {
    try {
      await axios.post(
        `/api/blogs/${id}/comments`,
        { content },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchBlogDetail(); // Refresh blog detail with new comment
    } catch (error) {
      alert("Failed to add comment");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        ✍️ {blog.author.username} • 🕓 {new Date(blog.createdAt).toLocaleString()}
      </p>

      <div className="prose mb-10 whitespace-pre-wrap">{blog.content}</div>

      <hr />

      <h2 className="text-2xl font-semibold mt-8">Comments</h2>

      <CommentList comments={blog.comments} />

      <CommentInput onSubmit={handleAddComment} />
    </div>
  );
}

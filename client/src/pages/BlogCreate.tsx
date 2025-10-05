import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import axiosInstance from "../api/axiosInstance";

export default function BlogCreate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (data: { title: string; content: string }) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/blogs", data);
      navigate("/blogs/list");
    } catch (error) {
      alert("Failed to create blog");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>
      <BlogForm onSubmit={handleCreate} isLoading={isLoading} />
    </div>
  );
}

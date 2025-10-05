import { useState, useEffect } from "react";
import type { Blog } from "../types/blog";

type Props = {
  initialData?: Pick<Blog, "title" | "content">;
  onSubmit: (data: { title: string; content: string }) => void;
  isLoading?: boolean;
};

export default function BlogForm({ initialData, onSubmit, isLoading }: Props) {
  // Local state for title and content input fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");

  // Handle form submission and call parent's onSubmit with trimmed data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title: title.trim(), content: content.trim() });
    }
  };

  // When initialData changes (editing mode), update input fields
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
      <label className="block mb-2 font-semibold">Title</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        minLength={1}
      />

      <label className="block mb-2 font-semibold">Content</label>
      <textarea
        rows={8}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 resize-none focus:outline-none focus:ring focus:ring-blue-200"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        minLength={1}
      />

      {/* Submit button disables when loading */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#FEC709] hover:bg-yellow-600 text-black px-6 py-2 rounded  disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

import { useState } from "react";
import type { CommentInputProps } from "../types/props";

export default function CommentInput({ onSubmit }: CommentInputProps) {
  const [content, setContent] = useState("");

  // Handle submit comment and reset input field
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      {/* Comment textarea */}
      <textarea
        rows={3}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring"
        placeholder="Write your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      {/* Submit button */}
      <button type="submit" className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Submit Comment
      </button>
    </form>
  );
}

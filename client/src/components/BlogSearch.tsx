// src/components/BlogSearch.tsx
import { useState } from "react";
import type { BlogSearchProps } from "../types/props";

export default function BlogSearch({ onSearch }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
      <input
        type="text"
        placeholder="🔍 Search blog..."
        className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-200"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-[#FEC709] hover:bg-yellow-600 text-black px-4 py-2 rounded transition cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}

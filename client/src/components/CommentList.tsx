import type { CommentListProps } from "../types/props";

export default function CommentList({ comments }: CommentListProps) {
  // If no comments, show placeholder text
  if (comments.length === 0) return <p className="text-gray-400">No comments yet.</p>;

  return (
    <ul className="space-y-3 mt-4">
      {comments.map((comment) => (
        <li key={comment.id} className="bg-gray-50 p-3 rounded shadow-sm">
          {/* Comment content */}
          <p className="text-gray-700">{comment.content}</p>

          {/* Comment author and date */}
          <p className="text-xs text-gray-500 mt-1">
            💬 {comment.author.username} • 🕓 {new Date(comment.createdAt).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
}

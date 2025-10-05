import type { LoginPayload, RegisterPayload } from "./auth";
import type { Blog } from "./blog";


export interface BlogCardProps {
  blog: Blog;
  isOwner?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface BlogSearchProps {
  onSearch: (query: string) => void;
}

export interface CommentListProps {
  comments: Comment[];
}

export interface CommentInputProps {
  onSubmit: (content: string) => void;
}

export interface AuthFormProps {
  onRegister: (data: RegisterPayload) => void;
  onLogin: (data: LoginPayload) => void;
  isLoading?: boolean;
  errorMessage?: string;
}
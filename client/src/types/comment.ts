import type { User } from "./blog";

export interface Comment {
    id: string;
    content: string;
    author: User;
    createdAt: string;
  }
  
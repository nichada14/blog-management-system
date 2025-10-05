import axiosInstance from "./axiosInstance";
import type { Comment } from "../types/comment";

//Fetch comments for a blog post by blog ID
export const fetchCommentsByBlogId = (blogId: number): Promise<Comment[]> => {
  return axiosInstance.get(`/blogs/${blogId}/comments`).then(res => res.data);
};

//Create a new comment on a blog post
export const createComment = (blogId: number, content: string): Promise<Comment> => {
  return axiosInstance.post(`/blogs/${blogId}/comments`, { content }).then(res => res.data);
};

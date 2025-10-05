import axiosInstance from "./axiosInstance";
import type { Blog, BlogCreatePayload, BlogUpdatePayload } from "../types/blog";

// Fetch all blogs with optional search term
export const fetchBlogs = async (searchTerm?: string): Promise<Blog[]> => {
  const res = await axiosInstance.get("/blogs", { params: { search: searchTerm } });
  return res.data;
};

// Fetch blog by ID
export const fetchBlogById = async (id: string): Promise<Blog> => {
  const res = await axiosInstance.get(`/blogs/${id}`);
  return res.data;
};

// Create new blog post
export const createBlog = async (data: BlogCreatePayload): Promise<Blog> => {
  const res = await axiosInstance.post("/blogs", data);
  return res.data;
};

// Update blog post by ID
export const updateBlog = async (id: string, data: BlogUpdatePayload): Promise<Blog> => {
  const res = await axiosInstance.put(`/blogs/${id}`, data);
  return res.data;
};

// Delete blog post by ID
export const deleteBlog = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/blogs/${id}`);
};

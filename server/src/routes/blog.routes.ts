// src/routes/blog.routes.ts

import { Router } from 'express'
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = Router()

// Public - Get all blogs
router.get('/', getAllBlogs)

// Public - Get blog by ID
router.get('/:id', authMiddleware, getBlogById)

// Protected - Create blog
router.post('/', authMiddleware, createBlog)

// Protected - Update own blog
router.put('/:id', authMiddleware, updateBlog)

// Protected - Delete own blog
router.delete('/:id', authMiddleware, deleteBlog)

export default router

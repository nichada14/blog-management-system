import { Router } from 'express'
import { createComment, getCommentsByBlog } from '../controllers/comment.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = Router()

// Public - Get comments for a blog
router.get('/:id', getCommentsByBlog)

// Protected - Add comment to a blog
router.post('/:id', authMiddleware, createComment)

export default router

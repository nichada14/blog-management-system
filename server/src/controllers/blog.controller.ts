import { Response } from 'express'
import prisma from '../../prisma/client'
import { RequestWithUser } from '../types/user'

// Get all blogs with author info, sorted by newest first
export const getAllBlogs = async (_req: RequestWithUser, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: { select: { id: true, username: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json(blogs)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Get blog by ID with author and comments
export const getBlogById = async (req: RequestWithUser<{ id: string }>, res: Response) => {
  const { id } = req.params

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, username: true } },
        comments: {
          include: { user: { select: { id: true, username: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }

    res.json(blog)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Create new blog - only logged in user can create
export const createBlog = async (req: RequestWithUser, res: Response) => {
  const { title, content } = req.body
  const userId = req.user?.id

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' })
  }

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    })

    res.status(201).json(blog)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Update blog by ID - only blog owner can update
export const updateBlog = async (req: RequestWithUser<{ id: string }>, res: Response) => {
  const { id } = req.params
  const { title, content } = req.body
  const userId = req.user?.id

  try {
    const blog = await prisma.blog.findUnique({ where: { id } })

    if (!blog || blog.authorId !== userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: { title, content },
    })

    res.json(updatedBlog)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete blog by ID - only blog owner can delete
export const deleteBlog = async (req: RequestWithUser<{ id: string }>, res: Response) => {
  const { id } = req.params
  const userId = req.user?.id

  try {
    const blog = await prisma.blog.findUnique({ where: { id } })

    if (!blog || blog.authorId !== userId) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await prisma.blog.delete({ where: { id } })

    res.json({ message: 'Blog deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

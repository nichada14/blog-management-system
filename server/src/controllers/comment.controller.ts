import { Response } from 'express'
import prisma from '../../prisma/client'
import { RequestWithUser } from '../types/user'

// Get comments by blog ID
export const getCommentsByBlog = async (req: RequestWithUser<{ id: string }>, res: Response) => {
  const { id } = req.params

  try {
    const comments = await prisma.comment.findMany({
      where: { blogId: id },
      include: {
        user: { select: { id: true, username: true } },
      },
      orderBy: { createdAt: 'asc' },
    })

    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments' })
  }
}

// Create comment for blog
export const createComment = async (req: RequestWithUser<{ id: string }>, res: Response) => {
  const { id } = req.params // blog ID
  const { content } = req.body
  const userId = req.user?.id

  if (!content) {
    return res.status(400).json({ message: 'Content is required' })
  }

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        blogId: id,
        userId,
      },
    })

    res.status(201).json(comment)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment' })
  }
}

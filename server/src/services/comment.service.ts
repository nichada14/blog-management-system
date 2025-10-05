import prisma from '../../prisma/client'

export const getCommentsByBlogId = async (blogId: string) => {
  // Get all comments for a blog, including author username
  return await prisma.comment.findMany({
    where: { blogId },
    include: { author: { select: { username: true } } },
    orderBy: { createdAt: 'asc' },
  })
}

export const createComment = async (blogId: string, userId: string, content: string) => {
  // Add comment to blog
  return await prisma.comment.create({
    data: {
      content,
      blogId,
      authorId: userId,
    },
  })
}

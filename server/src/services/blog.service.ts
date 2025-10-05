import prisma from '../../prisma/client'

export const createBlog = async (userId: string, title: string, content: string) => {
  // Create new blog post with author
  return await prisma.blog.create({
    data: {
      title,
      content,
      authorId: userId,
    },
  })
}

export const getAllBlogs = async (search?: string) => {
  // Get all blogs, optional search by title or content
  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {}

  return await prisma.blog.findMany({
    where,
    include: {
      author: { select: { username: true } }, // Include author name
    },
    orderBy: { createdAt: 'desc' },
  })
}

export const getBlogById = async (id: string) => {
  // Find blog by ID with author info
  return await prisma.blog.findUnique({
    where: { id },
    include: { author: { select: { username: true } } },
  })
}

export const updateBlog = async (id: string, userId: string, title: string, content: string) => {
  // Update blog if user is author
  const blog = await prisma.blog.findUnique({ where: { id } })
  if (!blog || blog.authorId !== userId) return null

  return await prisma.blog.update({
    where: { id },
    data: { title, content },
  })
}

export const deleteBlog = async (id: string, userId: string) => {
  // Delete blog if user is author
  const blog = await prisma.blog.findUnique({ where: { id } })
  if (!blog || blog.authorId !== userId) return null

  return await prisma.blog.delete({ where: { id } })
}

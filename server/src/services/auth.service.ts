import prisma from '../../prisma/client'
import bcrypt from 'bcryptjs'

export const findUserByEmail = async (email: string) => {
  // Find user by email in DB
  return await prisma.user.findUnique({ where: { email } })
}

export const createUser = async (username: string, email: string, password: string) => {
  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create and return new user
  return await prisma.user.create({
    data: { username, email, password: hashedPassword },
  })
}

export const verifyPassword = async (password: string, hashed: string) => {
  // Compare plain password with hashed password
  return await bcrypt.compare(password, hashed)
}

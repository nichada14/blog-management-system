import { Request, Response } from 'express'
import prisma from '../../prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (username.length < 4 || username.length > 20) {
    return res.status(400).json({ message: 'Username must be 4-20 characters' })
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' })
  }

  // Check for existing user
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' })
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  })

  res.status(201).json({ message: 'User registered successfully', userId: newUser.id })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

  res.json({ token })
}

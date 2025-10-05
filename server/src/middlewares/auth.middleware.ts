import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { RequestWithUser, UserPayload } from '../types/user'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    // Verify token and get payload
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload

    // Attach full user info to request object
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      username: decoded.username,
    }

    next()
  } catch {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }
}

export default authMiddleware

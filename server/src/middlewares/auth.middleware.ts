import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { RequestWithUser, UserPayload } from '../types/user'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload

    // Attach decoded user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }
}

export default authMiddleware

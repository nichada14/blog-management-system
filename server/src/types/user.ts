import { Request } from 'express'

export interface UserPayload {
  userId?: string
  id: string
  email: string
  username: string
  iat?: number
  exp?: number
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    username: string
  }
}

export interface RequestWithUser<
  P = Record<string, any>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: UserPayload
}

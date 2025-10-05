import jwt, { SignOptions } from 'jsonwebtoken'
import ms from 'ms'
import { UserPayload } from '../types/user'

const JWT_SECRET = process.env.JWT_SECRET as string

export const signJwt = (payload: UserPayload, expiresIn = '7d'): string => {
  const expiresInMs = ms(expiresIn as ms.StringValue) || ms('7d')

  const options: SignOptions = {
    expiresIn: expiresInMs / 1000,
  }

  return jwt.sign(payload, JWT_SECRET, options)
}

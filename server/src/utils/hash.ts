import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string): Promise<string> => {
  // Hash plain password
  return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  // Compare plain password with hashed password
  return await bcrypt.compare(password, hashed)
}

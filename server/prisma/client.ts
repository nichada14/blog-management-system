import { PrismaClient } from '@prisma/client'

// Prevent creating multiple instances in development
const globalForPrisma = globalThis as { prisma?: PrismaClient }

// Create a new PrismaClient if one doesn't exist
const prisma = globalForPrisma.prisma ?? new PrismaClient()

// Save the instance globally in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma

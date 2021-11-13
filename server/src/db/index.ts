import { PrismaClient } from '@prisma/client'
import 'reflect-metadata'
import 'dotenv/config'

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return Number(this)
}

export const prisma = new PrismaClient()

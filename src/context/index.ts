import { PrismaClient } from "@prisma/client";

export interface Context {
    prisma: PrismaClient,
    req: Express.Request
}

export const context = {
    prisma: new PrismaClient()
}
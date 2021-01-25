import { PrismaClient } from "@prisma/client";

export interface Context {
    prisma: PrismaClient,
    req: Express.Request
    res: Express.Response
}

export const context = {
    prisma: new PrismaClient()
}
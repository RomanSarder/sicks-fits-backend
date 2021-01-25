import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express'

export interface Context {
    prisma: PrismaClient,
    req: Request
    res: Response
}

export const context = {
    prisma: new PrismaClient()
}
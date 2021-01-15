// import { PrismaClient } from "@prisma/client";

import {  } from "graphql-yoga/dist/types";

export interface Context {
    prisma: any,
    req: Express.Request
}

export const context = {
    prisma: {}
}
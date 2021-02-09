declare namespace Express {
    export interface Request {
        userId: number,
        role: "ADMIN" | "USER"
    }
}
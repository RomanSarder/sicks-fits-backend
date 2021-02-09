declare namespace Express {
    export interface Request {
        userId: number,
        role: {
            name: string,
            permissions: {
                canManageCart: boolean
                canManageOrders: boolean
                canManageProducts: boolean
                canManageRoles: boolean
                canManageUsers: boolean
                canSeeOtherUsers: boolean
            }
        }
    }
}
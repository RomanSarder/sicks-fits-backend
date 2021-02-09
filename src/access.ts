import { Context } from "./context";

export function isSignedIn ({ req }: Context) {
    return !!req.userId
}

export const permissions = {
    canManageProducts ({ req }: Context) {
        return req.role?.permissions.canManageProducts
    },
    canSeeOtherUsers ({ req }: Context) {
        return req.role.permissions.canSeeOtherUsers
    },
    canManageUsers ({ req }: Context) {
        return req.role.permissions.canManageUsers
    },
    canManageRoles ({ req }: Context) {
        return req.role.permissions.canManageRoles
    },
    canManageOrders ({ req }: Context) {
        return req.role.permissions.canManageOrders
    },
    canManageCart ({ req }: Context) {
        return req.role.permissions.canManageCart
    },
}

export const rules = {
    canManageProducts ({ req }: Context) {
        const permissionToManageProducts = permissions.canManageProducts(req)
        
        if (permissionToManageProducts) {
            return true
        } else {
            return {
                where: {
                    
                }
            }
        }
    }
}
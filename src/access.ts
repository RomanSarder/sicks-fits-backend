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
    async canManageProducts (ctx: Context, id: number) {
        const { prisma, req } = ctx
        
        if (permissions.canManageProducts(ctx)) {
            return true
        }

        const item = await prisma.item.findUnique({
            where: {
                id
            }
        })

        if (item === null) {
            throw new Error('Item is not found')
        }

        return item.ownerId === req.userId
    }
}
import { Context } from "./context";

export const rules = {
    async canManageProducts (ctx: Context, id: number) {
        const { prisma, req } = ctx
        
        if (req.role === 'ADMIN') {
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
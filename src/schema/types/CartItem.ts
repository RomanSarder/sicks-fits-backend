import { intArg, mutationType, nonNull, objectType } from "nexus";
import { Context } from "src/context";

export const CartItem = objectType({
    name: 'CartItem',
    definition(t) {
        t.model.quantity()
        t.model.user()
        t.model.userId()
        t.model.item()
        t.model.itemId()
    }
})

export const CartMutations = mutationType({
    definition(t) {
        t.field('addToCart', {
            type: CartItem,
            args: {
                itemId: nonNull(intArg()),
            },
            async resolve (_root, args, ctx: Context) {
                const { prisma, req } = ctx
                const { itemId } = args
                const { userId } = req
                const targetItem = await prisma.item.findUnique({
                    where: {
                        id: itemId
                    }
                })

                if (targetItem === null) {
                    throw new Error('Unable to find item with this id')
                }

                return prisma.cartItem.upsert({
                    where: {
                        itemId_userId: {
                            itemId,
                            userId
                        }
                    },
                    update: {
                        quantity: {
                            increment: 1
                        }
                    },
                    create: {
                        quantity: 1,
                        user: {
                            connect: {
                                id: userId
                            }
                        },
                        item: {
                            connect: {
                                id: itemId
                            }
                        }
                    }
                })
            } 
        })
    }
})
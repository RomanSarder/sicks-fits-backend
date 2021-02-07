import { intArg, mutationType, nonNull, objectType, stringArg } from "nexus";
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
        t.field('deleteCartItem', {
            type: Int,
            args: {
                itemId: nonNull(intArg()),
                userId: nonNull(intArg()),
            },
            async resolve(_root, args, ctx: Context) {
                const { prisma, req } = ctx
                const { itemId, userId } = args
                // const { userId } = req
                const targetItem = await prisma.item.findUnique({
                    where: {
                        id: itemId
                    }
                })

                if (targetItem === null) {
                    throw new Error('Unable to find item with this id')
                }

                const targetCartItemFilter = {
                    itemId_userId: {
                        itemId,
                        userId
                    }
                }

                const cartItem = await prisma.cartItem.findUnique({
                    where: targetCartItemFilter
                })

                if (cartItem?.quantity === 1) {
                    return prisma.cartItem.delete({
                        where: targetCartItemFilter
                    })
                } else {
                    return prisma.cartItem.update({
                        where: targetCartItemFilter,
                        data: {
                            quantity: {
                                decrement: 1
                            }
                        }
                    })
                }
            }
        })
    }
})
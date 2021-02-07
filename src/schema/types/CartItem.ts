import { intArg, mutationType, nonNull, objectType, stringArg } from "nexus";
import { Context } from "src/context";

export const CartItem = objectType({
    name: 'CartItem',
    definition(t) {
        t.model.id()
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
            type: nonNull(CartItem),
            args: {
                id: nonNull(intArg()),
            },
            async resolve(_root, args, ctx: Context) {
                const { prisma } = ctx
                const { id } = args

                const cartItem = await prisma.cartItem.findUnique({
                    where: {
                        id
                    }
                })

                if (cartItem === null) {
                    throw new Error('Unable to find cart item with this id')
                } else {
                    if (cartItem.quantity === 1) {
                        return prisma.cartItem.delete({
                            where: {
                                id
                            }
                        })
                    } else {
                        return prisma.cartItem.update({
                            where: {
                                id
                            },
                            data: {
                                quantity: {
                                    decrement: 1
                                }
                            }
                        })
                    }
                }
            }
        })
    }
})
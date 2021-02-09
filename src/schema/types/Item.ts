import { Prisma } from '@prisma/client'
import { objectType, nonNull, stringArg, intArg } from 'nexus'
import { arg, enumType, extendType, inputObjectType, list } from 'nexus/dist/core'
import { isSignedIn, permissions, rules } from '../../access'
import { Context } from '../../context'

export const OrderByEnum = enumType({
    name: 'OrderBy',
    members: ['asc', 'desc'],
})

const ItemOrderByInput = inputObjectType({
    name: 'ItemOrderByInput',
    definition (t) {
        t.field('createdAt', {
            type: OrderByEnum
        })
    }
})

export const Item = objectType({
    name: 'Item',
    definition(t) {
        t.model.id()
        t.model.title()
        t.model.description()
        t.model.image()
        t.model.largeImage()
        t.model.price()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.owner()
        t.model.ownerId()
    }
})

export const ItemQuery = extendType({
    type: 'Query',
    definition(t) {
        t.crud.item()
        t.field('items', {
            type: nonNull(list(nonNull('Item'))),
            args: {
                take: intArg(),
                skip: intArg(),
                orderBy: arg({
                    type: ItemOrderByInput,
                    default: undefined
                }),
                search: stringArg()
            },
            async resolve(_root, args, ctx: Context) {
                const prisma = ctx.prisma

                const queryOptions = {
                    skip: args.skip as number | undefined,
                    take: args.take as number | undefined,
                    orderBy: args.orderBy as Prisma.ItemOrderByInput,
                }

                return prisma.item.findMany(queryOptions)
            }
        })

        t.field('itemsCount', {
            type: nonNull('Int'),
            async resolve(_root, _args, ctx: Context) {
                const prisma = ctx.prisma
                return await prisma.item.count()
            }
        })

        t.field('searchItems', {
            type: list(nonNull(Item)),
            args: {
                searchString: nonNull(stringArg())
            },
            async resolve(_root, args, ctx: Context) {
                const prisma = ctx.prisma
                const { searchString } = args

                return prisma.item.findMany({
                    where: {
                        OR: [{
                            title: {
                                contains: searchString,
                                mode: 'insensitive'
                            },
                        }, {
                            description: {
                                contains: searchString,
                                mode: 'insensitive'
                            }
                        }]
                    }
                })
            }
        })
    }
})

export const ItemMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createItem', {
            type: nonNull('Item'),
            args: {
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
                price: nonNull(intArg()),
                image: stringArg(),
                largeImage: stringArg()
            },
            async resolve(_root, args, ctx: Context) {
                const { prisma, req: { userId }} = ctx

                if (!isSignedIn(ctx)) {
                    throw new Error('Sorry! You need to be logged in to create items')
                }

                return await prisma.item.create({ data: {
                    ...args,
                    owner: {
                        connect: {
                            id: userId
                        }
                    }
                } })
            }
        })
        t.field('updateItem', {
            type: nonNull('Item'),
            args: {
                id: nonNull(intArg()),
                title: stringArg(),
                description: stringArg(),
                price: intArg(),
                image: stringArg(),
                largeImage: stringArg(),
            },
            async resolve(_root, args, ctx: Context) {
                const prisma = ctx.prisma
                const canUpdateItem = await rules.canManageProducts(ctx, args.id)

                if (!canUpdateItem) {
                    throw new Error('You can only update items that you own')
                }

                const updatedItem = await prisma.item.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        title: args.title as string,
                        price: args.price as number,
                        image: args.image,
                        largeImage: args.largeImage,
                    }
                })
                return updatedItem
            }
        })
        t.field('deleteItem', {
            type: nonNull('Item'),
            args: {
                id: nonNull(intArg())
            },
            async resolve(_root, args, ctx: Context) {
                const prisma = ctx.prisma
                const filter = { where: { id: args.id } }
                
                const canDeleteItem = await rules.canManageProducts(ctx, args.id)
                console.log(canDeleteItem)
                if (!canDeleteItem) {
                    throw new Error('You can only delete items that you own')
                }
                
                return await prisma.item.delete(filter)
            }
        })
    }
})
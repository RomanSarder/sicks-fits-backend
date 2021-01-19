import { objectType, queryType, mutationType, nonNull, stringArg, intArg } from 'nexus'
import { prismaStrategy } from 'nexus-plugin-prisma/dist/pagination/prisma'
import { list, resolveImportPath } from 'nexus/dist/core'
import { Context } from '../../context'

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
    }
})

export const ItemQuery = queryType({
    definition(t) {
        t.crud.item()
        t.field('items', {
            type: nonNull(list(nonNull('Item'))),
            args: {
                take: intArg(),
                skip: intArg(),
            },
            async resolve(_root, args, ctx: Context) {
                const prisma = ctx.prisma

                return prisma.item.findMany({
                    skip: args.skip,
                    take: args.take,

                })
            }
        })

        t.field('itemsCount', {
            type: nonNull('Int'),
            async resolve(_root, _args, ctx: Context) {
                const prisma = ctx.prisma
                return await prisma.item.count()
            }
        })
    }
})

export const ItemMutation = mutationType({
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
                const prisma = ctx.prisma
                return await prisma.item.create({ data: {
                    ...args,
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
                const updatedItem = await prisma.item.update({
                    where: {
                        id: args.id
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
                const item = await prisma.item.findUnique(filter)
                if (item === null) {
                    throw new Error('Item is not found')
                }
                await prisma.item.delete(filter)
                return item;
            }
        })
    }
})
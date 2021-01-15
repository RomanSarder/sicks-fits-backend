import { objectType, queryType, mutationType, nonNull, stringArg, intArg } from 'nexus'
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
        t.crud.items()
        t.crud.item()
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
    }
})
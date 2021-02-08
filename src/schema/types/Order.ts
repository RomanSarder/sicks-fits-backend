import { extendType, nonNull, objectType, stringArg } from "nexus";
import { Context } from "src/context";
import stripe from "../../lib/stripe"
import formatMoney from "../../lib/formatMoney";

export const Order = objectType({
    name: 'Order',
    definition(t) {
        t.model.id()
        t.model.total()
        t.model.items()
        t.model.user()
        t.model.charge()
        t.string('label', {
            resolve (order) {
                return `Order with total of ${formatMoney(order.total)}`
            }
        })
    }
})

export const OrderMutations = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('checkout', {
            type: nonNull(Order),
            args: {
                token: nonNull(stringArg())
            },
            async resolve (_root, { token }, ctx: Context) {
                const { req, prisma } = ctx
                const { userId } = req

                if (!userId) {
                    throw new Error('Sorry! You must be signed in to create an order')
                }

                const usersCartField = await prisma.user.findUnique({
                    where: {
                        id: userId
                    },
                    select: {
                        cart: {
                            include: {
                                item: true
                            }
                        }
                    }
                })

                if (usersCartField === null) {
                    throw new Error('Cart doesn\'t exist')
                }
                
                const { cart } = usersCartField
                const amount = cart.reduce((tally, cartItem) => {
                    return tally + (cartItem.quantity * cartItem.item.price)
                }, 0)
    
                // Stripe logic
                const charge = await stripe.paymentIntents.create({
                    amount,
                    currency: 'USD',
                    confirm: true,
                    payment_method: token
                })
                .catch(e => {
                    console.log(e)
                    throw e
                })

                const orderItemsData = cart.map(cartItem => {
                    return {
                        title: cartItem.item.title as string,
                        description: cartItem.item.description as string,
                        image: cartItem.item.image as string,
                        quantity: cartItem.quantity as number,
                        price: cartItem.item.price as number
                    }
                })

                const order = await prisma.order.create({
                    data: {
                        total: amount,
                        user: {
                            connect: {
                                id: userId
                            }
                        },
                        charge: token,
                        items: {
                            create: orderItemsData
                        }
                    }
                })

                return order
            }
        })
    }
})
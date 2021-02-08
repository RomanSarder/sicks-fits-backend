import stripe, { Stripe } from 'stripe'

const stripeConfig = new Stripe(process.env.STRIPE_SECRET as string, {
    apiVersion: "2020-08-27"
})

export default stripeConfig
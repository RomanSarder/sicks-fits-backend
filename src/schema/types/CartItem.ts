import { mutationType, objectType } from "nexus";

export const CartItem = objectType({
    name: 'CartItem',
    definition(t) {
        t.model.id()
        t.model.quantity()
        t.model.user()
        t.model.item()
    }
})

export const CartMutations = mutationType({
    definition(t) {
        t.crud.createOneCartItem({
            alias: 'createCartItem'
        })
    }
})
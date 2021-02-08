import { objectType } from "nexus";

export const OrderItem = objectType({
    name: 'OrderItem',
    definition(t) {
        t.model.id()
        t.model.title()
        t.model.description()
        t.model.image()
        t.model.quantity()
        t.model.order()
        t.model.price()
    }
})
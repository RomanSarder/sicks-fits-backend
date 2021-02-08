import { objectType } from "nexus";

export const Order = objectType({
    name: 'Order',
    definition(t) {
        t.model.id()
        t.model.total()
        t.model.items()
        t.model.user()
        t.model.charge()
    }
})
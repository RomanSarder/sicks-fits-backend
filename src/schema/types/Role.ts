import { objectType } from "nexus";

export const Role = objectType({
    name: "Role",
    definition(t) {
        t.model.id()
        t.model.assignedTo()
        t.model.name()
        t.model.canManageProducts()
        t.model.canSeeOtherUsers()
        t.model.canManageUsers()
        t.model.canManageRoles()
        t.model.canManageCart()
        t.model.canManageOrders()
    }
})


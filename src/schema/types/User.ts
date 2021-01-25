import { Permission } from "@prisma/client";
import { objectType, enumType } from "nexus";

export const PermissionEnum = enumType({
    name: 'Permission',
    members: [
        'ADMIN',
        'USER',
        'ITEMCREATE',
        'ITEMDELETE',
        'ITEMUPDATE',
        'PERMISSIONUPDATE'
    ],
})

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.password()
        t.model.resetToken()
        t.model.resetTokenExpiry()
        t.model.permissions()
    }
})
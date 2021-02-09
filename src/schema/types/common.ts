import { enumType, objectType } from "nexus";

export const Role = enumType({
    name: 'Role',
    members: [
        'ADMIN',
        'USER'
    ]
})

export const SuccessMessage = objectType({
    name: 'SucessMessage',
    definition(t) {
        t.string('message')
    }
})
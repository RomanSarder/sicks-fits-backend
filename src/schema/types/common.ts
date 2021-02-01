import { objectType } from "nexus";

export const SuccessMessage = objectType({
    name: 'SucessMessage',
    definition(t) {
        t.string('message')
    }
})
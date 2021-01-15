import { 
    objectType, 
    queryType, 
    list, 
    nonNull, 
    mutationType, 
    stringArg } from 'nexus'
import { Context } from '../../context'

export const Dog = objectType({
    name: 'Dog',
    definition(t) {
        t.nonNull.string('name')
    }
})

export const DogQuery = queryType({
    definition(t) {
        t.field('dogs', {
            type: nonNull(list('Dog')),
            resolve(_root, _args, _ctx: Context) {
                return [{ name: 'Sandy' }, { name: 'Rex' }, { name: 'Pyro' }]
            }
        })
    }
})

export const DogMutation = mutationType({
    definition(t) {
        t.field('createDog', {
            type: nonNull('Dog'),
            args: {
                name: nonNull(stringArg())
            },
            resolve(_root, args, _ctx: Context) {
                return Promise.resolve({ name: args.name })
            }
        })
    }
})
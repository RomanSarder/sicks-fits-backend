import { GraphQLServer } from 'graphql-yoga'
import { schema } from './schema'
import { context } from './context'

export const server = new GraphQLServer({
    schema,
    context,
})
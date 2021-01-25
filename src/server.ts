require('dotenv').config()
import { GraphQLServer } from 'graphql-yoga'
import { schema } from './schema'
import { context, Context } from './context'

export const server = new GraphQLServer({
    schema,
    context: contextParams => ({ req: contextParams.request, res: contextParams.response, ...context } as Context),
})
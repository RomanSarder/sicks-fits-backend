import { makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { join } from 'path'

export const schema = makeSchema({
    types: [],
    plugins: [nexusPrisma({ experimentalCRUD: true })],
    outputs: {
        typegen: join(__dirname, '..', 'nexus-typegen.ts'),
        schema: join(__dirname, '..', 'schema.graphql'),
    }
})
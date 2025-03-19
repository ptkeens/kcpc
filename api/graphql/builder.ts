import SchemaBuilder from "@pothos/core"
import PrismaPlugin from "@pothos/plugin-prisma"
import type PrismaTypes from "./generated"
import { PrismaClient } from "@prisma/client"

// Create a new Prisma client instance
export const prisma = new PrismaClient()

// Create a new Pothos schema builder
export const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes
}>({
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma,
        // Include full Prisma model types
        filterConnectionTotalCount: true,
    },
})

// Add a default Query type (required)
builder.queryType({})

// Add a default Mutation type
builder.mutationType({})

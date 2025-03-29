import SchemaBuilder from "@pothos/core"
import PrismaPlugin from "@pothos/plugin-prisma"
import ErrorsPlugin from "@pothos/plugin-errors"
import ScopeAuthPlugin from "@pothos/plugin-scope-auth"
import type PrismaTypes from "./generated"
import { PrismaClient, User } from "@prisma/client"

export const prisma = new PrismaClient()
export type Context = {
    prisma: PrismaClient
    user: User | null
}

export const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes
    Context: Context
    AuthScopes: {
        authenticated: boolean
    }
}>({
    plugins: [ScopeAuthPlugin, PrismaPlugin, ErrorsPlugin],
    prisma: {
        client: prisma,
        filterConnectionTotalCount: true,
    },
    scopeAuth: {
        // Define authentication scopes
        authScopes: (context) => ({
            authenticated: !!context.user,
        }),
    },
})

builder.queryType({})
builder.mutationType({})

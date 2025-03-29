import { builder, prisma } from "../builder"
import { requireAuth } from "./auth/auth"

builder.prismaObject("User", {
    fields: (t) => ({
        id: t.exposeID("id"),
        name: t.exposeString("name"),
        email: t.exposeString("email"),
        username: t.exposeString("username"),
        isEnabled: t.exposeBoolean("isEnabled"),
    }),
})

// Add user queries
builder.queryFields((t) => ({
    // Get current user (protected)
    me: t.prismaField({
        type: "User",
        nullable: true,
        resolve: async (query, _root, _args, ctx) => {
            // Use requireAuth to ensure the user is authenticated
            const user = requireAuth(ctx)
            return prisma.user.findUnique({
                ...query,
                where: { id: user.id },
            })
        },
    }),
    // Get user by ID (only returns current user)
    user: t.prismaField({
        type: "User",
        nullable: true,
        args: {
            id: t.arg.string({ required: true }),
        },
        resolve: async (query, _root, args, ctx) => {
            const user = requireAuth(ctx)

            return await prisma.user.findUnique({
                ...query,
                where: { id: user.id },
            })
        },
    }),
}))

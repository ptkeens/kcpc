import { builder, prisma } from "../builder"

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
    user: t
        .withAuth({
            authenticated: true,
        })
        .prismaField({
            type: "User",
            nullable: true,
            resolve: async (query, _root, _args, ctx) => {
                return await prisma.user.findUnique({
                    ...query,
                    where: { id: ctx.user.id },
                })
            },
        }),
}))

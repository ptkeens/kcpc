import { builder, prisma } from "../builder"

// Define User type using Pothos Prisma plugin
builder.prismaObject("User", {
    // Fields to expose from the User model
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
    // Get user by ID
    user: t.prismaField({
        type: "User",
        nullable: true,
        args: {
            id: t.arg.string({ required: true }),
        },
        resolve: async (query, _root, args, _ctx) => {
            return await prisma.user.findUnique({
                ...query,
                where: { id: args.id },
            })
        },
    }),

    // Get all users
    users: t.prismaField({
        type: ["User"],
        resolve: async (query) => {
            return await prisma.user.findMany({ ...query })
        },
    }),
}))

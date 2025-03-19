import { builder, prisma } from "../builder"

// Define Manufacturer type using Pothos Prisma plugin
builder.prismaObject("Manufacturer", {
    fields: (t) => ({
        id: t.exposeID("id"),
        name: t.exposeString("name"),

        // Relations
        user: t.relation("User"),
    }),
})

// Add manufacturer queries
builder.queryFields((t) => ({
    // Get manufacturer by ID
    manufacturer: t.prismaField({
        type: "Manufacturer",
        nullable: true,
        args: {
            id: t.arg.string({ required: true }),
        },
        resolve: async (query, _root, args, _ctx) => {
            return await prisma.manufacturer.findUnique({
                ...query,
                where: { id: args.id },
            })
        },
    }),

    // Get all manufacturers
    manufacturers: t.prismaField({
        type: ["Manufacturer"],
        resolve: async (query) => {
            return await prisma.manufacturer.findMany({ ...query })
        },
    }),
}))

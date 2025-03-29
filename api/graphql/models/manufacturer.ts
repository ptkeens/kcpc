import { builder, prisma } from "../builder"

builder.prismaObject("Manufacturer", {
    fields: (t) => ({
        id: t.exposeID("id"),
        name: t.exposeString("name"),
    }),
})

builder.queryFields((t) => ({
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

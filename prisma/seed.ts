import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("Start seeding...")

    // Create a test user
    const user = await prisma.user.create({
        data: {
            name: "Test User",
            email: "test@example.com",
            username: "testuser",
            password: "hashed_password_would_go_here", // In production, use proper password hashing
            isEnabled: true,
        },
    })
    console.log(`Created user with id: ${user.id}`)

    // Create Factory Five manufacturer - "World's best-selling, best-engineered, and best-performing replica"
    const factoryFive = await prisma.manufacturer.create({
        data: {
            name: "Factory Five Racing",
            addedByUserId: user.id,
        },
    })
    console.log(`Created manufacturer: ${factoryFive.name}`)

    // Create Cobra kit family - Based on the legendary 427 Cobra
    const cobraFamily = await prisma.kitFamily.create({
        data: {
            name: "Cobra Roadster",
            manufacturerId: factoryFive.id,
            addedByUserId: user.id,
        },
    })
    console.log(`Created kit family: ${cobraFamily.name}`)

    // Create Mark IV kit - The fourth generation model
    const markIV = await prisma.kit.create({
        data: {
            name: "Mark IV",
            year: 2023,
            kitFamilyId: cobraFamily.id,
            addedByUserId: user.id,
        },
    })
    console.log(`Created kit: ${markIV.name}`)

    // Create some basic parts for the Mark IV kit
    const parts = await Promise.all([
        prisma.part.create({
            data: {
                name: "Tubular Steel Frame",
                manufacturerPartNumber: "MK4-FRAME-01",
                description:
                    "Lightweight (376 lbs) and strong tubular steel frame with 4th generation refinements",
                weight: 376.0,
            },
        }),
        prisma.part.create({
            data: {
                name: "Aluminum Body Panels",
                manufacturerPartNumber: "MK4-BODY-01",
                description:
                    "Precision laser-cut 6061-T6 aluminum panels for cockpit, trunk and engine bay",
                weight: 85.0,
            },
        }),
        prisma.part.create({
            data: {
                name: "Fiberglass Body Shell",
                manufacturerPartNumber: "MK4-SHELL-01",
                description:
                    "Accurate reproduction of the 427 Cobra body, based on CSX 3042 and CSX 3035",
                weight: 125.0,
            },
        }),
        prisma.part.create({
            data: {
                name: "Suspension Package",
                manufacturerPartNumber: "MK4-SUSP-01",
                description:
                    "Computer designed suspension system for optimal performance and handling",
                weight: 112.0,
            },
        }),
    ])
    console.log(`Created ${parts.length} parts`)

    // Create part kits connecting parts to the Mark IV kit
    const partKits = await Promise.all([
        prisma.partKit.create({
            data: {
                kitPartNumber: "FF-MK4-01",
                partId: parts[0].id, // Tubular Steel Frame
                kitId: markIV.id,
            },
        }),
        prisma.partKit.create({
            data: {
                kitPartNumber: "FF-MK4-02",
                partId: parts[1].id, // Aluminum Body Panels
                kitId: markIV.id,
            },
        }),
        prisma.partKit.create({
            data: {
                kitPartNumber: "FF-MK4-03",
                partId: parts[2].id, // Fiberglass Body Shell
                kitId: markIV.id,
            },
        }),
        prisma.partKit.create({
            data: {
                kitPartNumber: "FF-MK4-04",
                partId: parts[3].id, // Suspension Package
                kitId: markIV.id,
            },
        }),
    ])
    console.log(`Created ${partKits.length} part kits`)

    // Create part groups for organizing the components
    const partGroups = await Promise.all([
        prisma.partGroup.create({
            data: {
                name: "Chassis & Frame",
                description: "Core structural components",
                displayOrder: 1,
                kitId: markIV.id,
            },
        }),
        prisma.partGroup.create({
            data: {
                name: "Body & Exterior",
                description: "Body panels and exterior components",
                displayOrder: 2,
                kitId: markIV.id,
            },
        }),
        prisma.partGroup.create({
            data: {
                name: "Suspension & Handling",
                description: "Components for ride and handling",
                displayOrder: 3,
                kitId: markIV.id,
            },
        }),
    ])
    console.log(`Created ${partGroups.length} part groups`)

    // Associate parts with part groups
    const partGroupPartKits = await Promise.all([
        prisma.partGroupPartKit.create({
            data: {
                partGroupId: partGroups[0].id, // Chassis & Frame
                partKitId: partKits[0].id, // Tubular Steel Frame
                quantity: 1,
            },
        }),
        prisma.partGroupPartKit.create({
            data: {
                partGroupId: partGroups[1].id, // Body & Exterior
                partKitId: partKits[1].id, // Aluminum Body Panels
                quantity: 1,
            },
        }),
        prisma.partGroupPartKit.create({
            data: {
                partGroupId: partGroups[1].id, // Body & Exterior
                partKitId: partKits[2].id, // Fiberglass Body Shell
                quantity: 1,
            },
        }),
        prisma.partGroupPartKit.create({
            data: {
                partGroupId: partGroups[2].id, // Suspension & Handling
                partKitId: partKits[3].id, // Suspension Package
                quantity: 1,
            },
        }),
    ])
    console.log(`Created ${partGroupPartKits.length} part group associations`)

    console.log("Seeding finished")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

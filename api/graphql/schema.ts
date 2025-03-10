import { builder } from "./builder"

// Add a health check query
builder.queryField("health", (t) =>
    t.string({
        resolve: () => "GraphQL API is healthy!",
    })
)

// Import all type definitions
import "./types/User"
import "./types/Manufacturer"

// Build and export the schema
export const schema = builder.toSchema()

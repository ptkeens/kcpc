/// <reference path="./.sst/platform/config.d.ts" />

// Import all infrastructure modules
import { createNetworkResources } from "./infra/network"
import { createStorageResources } from "./infra/storage"
import { createDatabaseResources } from "./infra/database"
import { createSecretResources } from "./infra/secrets"
import { createApiResources } from "./infra/api"
import { createWebResources } from "./infra/web"

export default $config({
    app(input) {
        return {
            name: "kcpc",
            removal: input?.stage === "production" ? "retain" : "remove",
            protect: ["production"].includes(input?.stage),
            home: "aws",
        }
    },
    async run() {
        // Create network resources
        const { vpc } = createNetworkResources()

        // Create storage resources
        const { imageBucket } = createStorageResources()

        // Create database resources
        const { db } = createDatabaseResources(vpc)

        // Create secret resources
        const { secrets, allSecrets } = createSecretResources()

        // Check for required environment variables
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not set")
        }

        // Create API resources
        const { graphqlFunction } = createApiResources(
            vpc,
            db,
            secrets,
            allSecrets
        )

        // Create web resources
        const { remix } = createWebResources(
            vpc,
            db,
            imageBucket,
            graphqlFunction
        )

        return {
            bucket: imageBucket.name,
            host: db.host,
            port: db.port,
            username: db.username,
            password: db.password,
            database: db.database,
            url: remix.url,
            apiUrl: graphqlFunction.url,
        }
    },
})

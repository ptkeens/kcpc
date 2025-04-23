/// <reference path="../.sst/platform/config.d.ts" />

export function createApiResources(vpc, db, secrets, allSecrets) {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not set")
    }

    const graphqlFunction = new sst.aws.Function("kcpc-graphql", {
        handler: "api/graphql/api.handler",
        link: [db, ...allSecrets],
        vpc,
        environment: {
            DATABASE_URL: process.env.DATABASE_URL,
            JWT_SECRET: secrets.JwtSecret.value,
            JWT_REFRESH_SECRET: secrets.JwtRefreshSecret.value,
        },
        url: {
            cors: true,
            authorization: "none",
        },
        timeout: "30 seconds",
        memory: "1024 MB",
    })

    return { graphqlFunction }
}

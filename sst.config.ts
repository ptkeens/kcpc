/// <reference path="./.sst/platform/config.d.ts" />

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
        const vpc = new sst.aws.Vpc("kcpc-vpc", {
            bastion: true,
            nat: "managed",
        })

        // image bucket for part images
        const imageBucket = new sst.aws.Bucket("kcpc-image-store")

        // database
        const db = new sst.aws.Aurora("kcpc-db", {
            engine: "postgres",
            vpc,
            proxy: true,
        })

        // GraphQL API function with explicitly configured URL
        const graphqlFunction = new sst.aws.Function("kcpc-graphql", {
            handler: "api/graphql/api.handler",
            link: [db],
            vpc,
            environment: {
                DATABASE_URL: $interpolate`postgresql://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}`,
            },
            url: {
                cors: true,
                authorization: "none",
            },
            timeout: "30 seconds",
            memory: "1024 MB",
        })

        // main remix app
        const remix = new sst.aws.Remix("kcpc-web", {
            link: [imageBucket, db, graphqlFunction],
            domain: "kcpc.lucidine.com",
            vpc,
        })

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

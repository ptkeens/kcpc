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
        })

        // image bucket for part images
        const imageBucket = new sst.aws.Bucket("kcpc-image-store")

        // database
        const db = new sst.aws.Aurora("kcpc-db", {
            engine: "postgres",
            vpc,
        })

        // main remix app
        const remix = new sst.aws.Remix("kcpc-web", {
            link: [imageBucket, db],
            domain: "kcpc.lucidine.com",
        })

        return {
            bucket: imageBucket.name,
            host: db.host,
            port: db.port,
            username: db.username,
            password: db.password,
            database: db.database,
            url: remix.url,
        }
    },
})

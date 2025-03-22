/// <reference path="../.sst/platform/config.d.ts" />

export function createDatabaseResources(vpc) {
    const db = new sst.aws.Aurora("kcpc-db", {
        engine: "postgres",
        vpc,
        proxy: true,
    })

    return { db }
}

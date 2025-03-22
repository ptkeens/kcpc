/// <reference path="../.sst/platform/config.d.ts" />

export function createWebResources(vpc, db, imageBucket, graphqlFunction) {
    const remix = new sst.aws.Remix("kcpc-web", {
        link: [imageBucket, db, graphqlFunction],
        domain: "kcpc.lucidine.com",
        vpc,
    })

    return { remix }
}

/// <reference path="../.sst/platform/config.d.ts" />

export function createNetworkResources() {
    const vpc = new sst.aws.Vpc("kcpc-vpc", {
        bastion: true,
        nat: "managed",
    })

    return { vpc }
}

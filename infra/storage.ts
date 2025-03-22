/// <reference path="../.sst/platform/config.d.ts" />

export function createStorageResources() {
    const imageBucket = new sst.aws.Bucket("kcpc-image-store")

    return { imageBucket }
}

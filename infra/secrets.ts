/// <reference path="../.sst/platform/config.d.ts" />

export function createSecretResources() {
    const secrets = {
        JwtSecret: new sst.Secret("JwtSecret", "CHANGEME"),
        JwtRefreshSecret: new sst.Secret("JwtRefreshSecret", "CHANGEME"),
        SessionExpirationTime: new sst.Secret(
            "SessionExpirationTime",
            "CHANGEME"
        ),
    }

    const allSecrets = Object.values(secrets)

    return { secrets, allSecrets }
}

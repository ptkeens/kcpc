/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */

declare module "sst" {
  export interface Resource {
    "JwtRefreshSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "JwtSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "SessionExpirationTime": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "kcpc-db": {
      "clusterArn": string
      "database": string
      "host": string
      "password": string
      "port": number
      "secretArn": string
      "type": "sst.aws.Aurora"
      "username": string
    }
    "kcpc-graphql": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "kcpc-image-store": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "kcpc-vpc": {
      "bastion": string
      "type": "sst.aws.Vpc"
    }
    "kcpc-web": {
      "type": "sst.aws.Remix"
    }
  }
}
/// <reference path="sst-env.d.ts" />

import "sst"
export {}
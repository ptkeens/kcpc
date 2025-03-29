import { builder } from "../../builder"

export class GQLError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "GQLError"
    }
}

export class AuthenticationError extends GQLError {
    constructor(message: string) {
        super(message)
        this.name = "AuthenticationError"
    }
}

export class TokenExpiredError extends GQLError {
    constructor(message: string) {
        super(message)
        this.name = "TokenExpiredError"
    }
}

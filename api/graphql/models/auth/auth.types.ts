export type LoginInput = {
    email: string
    password: string
}

export type AuthPayload = {
    token: string
    refreshToken: string
    user: {
        id: string
        name: string
        email: string
        username: string
        isEnabled: boolean
    }
}

import { builder, Context } from "../../builder"
import { prisma } from "../../builder"
import { TokenExpiredError } from "jsonwebtoken"
import { AuthPayload, LoginInput } from "./auth.types"
import { AuthenticationError, GQLError } from "./errors"
import { authService } from "../../../services/auth/auth.service"

// Define Auth input type
const loginInput = builder.inputType("LoginInput", {
    fields: (t) => ({
        email: t.string({ required: true }),
        password: t.string({ required: true }),
    }),
})

// Define Auth response with token and user
export const AuthPayloadRef = builder.objectRef<AuthPayload>("AuthPayload")
builder.objectType(AuthPayloadRef, {
    description: "Response payload for authentication operations",
    fields: (t) => ({
        token: t.exposeString("token"),
        refreshToken: t.exposeString("refreshToken"),
        user: t.prismaField({
            type: "User",
            nullable: true,
            resolve: (query, parent) => {
                return prisma.user.findUnique({
                    ...query,
                    where: { id: parent.user.id },
                })
            },
        }),
    }),
})

// Add auth mutations
builder.mutationFields((t) => ({
    login: t.field({
        type: AuthPayloadRef,
        description: "Log in with email and password",
        nullable: false,
        args: {
            input: t.arg({
                type: loginInput,
                required: true,
            }),
        },
        errors: {
            types: [AuthenticationError, TokenExpiredError],
        },
        resolve: async (_root, args, _ctx) => {
            const input = args.input as LoginInput

            const { token, refreshToken, user } = await authService.login(
                input.email,
                input.password
            )

            return {
                token,
                refreshToken,
                user,
            }
        },
    }),
    refreshToken: t.field({
        type: AuthPayloadRef,
        description: "Refresh an expired token",
        nullable: false,
        args: {
            refreshToken: t.arg.string({ required: true }),
        },
        resolve: async (_root, args, _ctx) => {
            const { tokens, user } = await authService.refreshUserToken(
                args.refreshToken
            )

            return {
                token: tokens.token,
                refreshToken: tokens.refreshToken,
                user,
            }
        },
    }),
}))

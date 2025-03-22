import { builder } from "../../builder"
import { prisma } from "../../builder"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { AuthPayload, LoginInput } from "./auth.types"
import { Resource } from "sst"

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
        resolve: async (_root, args, _ctx) => {
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not set")
            }

            if (!process.env.JWT_REFRESH_SECRET) {
                throw new Error("JWT_REFRESH_SECRET is not set")
            }

            const input = args.input as LoginInput

            const user = await prisma.user.findUnique({
                where: { email: input.email },
            })

            if (!user || !user.isEnabled) {
                throw new Error("Invalid credentials")
            }

            // In production, use bcrypt.compare()
            const passwordValid = await bcrypt.compare(
                input.password,
                user.password
            )
            if (!passwordValid) {
                throw new Error("Invalid credentials")
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            )

            // Generate refresh token
            const refreshToken = jwt.sign(
                { userId: user.id, version: "1.0" },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: "7d" }
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
            if (!process.env.JWT_REFRESH_SECRET) {
                throw new Error("JWT_REFRESH_SECRET is not set")
            }

            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not set")
            }

            try {
                // Verify refresh token
                const decoded = jwt.verify(
                    args.refreshToken,
                    process.env.JWT_REFRESH_SECRET
                ) as { userId: string }

                const user = await prisma.user.findUnique({
                    where: { id: decoded.userId },
                })

                if (!user || !user.isEnabled) {
                    throw new Error("User not found or disabled")
                }

                // Generate new tokens
                const newToken = jwt.sign(
                    { userId: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: "2h" }
                )

                const newRefreshToken = jwt.sign(
                    { userId: user.id, version: "1.0" },
                    process.env.JWT_REFRESH_SECRET,
                    { expiresIn: "7d" }
                )

                return {
                    token: newToken,
                    refreshToken: newRefreshToken,
                    user,
                }
            } catch (error) {
                throw new Error("Invalid refresh token")
            }
        },
    }),
}))

import { AuthenticationError } from "../../graphql/models/auth/errors"
import { prisma } from "../../graphql/builder"
import jwt, { TokenExpiredError } from "jsonwebtoken"
import bcrypt from "bcryptjs"

// Helper functions for token generation
const generateAuthToken = (userId: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not set")
    }

    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" })
}

const generateRefreshToken = (userId: string): string => {
    if (!process.env.JWT_REFRESH_SECRET) {
        throw new Error("JWT_REFRESH_SECRET is not set")
    }

    return jwt.sign(
        { userId, version: "1.0" },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "30d" }
    )
}

const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email },
    })
}

const validatePassword = async (
    user: { password: string },
    password: string
) => {
    return bcrypt.compare(password, user.password)
}

// Core business functions independent of GraphQL
export const authService = {
    async login(email: string, password: string) {
        const user = await findUserByEmail(email)
        if (!user || !user.isEnabled) {
            throw new AuthenticationError("Invalid credentials")
        }

        const passwordValid = await validatePassword(user, password)
        if (!passwordValid) {
            throw new AuthenticationError("Invalid credentials")
        }

        const tokens = this.generateAuthTokens(user.id)

        // Return only necessary user fields
        const {
            password: _password,
            createdAt: _createdAt,
            updatedAt: _updatedAt,
            ...safeUser
        } = user

        return {
            ...tokens,
            user: safeUser,
        }
    },

    async refreshUserToken(refreshToken: string) {
        if (!process.env.JWT_REFRESH_SECRET) {
            throw new Error("JWT_REFRESH_SECRET is not set")
        }

        try {
            // Verify refresh token
            const decoded = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET
            ) as { userId: string }

            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
            })

            if (!user || !user.isEnabled) {
                throw new AuthenticationError("User not found or disabled")
            }

            // Return only necessary user fields
            const {
                password: _password,
                createdAt: _createdAt,
                updatedAt: _updatedAt,
                ...safeUser
            } = user

            return {
                tokens: this.generateAuthTokens(user.id),
                user: safeUser,
            }
        } catch (error) {
            // Handle specific errors from jwt.verify
            if (error instanceof TokenExpiredError) {
                throw new AuthenticationError("Refresh token expired")
            }
            // Log unknown errors for debugging? Re-throw generic for now.
            console.error("Refresh token verification failed:", error)
            throw new AuthenticationError("Invalid refresh token")
        }
    },

    // Helper functions
    generateAuthTokens(userId: string) {
        return {
            token: generateAuthToken(userId),
            refreshToken: generateRefreshToken(userId),
        }
    },
}

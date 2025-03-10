import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

// Define user type
interface User {
    email: string
    name: string
}

// Define auth context value type
interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    login: async () => {},
    logout: () => {},
})

// Auth provider props
interface AuthProviderProps {
    children: ReactNode
}

// Provider component that wraps your app and makes auth available
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    // Check if there's a saved session on component mount
    // This would typically check local storage or cookies

    // Login function
    const login = async (email: string, password: string) => {
        // This is where you would call your authentication API
        // For now, we'll just simulate a successful login

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Set user
        setUser({
            email,
            name: email.split("@")[0], // Just use the part before @ as name
        })
    }

    // Logout function
    const logout = () => {
        setUser(null)
        // Here you would also clear any tokens from storage
    }

    // Value provided to consuming components
    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook for components to get the auth context
export function useAuth() {
    return useContext(AuthContext)
}

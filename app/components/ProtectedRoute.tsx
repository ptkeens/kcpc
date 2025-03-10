import { Navigate, useLocation } from "react-router"
import { useAuth } from "./AuthContext"
import type { ReactNode } from "react"

interface ProtectedRouteProps {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    if (!isAuthenticated) {
        // Redirect to login and save the location they tried to visit
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <>{children}</>
}

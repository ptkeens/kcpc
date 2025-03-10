import { useEffect, useState, type ReactNode } from "react"

interface ClientOnlyProps {
    children: ReactNode
    fallback?: ReactNode
}

/**
 * A component that only renders its children on the client side.
 * Useful for components that use browser APIs.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return isClient ? <>{children}</> : <>{fallback}</>
}

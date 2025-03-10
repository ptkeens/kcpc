import { Link, Outlet, useNavigate, useLocation } from "react-router"
import { useEffect } from "react"
import { useAuth } from "../components/AuthContext"
import { ThemeToggle } from "~/components/themeToggle"
import { ClientOnly } from "~/components/clientOnly"

export function meta() {
    return [
        { title: "Kit Car Part Catalog" },
        {
            name: "description",
            content:
                "The kit car part catalog helps you organize and verify the parts you have for your favorite kit car!",
        },
    ]
}

export default function Layout() {
    const { isAuthenticated, user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logout()
        navigate("/", { replace: true })
    }

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar / Navigation */}
            <aside className="bg-card text-card-foreground w-64 flex flex-col border-r">
                <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Kit Car Parts</h1>
                        <ClientOnly>
                            <ThemeToggle />
                        </ClientOnly>
                    </div>
                    {user && (
                        <p className="text-sm mt-1 text-muted-foreground">
                            Welcome, {user.name}
                        </p>
                    )}
                </div>

                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/"
                                className="block py-2 px-4 rounded hover:bg-muted"
                            >
                                Home
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="block py-2 px-4 rounded hover:bg-muted"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                {/* Add additional authenticated navigation items here */}
                            </>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    className="block py-2 px-4 rounded hover:bg-muted"
                                >
                                    Login / Sign Up
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                <div className="p-4 border-t">
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="w-full text-left py-2 px-4 rounded hover:bg-muted"
                        >
                            Logout
                        </button>
                    ) : (
                        <p className="text-sm text-muted-foreground px-4">
                            Login to save your data
                        </p>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="container mx-auto p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

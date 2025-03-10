import { Outlet } from "react-router"

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            {/* Left Menu Bar */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <nav>
                    {/* Add your menu items here */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Menu</h2>
                        {/* Add menu items here */}
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto p-8">{children}</main>
        </div>
    )
}

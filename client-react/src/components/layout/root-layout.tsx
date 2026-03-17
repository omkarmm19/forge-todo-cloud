import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/layout/navbar"

export function RootLayout() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}

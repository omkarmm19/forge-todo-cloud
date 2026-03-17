import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 text-center">
            <div className="space-y-6 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Engineered for productivity
                </h1>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                    Experience the difference of a meticulously crafted task manager: secure, swift, and stripped to the essential.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link to="/login">
                        <Button size="lg" className="w-full sm:w-auto font-semibold">
                            Sign In
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold">
                            Create Account
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="mt-16 sm:mt-24 max-w-3xl mx-auto w-full text-left">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6 sm:p-8">
                    <h2 className="text-xl font-semibold mb-4">Why this?</h2>
                    <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                        <li>"Uncomplicated Productivity" is a strong promise that resonates with users tired of bloated software.</li>
                        <li>An end-to-end secured task manager that works seamlessly online</li>
                        <li>Optimistic UI, undo delete, and offline resilience</li>
                        <li>Dark mode and subtle motion interactions</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

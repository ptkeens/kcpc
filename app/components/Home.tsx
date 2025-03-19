import { useAuth } from "./AuthContext"
import { Button } from "~/components/ui/button"
import { Link } from "react-router"
import { ArrowRight } from "lucide-react"
import { paths } from "~/lib/paths"

export const HomeComponent = () => {
    const { isAuthenticated, user } = useAuth()

    return (
        <div className="container mx-auto max-w-4xl">
            <div className="py-10 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to the Kit Car Part Catalog
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Your complete solution for organizing and tracking kit car
                    parts in one place.
                </p>

                {isAuthenticated ? (
                    <div className="space-y-8">
                        <div className="bg-card p-6 rounded-lg border shadow-sm">
                            <h2 className="text-2xl font-bold mb-2">
                                Welcome back, {user?.name}!
                            </h2>
                            <p className="mb-4">
                                Continue managing your kit car parts.
                            </p>
                            <Button asChild size="lg">
                                <Link to="/dashboard">
                                    Go to Dashboard{" "}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="bg-card p-6 rounded-lg border shadow-sm">
                            <h2 className="text-2xl font-bold mb-2">
                                Get Started
                            </h2>
                            <p className="mb-4">
                                Create an account to start tracking your kit car
                                parts.
                            </p>
                            <Button asChild size="lg">
                                <Link to={paths.auth.login()}>
                                    Sign Up or Login{" "}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-card p-6 rounded-lg border shadow-sm">
                                <h3 className="text-xl font-bold mb-2">
                                    Organize
                                </h3>
                                <p>
                                    Keep all your kit car parts organized in one
                                    centralized catalog.
                                </p>
                            </div>
                            <div className="bg-card p-6 rounded-lg border shadow-sm">
                                <h3 className="text-xl font-bold mb-2">
                                    Track
                                </h3>
                                <p>
                                    Track progress, inventory, and status of
                                    each part in your build.
                                </p>
                            </div>
                            <div className="bg-card p-6 rounded-lg border shadow-sm">
                                <h3 className="text-xl font-bold mb-2">
                                    Share
                                </h3>
                                <p>
                                    Share your builds with friends or the kit
                                    car community.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

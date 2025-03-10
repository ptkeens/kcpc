import { useState } from "react"
import type { FormEvent } from "react"
import { Form, useNavigate, useLocation } from "react-router"
import { useAuth } from "../components/AuthContext"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Checkbox } from "~/components/ui/checkbox"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "~/components/ui/card"
import { useTheme } from "~/components/themeProvider"
import { ClientOnly } from "~/components/clientOnly"
import { ThemeToggle } from "~/components/themeToggle"

export function meta() {
    return [
        { title: "Login | Kit Car Part Catalog" },
        {
            name: "description",
            content: "Login to access your kit car parts catalog",
        },
    ]
}

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    // Get the redirect path from the location state or default to home
    const from = location.state?.from?.pathname || "/"

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!email || !password) {
            setError("Please enter both email and password")
            return
        }

        try {
            setIsLoading(true)
            setError("")

            // Call the login function from our auth context
            await login(email, password)

            // If successful, redirect to the requested page
            navigate(from, { replace: true })
        } catch (err) {
            setError(
                "Login failed. Please check your credentials and try again."
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <div className="absolute top-4 right-4">
                <ClientOnly>
                    <ThemeToggle />
                </ClientOnly>
            </div>

            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">
                        Kit Car Parts
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Sign in to save your catalog data
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {error && (
                        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded">
                            {error}
                        </div>
                    )}

                    <Form
                        method="post"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium"
                            >
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember-me" name="remember-me" />
                                <label
                                    htmlFor="remember-me"
                                    className="text-sm"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="text-primary hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </Form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                        Don't have an account?{" "}
                        <a href="#" className="text-primary hover:underline">
                            Create one
                        </a>
                    </p>
                    <div className="w-full border-t pt-4">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => navigate("/")}
                        >
                            Continue Browsing Without Account
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

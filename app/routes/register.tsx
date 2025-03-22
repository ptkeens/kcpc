import { useState } from "react"
import type { FormEvent } from "react"
import { Form, useNavigate } from "react-router"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
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
import { paths } from "~/lib/paths"

export function meta() {
    return [
        { title: "Register | Kit Car Part Catalog" },
        {
            name: "description",
            content: "Create a new account for the kit car parts catalog",
        },
    ]
}

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            setIsLoading(true)
            setError("")

            // This is where we would call the registration API
            // For now, we just simulate a successful registration with a delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Redirect to login page after successful registration
            navigate(paths.auth.login())
        } catch (err) {
            setError("Registration failed. Please try again.")
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
                        Create Account
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Register to start managing your kit car parts
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
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Full Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

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

                        <div className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="text-sm font-medium"
                            >
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-6"
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </Button>
                    </Form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                        Already have an account?{" "}
                        <a
                            href={paths.auth.login()}
                            className="text-primary hover:underline"
                        >
                            Sign in
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

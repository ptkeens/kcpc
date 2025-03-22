import {
    type RouteConfig,
    index,
    route,
    layout,
} from "@react-router/dev/routes"

export default [
    layout("routes/layout.tsx", [
        index("routes/home.tsx"),
        route("dashboard", "routes/dashboard.tsx"),
        // Add more authenticated routes here
    ]),
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
] satisfies RouteConfig

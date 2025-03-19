import { createYoga } from "graphql-yoga"
import { schema } from "./schema"
import { prisma } from "./builder"

// Define CORS headers for all responses
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400", // 24 hours
}

// Create the GraphQL Yoga instance with more specific configuration
const yoga = createYoga({
    schema,
    // Use graphiql in development for easier testing
    graphiql: true,
    // Add a specific path for the GraphQL endpoint
    graphqlEndpoint: "/",
    // Disable batching to simplify debugging
    batching: false,
    context: async ({ request }) => {
        // You can extend this to include authentication and other context
        return {
            prisma,
        }
    },
    // Add logging for incoming requests
    logging: {
        debug: (...args) => console.log(...args),
        info: (...args) => console.log(...args),
        warn: (...args) => console.warn(...args),
        error: (...args) => console.error(...args),
    },
})

// Export the handler function directly - no ApiHandler wrapper needed in SST v3
export const handler = async (event) => {
    // Handle OPTIONS method for CORS preflight requests
    if (event.requestContext?.http?.method === "OPTIONS") {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: "",
        }
    }

    // Handle a root path health check
    if (event.rawPath === "/" && event.requestContext?.http?.method === "GET") {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders,
            },
            body: JSON.stringify({
                status: "ok",
                message: "GraphQL API is running",
            }),
        }
    }

    // Handle potential errors
    try {
        // Process the body - API Gateway can send base64 encoded bodies
        const body = (() => {
            if (!event.body) return null
            if (event.isBase64Encoded) {
                return Buffer.from(event.body, "base64").toString("utf8")
            }
            return event.body
        })()

        // Create proper headers - ensure content-type is set
        const headers = {
            ...event.headers,
            // Ensure content-type header is set, if not already present
            "content-type":
                event.headers?.["content-type"] || "application/json",
        }

        // Use GraphQL Yoga with the API Gateway event - constructing the URL carefully
        const url = new URL(
            event.rawPath +
                (event.rawQueryString ? `?${event.rawQueryString}` : ""),
            "http://localhost" // dummy base URL, will be ignored
        )

        const response = await yoga.fetch(url, {
            method: event.requestContext?.http?.method || "POST",
            headers: headers,
            body: body,
        })

        // Get the response body for logging
        const responseBody = await response.text()

        // Return the response
        return {
            statusCode: response.status,
            headers: {
                ...Object.fromEntries(response.headers.entries()),
                ...corsHeaders,
            },
            body: responseBody,
        }
    } catch (error) {
        // Detailed error logging
        console.error("GraphQL API error:", error)

        // Return a properly formatted error response
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders,
            },
            body: JSON.stringify({
                errors: [
                    {
                        message: "Internal server error",
                        error: String(error),
                        stack: error.stack,
                    },
                ],
            }),
        }
    }
}

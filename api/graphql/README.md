# KCPC GraphQL API

This directory contains a GraphQL API built with Pothos and Prisma for the KCPC application.

## Architecture

-   **Pothos**: A code-first GraphQL schema builder with strong TypeScript support
-   **Prisma Plugin**: Integrates with Prisma ORM to provide efficient database access and type safety
-   **GraphQL Yoga**: A modern, lightweight GraphQL server

## Key Features

-   **Automatic Type Generation**: Types are generated from the Prisma schema
-   **Type-Safe Resolvers**: Full type safety when building resolvers
-   **Efficient Database Queries**: The Prisma plugin optimizes database queries to prevent N+1 issues
-   **Serverless Deployment**: Runs in an AWS Lambda function via SST

## Usage

The API is accessible at the `/graphql` endpoint and supports standard GraphQL operations.

Example query:

```graphql
query {
    users {
        id
        name
        email
        manufacturers {
            id
            name
        }
    }
}
```

## Development

To modify the API:

1. Update Prisma models in `prisma/schema.prisma`
2. Run `bunx prisma generate` to update types
3. Add or modify type definitions in `api/graphql/types/`
4. Update the schema in `api/graphql/schema.ts`

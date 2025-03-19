# Database Seeding

This directory contains the Prisma schema and database seeding scripts.

## Running Seeds

You can seed the database with initial data using the following command:

```bash
# Using npm
npm run db:seed

# Using bun
bun run db:seed

# Using the Prisma CLI directly
npx prisma db seed
```

The seed script (`seed.ts`) will populate the database with sample data including:

-   A test user
-   Factory Five Racing manufacturer
-   Cobra Roadster kit family
-   Mark IV kit with specifications from the Factory Five website
-   Key parts from the kit (Frame, Body Panels, etc.)
-   Part groups for organizing components by category
-   Associations between parts, kits, and groups

This seed data is based on the real Factory Five Cobra Mark IV specifications as shown on their website.

## After Running Database Migrations

When you run database migrations with Prisma, the seeding script will be automatically executed if you use:

```bash
npx prisma migrate dev
```

If you want to run migrations without seeding, use:

```bash
npx prisma migrate dev --skip-seed
```

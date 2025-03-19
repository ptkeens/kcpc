# Database Migrations

This document describes how to manage database migrations in the project using Prisma.

## Available Commands

### Run Existing Migrations

To apply all existing migrations to your database:

```bash
# Using npm
npm run db:migrate

# Using bun
bun run db:migrate
```

This will deploy all pending migrations to your database without running the seed script. This is useful for production environments.

### Create a New Migration

To create a new migration for database schema changes:

1. First, modify your Prisma schema file (`schema.prisma`) with your changes
2. Then run:

```bash
# Using npm
npm run db:migrate:new your-migration-name

# Using bun
bun run db:migrate:new your-migration-name
```

This will create a new migration file based on the difference between your current schema and database, without applying it. Replace `your-migration-name` with a descriptive name for your migration (use kebab-case).

### Apply Migrations with Development Options

For development, you may want to use Prisma's full development migration command:

```bash
npx prisma migrate dev
```

This will create a migration (if there are changes), apply it, and run the seed script.

### Reset Database

If you need to reset your database (⚠️ CAUTION: destroys all data):

```bash
npx prisma migrate reset
```

This will drop the database, recreate it, run all migrations, and seed the database.

## Migration Best Practices

1. Create atomic migrations (one change per migration)
2. Use descriptive names for your migrations
3. Review migration files before applying them
4. Test migrations on development databases before production
5. Always back up production data before running migrations

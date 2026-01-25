# ![RealWorld Example App](assets/logo.png)

> ### ElysiaJS + Prisma ORM codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://demo.realworld.show)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

[![Tests Status](https://github.com/bedstack/elysia-prisma-realworld-example/actions/workflows/tests.yml/badge.svg?event=push&branch=main&)](https://github.com/bedstack/elysia-prisma-realworld-example/actions/workflows/tests.yml?query=branch%3Amain+event%3Apush) [![License](https://custom-icon-badges.demolab.com/github/license/bedstack/elysia-prisma-realworld-example?label=License&color=blue&logo=law&labelColor=0d1117)](https://github.com/bedstack/elysia-prisma-realworld-example/blob/main/LICENSE) [![ElysiaJS](https://custom-icon-badges.demolab.com/badge/ElysiaJS-0f172b.svg?logo=elysia)](https://elysiajs.com/) [![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/) [![ArkType](https://custom-icon-badges.demolab.com/badge/ArkType-0d1526?logo=arktype2&logoColor=e9eef9)](https://arktype.io/) [![Scalar](https://img.shields.io/badge/Scalar-080808?logo=scalar&logoColor=e7e7e7)](https://scalar.com/) [![Bun](https://img.shields.io/badge/Bun-14151a?logo=bun&logoColor=fbf0df)](https://bun.com/) [![Biome](https://img.shields.io/badge/Biome-24272f?logo=biome&logoColor=f6f6f9)](https://biomejs.dev/) [![Star](https://custom-icon-badges.demolab.com/github/stars/bedstack/elysia-prisma-realworld-example?logo=star&logoColor=373737&label=Star)](https://github.com/bedstack/elysia-prisma-realworld-example/stargazers/)

This codebase was created to demonstrate a fully fledged backend application built with **[ElysiaJS](https://elysiajs.com/)** and **[Prisma ORM](https://www.prisma.io/)** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **ElysiaJS** and **Prisma ORM** community styleguides & best practices.

For more information on how this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# How it works

## Architecture

This project follows the [Bedstack](https://bedstack.js.org/) architecture - a modular, layered approach to building TypeScript backends:

- **Modular structure** - Each domain (users, articles, comments, etc.) is a self-contained module with its own plugin, model, and DTOs
- **Layered design** - Clear separation between Controller (HTTP handling) → Service (business logic) → Repository (data access)
- **Type-safe data flow** - DTOs define request/response shapes, mappers transform between layers, schemas define database tables

```
src/
├── users/          # User module
│   ├── users.plugin.ts
│   ├── users.model.ts
│   ├── interfaces/
│   └── mappers/
├── articles/       # Article module (same structure)
├── shared/         # Shared utilities and error handling
└── core/           # Core app setup, db, env
```

[Read more about the Bedstack architecture →](https://bedstack.js.org/)

## Technologies

- **[ElysiaJS](https://elysiajs.com/)** - Web framework for HTTP
- **[Prisma ORM](https://www.prisma.io/)** - TypeScript ORM for PostgreSQL
- **[ArkType](https://arktype.io/)** - Runtime validation
- **[Scalar](https://scalar.com/)** - API documentation
- **[Bun](https://bun.sh/)** - JavaScript runtime and package manager
- **[Biome](https://biomejs.dev/)** - Linting and formatting

# Getting started

1. **Install dependencies**

    ```sh
    bun i
    ```

2. **Create a `.env` file**

   ```sh
   cp .env.example .env
   ```

   Use the provided example values or replace them with your own.

3. **Ensure Docker daemon is running and start the database service**

   ```sh
   bun db:start
   ```

4. **Push the schema to the database**

   ```sh
   bun db:push
   ```

5. **Run the development server**

   ```sh
   bun dev
   ```

6. **Run the API tests**

   ```sh
   bun run test # not `bun test`!
   ```

7. **(Optional) Start the [database studio](https://www.prisma.io/studio)**
   ```bash
   bun db:studio
   ```

# Deploy to production

> [!TIP]
> See more info in ElysiaJS's [Deploy to production](https://elysiajs.com/patterns/deploy) pattern.

1. **Build the app**

   ```sh
   bun run build # not `bun build`!
   ```

2. **Run the server**

   ```sh
   bun preview
   ```

# Need help?

If you have questions or ideas:
- Open a [GitHub Discussion](https://github.com/bedstack/elysia-prisma-realworld-example/discussions)
- Open an [Issue](https://github.com/bedstack/elysia-prisma-realworld-example/issues) if you believe you found a bug

# Contributors

You are welcome to [contribute to the project](https://github.com/bedstack/elysia-prisma-realworld-example/blob/main/CONTRIBUTING.md)!

# ts-node-prisma-jwt-api

This is a RESTful API project built with TypeScript, Express, Prisma, and JWT for authentication. It uses PostgreSQL as the database and Supabase for database management and hosting.

## Description

This project provides a basic API for user management, including authentication and authorization via JWT. It supports creating, updating, deleting, and querying users, and manages authentication and authorization for protected routes.

## Project Structure

The project has the following structure:

-   `src/`
    -   `controllers/`
        -   `authController.ts` - Handles user authentication logic
        -   `userController.ts` - Handles user management logic
    -   `models/`
        -   `jwt.interface.ts` - Interfaces for JWT payload
        -   `user.interface.ts` - Interfaces for user model
        -   `user.ts` - Prisma model for users
    -   `routes/`
        -   `authRoutes.ts` - Routes for authentication
        -   `userRoutes.ts` - Routes for user management
    -   `schemas/`
        -   `auth.schema.ts` - Validation schemas for authentication
        -   `user.schema.ts` - Validation schemas for user management
    -   `services/`
        -   `auth.service.ts` - Services for authentication and JWT generation
        -   `password.service.ts` - Services for password handling
    -   `app.ts` - Main application configuration
    -   `prisma.d.ts` - Prisma definitions
    -   `server.ts` - Server setup and application startup

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/ts-node-prisma-jwt-api.git
    cd ts-node-prisma-jwt-api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    ```env
    DATABASE_URL=postgresql://user:password@host:port/database
    JWT_SECRET=
    PORT=
    ```

## Usage

To start the development server, use:

```bash
npm run dev
```

To build the project, use:

```bash
npm run build
```

To start the server, use:

```bash
npm run start
```

## API Routes

### Authentication

#### POST /api/v1/auth/register

-   Register a new user.

#### POST /api/v1/auth/login

-   Log in and obtain a JWT token.

### Users

#### GET /api/v1/users

-   Return all users. (Protected by authentication)

#### GET /api/v1/users/:id

-   Return a user by their ID. (Protected by authentication)

#### PUT /api/v1/users/:id

-   Update a user by their ID. (Protected by authentication)

#### DELETE /api/v1/users/:id

-   Delete a user by their ID. (Protected by authentication)

# ts-node-prisma-jwt-api

This is a RESTful API project developed using TypeScript, Express, Prisma, and JWT for authentication. It utilizes PostgreSQL for the database, managed by Supabase, and is hosted on Render.

## Live Demo

You can access the live API at [https://ts-node-prisma-jwt-api.onrender.com](https://ts-node-prisma-jwt-api.onrender.com).

## Description

This project provides a basic API for user management, including authentication and authorization via JWT. It supports creating, updating, deleting, and querying users, and manages authentication and authorization for protected routes.

## Project Structure

The project has the following structure:

-   `src/`
    -   `controllers/`
        -   `authController.ts`
        -   `userController.ts`
    -   `models/`
        -   `jwt.interface.ts`
        -   `user.interface.ts`
        -   `user.ts`
    -   `routes/`
        -   `authRoutes.ts`
        -   `userRoutes.ts`
    -   `schemas/`
        -   `auth.schema.ts`
        -   `user.schema.ts`
    -   `services/`
        -   `auth.service.ts`
        -   `password.service.ts`
    -   `app.ts`
    -   `prisma.d.ts`
    -   `server.ts`

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

    Create a `.env` file in the root directory and add the following configuration:

    ```env
    DATABASE_URL=postgresql://user:password@host:port/database
    JWT_SECRET=your_jwt_secret
    PORT=your_port
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

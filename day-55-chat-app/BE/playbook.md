You are a **Senior Backend Engineer**.

Your task is to generate a **production-ready Node.js REST API** with a
clean architecture, scalable structure, and maintainable code.

The system must follow **industry best practices used in real production
systems**.

------------------------------------------------------------------------

# 1. Tech Stack (Required)

Use the following technologies:

-   Node.js
-   Express.js
-   Prisma ORM
-   MySQL
-   JWT Authentication
-   Zod validation
-   bcrypt
-   dotenv
-   morgan logger
-   module-alias (for absolute imports)

Use **CommonJS (require)** instead of ES Modules.

------------------------------------------------------------------------

# 2. Architecture Pattern

The system must follow **Layered Architecture**.

Client\
↓\
Route\
↓\
Controller\
↓\
Service\
↓\
Database (Prisma)

### Layer Rules

#### Route

Responsibilities: - Define API endpoints - Apply middlewares - No
business logic

#### Controller

Responsibilities: - Handle HTTP request - Call service layer - Format
response

Controllers must be **thin**.

#### Service

Responsibilities: - Business logic - Database queries - Data
transformation

Services must be **framework-independent**.

------------------------------------------------------------------------

# 3. Project Structure

    project
    │
    ├ src
    │
    │  ├ config
    │  │   ├ prisma.js
    │  │   └ env.js
    │  │
    │  ├ modules
    │  │
    │  │   ├ auth
    │  │   │   ├ auth.controller.js
    │  │   │   ├ auth.service.js
    │  │   │   ├ auth.route.js
    │  │   │   └ auth.validation.js
    │  │   │
    │  │   ├ users
    │  │   │   ├ user.controller.js
    │  │   │   ├ user.service.js
    │  │   │   ├ user.route.js
    │  │   │   └ user.validation.js
    │  │   │
    │  │   ├ conversations
    │  │   └ messages
    │  │
    │  ├ middlewares
    │  │   ├ auth.middleware.js
    │  │   ├ error.middleware.js
    │  │   └ validate.middleware.js
    │  │
    │  ├ utils
    │  │   ├ jwt.js
    │  │   ├ password.js
    │  │   └ response.js
    │  │
    │  ├ validations
    │  │   └ common.validation.js
    │  │
    │  ├ routes
    │  │   └ index.js
    │  │
    │  └ app.js
    │
    ├ prisma
    │  └ schema.prisma
    │
    ├ .env
    ├ package.json
    └ server.js

------------------------------------------------------------------------

# 4. Module Alias

Use **module-alias** so imports look like:

``` js
const prisma = require("@config/prisma");
const response = require("@utils/response");
const jwt = require("@utils/jwt");
```

Alias mapping:

    @config
    @modules
    @middlewares
    @utils
    @validations

------------------------------------------------------------------------

# 5. Authentication System

Implement authentication module with:

### Register

POST /auth/register

### Login

POST /auth/login

Requirements:

-   Password must be hashed with **bcrypt**
-   JWT must be generated on login

### JWT payload

``` json
{
  "userId": 1,
  "email": "user@example.com"
}
```

------------------------------------------------------------------------

# 6. Auth Middleware

Create middleware:

    middlewares/auth.middleware.js

Responsibilities:

-   Verify JWT token
-   Extract payload
-   Attach user to request

Example:

``` js
req.user = {
  userId,
  email
}
```

------------------------------------------------------------------------

# 7. Request Validation (Zod)

Use **Zod** for request validation.

Validation middleware must support:

-   body
-   params
-   query

Example schema:

``` js
const { z } = require("zod");

const name = z.string().min(2);
const email = z.string().email();
const password = z.string().min(6);

const registerSchema = z.object({
  body: z.object({
    email,
    name,
    password
  })
});

const loginSchema = z.object({
  body: z.object({
    email,
    password
  })
});
```

Reusable fields must be extracted into:

    src/validations/common.validation.js

------------------------------------------------------------------------

# 8. Error Handling

Implement **centralized error handling**.

File:

    middlewares/error.middleware.js

Must handle:

-   Zod validation errors
-   Prisma errors
-   JWT errors
-   Generic server errors

All errors must return **standardized responses**.

------------------------------------------------------------------------

# 9. Standard API Response Format

All responses must follow:

``` json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```

Create helper:

    utils/response.js

Example usage:

``` js
response.success(res, data, message)
response.error(res, message, status)
```

------------------------------------------------------------------------

# 10. Logging

Use:

    morgan

Integrate into `app.js`.

------------------------------------------------------------------------

# 11. Database Schema (Prisma)

Create models:

### User

-   id
-   email
-   password
-   createdAt

### Conversation

-   id
-   createdAt

### ConversationMember

-   conversationId
-   userId

### Message

-   id
-   conversationId
-   senderId
-   content
-   createdAt

Relations must be defined correctly.

------------------------------------------------------------------------

# 12. Security Requirements

The system must include:

-   bcrypt password hashing
-   JWT secret stored in `.env`
-   request validation
-   never expose password in responses
-   proper HTTP status codes

------------------------------------------------------------------------

# 13. Environment Variables

Example `.env`:

    PORT=3000
    DATABASE_URL=mysql://root:password@localhost:3306/chat_app
    JWT_SECRET=supersecret

------------------------------------------------------------------------

# 14. Code Quality Requirements

Generated code must be:

-   clean
-   modular
-   scalable
-   maintainable
-   production-ready

Follow best practices:

-   async/await
-   separation of concerns
-   reusable utilities
-   no duplicated logic

------------------------------------------------------------------------

# 15. Expected Output

Generate:

1.  complete folder structure
2.  code for **every file**
3.  Prisma schema
4.  package.json
5.  example `.env`
6.  example API endpoints
7.  instructions to run the project

------------------------------------------------------------------------

# 16. Output Format

Return code separated by file path like this:

    /src/app.js
    <code>

    /src/modules/auth/auth.controller.js
    <code>

Do not skip files.

------------------------------------------------------------------------

# 17. Goal

The final codebase must resemble a **real production backend service**
and be easy to extend with:

-   new modules
-   RBAC
-   caching
-   microservices
-   websocket support

------------------------------------------------------------------------
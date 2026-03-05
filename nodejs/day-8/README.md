# Todo App REST API with JWT Auth

A simple Todo application REST API built with Node.js, Express, and MySQL using MVC architecture and JWT Authentication.

## Features
- **MVC Architecture**: Models, Controllers, Services, and Routes.
- **JWT Auth**: Access tokens (1h) and Refresh tokens (7d).
- **Security**: Password hashing with `bcrypt`, access token blacklisting on logout.
- **Centralized Error Handling**: Custom `ApiError` class and middleware.

## Getting Started

### Prerequisites
- Node.js installed
- MySQL (via Docker or local installation)

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env`:
   ```text
   PORT=3000
   DB_HOST=localhost
   DB_USER=admin
   DB_PASSWORD=admin
   DB_NAME=day6
   JWT_SECRET=your_access_token_secret
   REFRESH_SECRET=your_refresh_token_secret
   ```
3. Initialize Database:
   Use `setup.sql` to create tables.

### Running the App
```bash
npm run dev
```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login and get tokens | No |
| POST | `/api/v1/auth/refresh-token` | Refresh access token | No |
| POST | `/api/v1/auth/logout` | Logout and blacklist token | Yes |

### Todos
| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| GET | `/api/v1/todos` | Get all todos | No |
| GET | `/api/v1/todos/:id` | Get todo detail | No |
| POST | `/api/v1/todos` | Create todo | Yes |
| PUT | `/api/v1/todos/:id` | Update todo | Yes |
| DELETE | `/api/v1/todos/:id` | Delete todo | Yes |

*Note: For protected endpoints, include `Authorization: Bearer <access_token>` in the header.*

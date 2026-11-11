# Eventy

A web app for a university: administrators publish events, students find them, register, and leave feedback after the event.

This is a migration of an earlier JEE/JSP application to **React + Node.js/Express + MySQL**, built feature by feature to learn the full stack.

## Features

- Browse events and open an event page
- Sign up and log in (passwords hashed, session kept in an HTTP-only cookie)
- Students register for an event with a motivation text
- Students comment and rate (1 to 5) an event after it has taken place
- Administrators add and delete events and see who registered

## Tech stack

| Part | Technology |
|---|---|
| Frontend | React, React Router (Vite) |
| Backend | Node.js, Express (REST API) |
| Database | MySQL (`mysql2`, plain SQL, prepared statements) |
| Auth | bcryptjs (password hashing), JWT in an HTTP-only cookie |

## How a request travels

```
React page → fetch → Express: cors → router → (requireAuth → requireAdmin) → controller → repository → MySQL
                                                                                       ↓
React state ← JSON response ←──────────────────────────────────────────────────────────┘
```

- **Routes** map a URL and a method to a controller.
- **Controllers** validate input and choose the HTTP status.
- **Repositories** are the only place with SQL.
- **Middleware** checks the login (`401`) and the admin role (`403`).

## API

| Method | URL | Access |
|---|---|---|
| POST | `/api/auth/register` | public |
| POST | `/api/auth/login` | public |
| POST | `/api/auth/logout` | public |
| GET | `/api/auth/me` | logged in |
| GET | `/api/events` | public |
| GET | `/api/events/:id` | public |
| POST | `/api/events` | admin |
| DELETE | `/api/events/:id` | admin |
| POST | `/api/events/:id/registrations` | logged in |
| GET | `/api/events/:id/registrations` | admin |
| GET | `/api/events/:id/comments` | public |
| POST | `/api/events/:id/comments` | logged in, after the event date |

## Run it locally

Requirements: Node.js 20 or newer, MySQL.

1. Create the database: run `database/schema.sql` in MySQL.
2. Backend:
   ```
   cd server
   cp .env.example .env     (on Windows: copy .env.example .env)
   ```
   Fill in `.env` (database user and password, and a long random `JWT_SECRET`), then:
   ```
   npm install
   npm run dev
   ```
   The API runs on http://localhost:3000.
3. Frontend, in another terminal:
   ```
   cd client
   npm install
   npm run dev
   ```
   The app runs on http://localhost:5173.
4. To create an administrator: register an account in the app, then set `role = 'admin'` for that user directly in the database. The app never lets a client choose its own role.

## Project structure

```
client/src/    components/  context/  pages/
server/        controllers/  middleware/  repositories/  routes/  db.js  index.js
database/      schema.sql
```

## Not done yet

- Event image upload
- Automated tests
- Deployment
# QuantumTech Services Full Stack Developer Task

This is a Next.js application with PostgreSQL integration for managing account holders.

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up PostgreSQL database and update the connection string in `.env`
4. Run database migrations: `npx prisma migrate dev --name init`
5. Start the development server: `npm run dev`

## API Endpoints

- `POST /api/accounts` - Create a new account
- `GET /api/accounts` - List all accounts
- `PUT /api/accounts/[id]` - Update an account
- `DELETE /api/accounts/[id]` - Delete an account

## Features

- Account creation, updating, and deletion
- Form validation
- Responsive design
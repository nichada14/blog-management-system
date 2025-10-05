# Blog Management System

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- TailwindCSS

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

## Getting Started

### Prerequisites

- Node.js ≥ 18.x  
(Required by Prisma 6.x and Express 5.x)
- npm or yarn
- PostgreSQL database

---

### Backend Setup

```bash
cd server
npm install
Create a .env file in /server folder based on .env.example with your database credentials and JWT secret.

Run Prisma migrations to setup the database schema:

bash
Copy code
npx prisma migrate dev --name init
Start the backend server:

bash
Copy code
npm run dev
The backend will run on http://localhost:4000 (or the port you configured).

### Frontend Setup

```bash
cd client
npm install
npm run dev

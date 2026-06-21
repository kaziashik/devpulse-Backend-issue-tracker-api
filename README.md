# 🚀 DevPulse API

A collaborative issue tracking backend API for software teams to report bugs, request features, and manage issue workflows with role-based access control (RBAC).

---

## 🌐 Live API URL

Live Deployment:

```txt
https://node-express-assignment-seven.vercel.app/
```

---

# ✨ Features

### Authentication
- User registration
- User login
- JWT authentication
- Password hashing using bcrypt

### Issues Management
- Create issue
- Get all issues
- Get issue by ID
- Update issue
- Delete issue
- Update issue workflow status

### Role Based Access Control (RBAC)

Contributor:

- Register & login
- Create issues
- View issues
- Update own issue only if status = open

Maintainer:

- All contributor permissions
- Delete issues
- Update any issue
- Change issue workflow status
- Access metrics

---

# 🛠 Technology Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime |
| Express.js | Backend Framework |
| TypeScript | Type safety |
| PostgreSQL | Database |
| bcrypt | Password hashing |
| JWT | Authentication |
| pg | PostgreSQL driver |
| Raw SQL | Database queries |

---

# 📂 Project Structure

```txt
src/

├── config/
├── db/
├── middleware/
├── module/
│      ├── users/
│      └── issues/
│
├── utility/
├── type/
│
├── app.ts
└── server.ts
```

---

# ⚙ Installation & Setup

Follow these steps to run the project locally.

---

## 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project folder:

```bash
cd NODE_EXPRESS_ASSIGNMENT
```

---

## 2. Initialize Node.js Project (if creating from scratch)

```bash
npm init -y
```

---

## 3. Install Main Dependencies

Install backend packages:

```bash
npm install express pg dotenv cors
npm install bcryptjs jsonwebtoken
```

Package purposes:

| Package | Purpose |
|----------|----------|
| express | Backend framework |
| pg | PostgreSQL database driver |
| dotenv | Environment variables |
| cors | Cross-origin resource sharing |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |

---

## 4. Install Development Dependencies

Install TypeScript and type definitions:

```bash
npm install -D typescript
npm install -D tsx
npm install -D @types/node
npm install -D @types/express
npm install -D @types/pg
npm install -D @types/jsonwebtoken
npm install -D @types/bcryptjs
npm install -D @types/cors
```

Purpose:

| Package | Purpose |
|----------|----------|
| typescript | Type safety |
| tsx | Run TypeScript without compiling |
| @types/* | Type definitions |

---

## 5. Create TypeScript Configuration

Generate:

```bash
npx tsc --init
```

---

## 6. Configure Environment Variables

Create:

```txt
.env
```

Add:

```env
CONNECTIONSTRING=YOUR_DATABASE_URL

PORT=7000

JWT_SECRET=YOUR_SECRET_KEY

CLIENT_URL=http://localhost:5173
```

Example:

```env
CONNECTIONSTRING=postgresql://...

PORT=7000

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

## 7. Run PostgreSQL Database

Ensure PostgreSQL is running or use Neon PostgreSQL cloud database.

---

## 8. Run Development Server

Start server:

```bash
npm run dev
```

or:

```bash
npx tsx watch ./src/server.ts
```

Server:

```txt
http://localhost:7000
```

---

## 9. Build Production Files

Compile TypeScript:

```bash
npm run build
```

---

## 10. Start Production Server

```bash
npm start
```

---

## 11. Test API

Use:

- Postman
- Thunder Client
- Insomnia

Example:

```txt
POST http://localhost:7000/api/auth/signup

POST http://localhost:7000/api/auth/login

GET http://localhost:7000/api/issues
```

---

## 12. Verify Server Running

Open:

```txt
http://localhost:7000/
```

Expected response:

```json
{
  "success": true,
  "message": "Server Home Route",
  "data": {}
}
```

---

## Useful Scripts

Run development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start:

```bash
npm start
```

---

## Project Requirements

- Node.js (v24+ recommended)
- PostgreSQL
- TypeScript
- Express.js
---

# 🔐 Authentication & Authorization

JWT Flow:

```txt
Client Login
↓

Server validates credentials

↓

Generate JWT

↓

Client sends Authorization header

↓

Server verifies token

↓

Protected route access
```

Security:

- Passwords never returned
- JWT protected routes
- Role verification before actions

---

# 🗄 Database Schema

## Users Table

| Field | Type |
|-------|------|
| id | SERIAL |
| name | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |
| role | contributor / maintainer |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## Issues Table

| Field | Type |
|-------|------|
| id | SERIAL |
| title | VARCHAR |
| description | TEXT |
| type | bug / feature_request |
| status | open / in_progress / resolved |
| reporter_id | INTEGER |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# 📌 API Endpoints

Base URL:

```txt
/api
```

---

## Authentication

### Register User

POST

```txt
/api/auth/signup
```

Body:

```json
{
"name":"John Doe",
"email":"john@gmail.com",
"password":"123456",
"role":"contributor"
}
```

---

### Login

POST

```txt
/api/auth/login
```

Body:

```json
{
"email":"john@gmail.com",
"password":"123456"
}
```

---

# Issues

---

## Create Issue

POST

```txt
/api/issues
```

Protected:

```txt
JWT Required
```

---

## Get All Issues

GET

```txt
/api/issues
```

Optional query:

```txt
?sort=newest

?status=open

?type=bug
```

---

## Get Single Issue

GET

```txt
/api/issues/:id
```

---

## Update Issue

PATCH

```txt
/api/issues/:id
```

Protected

---

## Update Issue Status

PATCH

```txt
/api/issues/:id/status
```

Maintainer only

---

## Delete Issue

DELETE

```txt
/api/issues/:id
```

Maintainer only

---

## Get Metrics

GET

```txt
/api/issues/metrics
```

Maintainer only

---

# 👤 Author

Name:

```txt
Kazi Ashikur Rahman
```

GitHub:

```txt
https://github.com/kaziashik
```

---

# 📄 License

For educational purposes.

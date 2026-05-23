# 🚀 DevPulse API

A collaborative issue tracking backend API for software teams to report bugs, request features, and manage issue workflows with role-based access control (RBAC).

---

## 🌐 Live API URL

Live Deployment:

```txt
https://devpulse-api.onrender.com
```

GitHub Repository:

```txt
https://github.com/yourusername/devpulse
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

Clone repository:

```bash
git clone YOUR_REPO_URL
```

Install dependencies:

```bash
npm install
```

Create `.env`

```env
CONNECTIONSTRING=

PORT=7000

JWT_SECRET=

CLIENT_URL=
```

Run development server:

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
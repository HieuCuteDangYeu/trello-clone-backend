# 🚀 Trello Clone API

<div align="center">

**A robust, production-ready REST API for a Kanban-style application**

Built with TypeScript, Express, and MongoDB following Domain-Driven Design (DDD) principles

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

---

## ✨ Key Features

### 🏗️ Architecture

- **Modular Monolith** - Code organized by Bounded Contexts (Auth, Users, Boards)
- **Domain-Driven Design** - Clean separation of Domain Entities, Repositories, and Application Logic
- **DTO Validation** - Strict request validation using Zod
- **Data Mapping** - Decoupling Domain Entities from Database Models via Mappers

### 🔐 Security & Authentication

- **JWT Authentication** - Secure Access Token (15m) & Refresh Token (7d) rotation
- **RBAC** - Role-Based Access Control (Admin vs. Standard User)
- **Google OAuth2** - Secure ID Token verification
- **Email Verification** - Complete account activation flows
- **Password Reset** - Secure forgot/reset password flows

### 📋 Core Functionality

| Feature             | Description                                            |
| ------------------- | ------------------------------------------------------ |
| **Boards**          | Create, Edit, Delete, and View workspace boards        |
| **Lists**           | Add columns, reorder them with drag & drop logic       |
| **Cards**           | Create tasks, move between lists, reorder within lists |
| **Admin Dashboard** | System-wide board view with pagination                 |

---

## 🛠️ Tech Stack

| Category           | Technologies                       |
| ------------------ | ---------------------------------- |
| **Runtime**        | Node.js                            |
| **Language**       | TypeScript                         |
| **Framework**      | Express.js                         |
| **Database**       | MongoDB (Mongoose)                 |
| **Validation**     | Zod                                |
| **Authentication** | JWT, bcryptjs, google-auth-library |
| **Email**          | Nodemailer                         |
| **Deployment**     | Docker                             |

---

## 📂 Project Structure

```
src/
├── config/                 # Environment configuration
├── modules/                # Bounded Contexts
│   ├── auth/              # Login, Register, Refresh Token, Roles
│   ├── users/             # User Profile Management
│   ├── boards/            # Workspace/Board Management
│   ├── lists/             # Columns
│   └── cards/             # Tasks
└── shared/                # Shared Kernel
    ├── core/              # Base Entities, Domain logic
    └── infra/             # Base Controllers, Middleware, Utils
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- ✅ Node.js (v18+)
- ✅ MongoDB (Local or Atlas)
- ✅ npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/trello-clone-backend.git

# Navigate to project directory
cd trello-clone-backend

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/trello-clone-ddd

# JWT Configuration
JWT_SECRET=super_secret_access_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=super_secret_refresh_key
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Email (SMTP) Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="Trello Clone <no-reply@trelloclone.com>"
```

### Database Seeding

Initialize Roles (user, admin) and create a Super Admin account:

```bash
npm run seed
```

**Default Admin Credentials:**

- 📧 Email: `admin@trello.com`
- 🔑 Password: `admin123`

### Running the Application

```bash
# Development Mode (Hot Reload)
npm run dev

# Build for Production
npm run build

# Start Production Server
npm start
```

---

## 🔌 API Reference

### 🔐 Auth Module

| Method | Endpoint                | Description                                  |
| ------ | ----------------------- | -------------------------------------------- |
| `POST` | `/auth/register`        | Create account (triggers email verification) |
| `POST` | `/auth/login`           | Login (returns Access & Refresh Token)       |
| `POST` | `/auth/google`          | Login via Google ID Token                    |
| `POST` | `/auth/refresh-token`   | Get new Access Token                         |
| `GET`  | `/auth/verify-email`    | Verify account                               |
| `POST` | `/auth/forgot-password` | Request reset link                           |
| `POST` | `/auth/reset-password`  | Set new password                             |

### 📊 Board Module

| Method   | Endpoint            | Description                       |
| -------- | ------------------- | --------------------------------- |
| `GET`    | `/boards`           | Get my boards                     |
| `POST`   | `/boards`           | Create board                      |
| `GET`    | `/boards/:id`       | Get board details                 |
| `PATCH`  | `/boards/:id`       | Update board                      |
| `DELETE` | `/boards/:id`       | Delete board                      |
| `GET`    | `/boards/admin/all` | **(Admin)** Get all system boards |

### 📝 List Module

| Method   | Endpoint                | Description              |
| -------- | ----------------------- | ------------------------ |
| `GET`    | `/lists/board/:boardId` | Get columns for a board  |
| `POST`   | `/lists`                | Create column            |
| `PATCH`  | `/lists/:id`            | Rename or Move (Reorder) |
| `DELETE` | `/lists/:id`            | Delete column            |

### 🎯 Card Module

| Method   | Endpoint              | Description                          |
| -------- | --------------------- | ------------------------------------ |
| `GET`    | `/cards/list/:listId` | Get tasks for a column               |
| `POST`   | `/cards`              | Create task                          |
| `PATCH`  | `/cards/:id`          | Update details or Move (Drag & Drop) |
| `DELETE` | `/cards/:id`          | Delete task                          |

---

## 🐳 Docker Deployment

The project includes a multi-stage Dockerfile optimized for production environments (Render/AWS/DigitalOcean).

```bash
# Build the Docker image
docker build -t trello-api .

# Run container
docker run -p 3000:3000 --env-file .env trello-api
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 📧 Contact

Project Link: [https://github.com/HieuCuteDangYeu/trello-clone-backend](https://github.com/HieuCuteDangYeu/trello-clone-backend)

---

<div align="center">

**Made with ❤️ using Domain-Driven Design**

⭐ Star this repository if you find it helpful!

</div>

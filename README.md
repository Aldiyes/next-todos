# ⚡NextTodos

[![readme](https://github.com/aldiyespaskalisbirta/next-todos/assets/84847746/3bc45ca2-9675-4501-9d63-849df536d37a)](https://next-todos-rho.vercel.app/)

# 🔎 Overview

This is a simple todo application built using Appwrite and Next.js. This project demonstrates Server-Side Rendering (SSR) and JWT usage within a Next.js application.

If you'd like to try the app directly, visit the demo at https://next-todos-rho.vercel.app/

## 🤙 Features

- 🔐 Next-auth v5 (Auth.js)
- 🚀 Next.js 14 with server actions
- 🔑 Credentials Provider
- 🌐 OAuth Provider (Social login with Google & GitHub)
- 🔒 Forgot password functionality
- ✉️ Email verification
- 📱 Two factor verification
- 👥 User roles (Admin & User)
- 🚧 Role Gate
- 🔍 Exploring next.js middleware
- 📈 Extending & Exploring next-auth session
- 🔄 Exploring next-auth callbacks
- 🧑 currentUser utility
- 👮 currentRole utility
- 👑 Render content for admins using RoleGate component
- 🛡️ Protect API Routes for admins only
- 🔐 Protect Server Actions for admins only
- 📧 Change email with new verification in Settings page
- 🔑 Change password with old password confirmation in Settings page
- 🔔 Enable/disable two-factor auth in Settings page
- 🔄 Change user role in Settings page (for development purposes only)

## 🖥️ Getting Started

#### 1. Clone the project

```shell
  git clone https://github.com/aldiyespaskalisbirta/next-todos.git
```

#### 2. Go to the project directory

```shell
  cd next-todos
```

#### 3. Configure your local environment

```shell
  cp .env.example .env
```

#### 4. Install dependencies

```shell
  npm install
```

#### 5. Setup Prisma

Add MySQL Database

```shell
npx prisma generate
npx prisma db push

```

#### 6. Now run the following commands and you should be good to go 💪🏼

```shell
  npm run dev
```

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

| Name                   | Description                                   |
| :--------------------- | :-------------------------------------------- |
| `DATABASE_URL`         | Connection string for your MySQL database     |
| `DIRECT_URL`           | (Optional) URL for your deployed application  |
| `AUTH_SECRET`          | Secret key used for JWT authentication        |
| `GITHUB_CLIENT_ID`     | Client ID for GitHub OAuth integration        |
| `GITHUB_CLIENT_SECRET` | Client Secret for GitHub OAuth integration    |
| `GOOGLE_CLIENT_ID`     | Client ID for Google OAuth integration        |
| `GOOGLE_CLIENT_SECRET` | Client Secret for Google OAuth integration    |
| `RESEND_API_KEY`       | API key for resending verification emails     |
| `NEXT_PUBLIC_APP_URL`  | Public URL of your application (for frontend) |

## 🔐 Database Credentials

Add the following environment variables to the `.env` file, replacing the placeholders with your actual database connection details:

```shell
  DATABASE_URL=postgresql://DATABASE_USER:DATABASE_PASS@DATABASE_HOST:DATABASE_PORT/DATABASE_NAME
```

Replace the placeholders with your specific values:
| Name | Description |Example |
| :------------ | :----------------------- | :----- |
|`DATABASE_USER`| Database user credential | `root` |
|`DATABASE_PASS`| Database user password credential | `root` |
|`DATABASE_HOST`| Database connection host | `localhost`, `127.0.0.1` |
|`DATABASE_PORT`| Database connection port | `5432`, `3306` |
|`DATABASE_NAME`| Database connection port | `next_todo_pgdb` |

## Acknowledgements

[![Powered by Vercel](https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg)](https://vercel.com?utm_source=powered-by-vercel)

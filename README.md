# 🛡️ Better Auth – Next.js 16

This project is a modern authentication starter built with **Next.js 16** and the **Better Auth** framework, focusing on strong type safety and an excellent developer/user experience. It is a comprehensive learning project covering advanced database hooks, social authentication methods, and extended user models.

## 🚀 Key Features

* **Next.js 16 Ready:** Fully compatible architecture with the latest Next.js version (Edge/Experimental).
* **Social Auth (OAuth 2.0):**

  * **Google:** Fast and secure sign-in with Google accounts.
  * **GitHub:** One-click authentication using GitHub, ideal for developers.
* **Advanced User Model:** Integration of extra fields such as `gender`, `country`, `lastName`, and `role` using `additionalFields`.
* **Database Hooks:** Pre-user-creation hooks (`create:before`) for name normalization and automatic admin/user role assignment.
* **Email & Verification:** Secure email verification and password reset flows via Nodemailer.
* **Modern UI/UX:** A polished and animated interface built with Shadcn UI, Tailwind CSS, and GSAP.

## 🛠️ Tech Stack

| Technology         | Description                                 |
| :----------------- | :------------------------------------------ |
| **Framework**      | Next.js 16 (App Router)                     |
| **Authentication** | [Better Auth](https://www.better-auth.com/) |
| **Database**       | Neon DB (Serverless PostgreSQL)             |
| **ORM**            | Prisma                                      |
| **Email Service**  | Nodemailer                                  |
| **Animations**     | GSAP                                        |

## ⚙️ Installation & Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/username/project-name.git
   cd project-name
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file and fill it with your own values based on the template below:

   ```env
   # Better Auth Configuration
   BETTER_AUTH_SECRET="your_secret_here"
   BETTER_AUTH_URL="http://localhost:3000"

   # API Configuration
   NEXT_PUBLIC_API_URL="http://localhost:3000"

   # Database (Neon DB / PostgreSQL)
   DATABASE_URL="your_postgresql_connection_string"

   # App Settings
   ADMIN_EMAILS="admin@example.com"
   NODE_ENV="development"

   # Social Providers (OAuth)
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"

   GITHUB_CLIENT_ID="your_github_client_id"
   GITHUB_CLIENT_SECRET="your_github_client_secret"

   # Email Service (Nodemailer)
   NODEMAILER_USER="your_email@gmail.com"
   NODEMAILER_APP_PASSWORD="your_app_specific_password"
   ```

4. **Prepare the Database:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server:**

   ```bash
   npm run dev
   ```

## 📝 Project Purpose

This project was developed to explore and test the flexibility of the **Better Auth** framework (additional fields, database hooks, plugins) within a **Next.js 16** environment. It particularly focuses on how database-level hooks ensure data integrity and how modern OAuth flows can be optimized for real-world applications.

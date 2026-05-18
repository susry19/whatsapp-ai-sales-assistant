# WhatsApp AI Sales Assistant

WhatsApp AI Sales Assistant is a multi-tenant SaaS platform that automates customer service and sales for businesses on WhatsApp and Instagram using OpenAI.

## 🚀 Quick Start Guide

To get this project running on your local machine or in GitHub Codespaces, follow these steps:

### 1. Create a Free Supabase Account
1. Go to [Supabase.com](https://supabase.com) and click **Start your project**.
2. Sign in with your GitHub account.
3. Click **New Project** and select your organization.
4. Give your project a name (e.g., `wa-sales-ai`), generate a secure password, and select a region closest to you.
5. Click **Create new project** and wait a few minutes for the database to be provisioned.

### 2. Obtain Your Database Connection String
1. Once your project is ready, go to **Project Settings** (the gear icon on the left sidebar).
2. Click on **Database** under the Configuration section.
3. Scroll down to the **Connection string** section.
4. Select the **URI** tab.
5. Copy the connection string. It will look something like this:
   `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`
6. Replace `[YOUR-PASSWORD]` with the database password you created in step 1.4. (Make sure you also add `?pgbouncer=true&connection_limit=1` if recommended, or use the direct connection string, typically ending in `:5432/postgres`).

### 3. Setup Your Environment Variables
1. In your project directory, copy `.env.example` to create a `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and replace `"your_supabase_connection_string"` with the string you copied in step 2.

### 4. Install Dependencies
Run the following command to install all project dependencies. The `--legacy-peer-deps` flag is required because we are using Next.js 15 RC and React 19 RC which might have strict peer dependency requirements.
```bash
npm install --legacy-peer-deps
```

### 5. Setup the Database Schema
1. Generate the Prisma Client based on your schema:
   ```bash
   npx prisma generate
   ```
2. Push your schema to your newly created Supabase database. This will create all the necessary tables automatically:
   ```bash
   npx prisma db push
   ```

### 6. Run the Application
Start the development server:
```bash
npm run dev
```
Your application will be available at [http://localhost:3000](http://localhost:3000).

## 🧪 Testing the Application

1. **Registration**: Go to `http://localhost:3000/register` to test the new premium Turkish registration interface. Fill out the form to create your organization and user.
2. **Login**: Go to `http://localhost:3000/login` and sign in with the credentials you just created.
3. **Database**: Check your Supabase dashboard (Table editor) to verify that the `User` and `Organization` records were created automatically.

## 💻 GitHub Codespaces Support

This project is fully configured to work in GitHub Codespaces. Simply click the **Code** button on GitHub, select the **Codespaces** tab, and create a new codespace. Once it loads, follow steps 3-6 above in the built-in terminal.

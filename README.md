# WhatsApp AI Sales Assistant

A production-ready SaaS platform that provides a 24/7 AI-powered customer service and sales automation solution for businesses selling through WhatsApp Business and Instagram Direct Messages.

## Features

- **Multi-Tenant SaaS**: Complete auth and organization separation.
- **Product Knowledge Base**: Upload products via CSV. AI auto-trains on embeddings using `pgvector`.
- **Smart AI Agent**: Uses GPT-4o / GPT-5 to answer questions, recommend products, and handle customer service automatically.
- **WhatsApp Integration**: Native Meta Webhooks integration.
- **Order Management**: AI automatically collects order details (Name, Address, Phone).
- **Modern Dashboard**: Built with Next.js 15 App Router, Tailwind CSS, and Shadcn UI concepts.

## Tech Stack

- **Frontend & Backend API**: Next.js 15 (App Router)
- **Database**: PostgreSQL with `pgvector` extension
- **ORM**: Prisma
- **AI**: OpenAI API (Embeddings + Chat Completions)
- **Styling**: Tailwind CSS

## Deployment Guide

### 1. Database (Railway)
1. Create a new project on Railway.
2. Add a **PostgreSQL** database.
3. Once deployed, run the following SQL command in your database to enable vector support:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
4. Copy the `DATABASE_URL` connection string.

### 2. Application (Vercel)
1. Push this code to a GitHub repository.
2. Import the repository into Vercel.
3. Configure the following Environment Variables in Vercel:

```env
DATABASE_URL="postgresql://postgres:password@host:port/railway?schema=public"
OPENAI_API_KEY="sk-..."
WHATSAPP_VERIFY_TOKEN="wa_sales_ai_verify_token"
```

4. During deployment, Vercel will automatically run `npm install` and `prisma generate`. You also need to run `npx prisma db push` to synchronize the schema. You can add a custom build command in Vercel:
`npx prisma db push && next build`

### 3. WhatsApp Meta Cloud API Setup
1. Go to [Meta for Developers](https://developers.facebook.com/).
2. Create an App > Business > WhatsApp Setup.
3. Add a phone number.
4. Go to **Configuration** > Webhook.
5. Set the Callback URL to: `https://your-vercel-domain.vercel.app/api/webhooks/whatsapp`
6. Set the Verify Token to: `wa_sales_ai_verify_token` (must match your env var).
7. Subscribe to `messages` webhook fields.
8. Get your permanent Access Token and Phone Number ID.

### 4. Organization Setup
1. Open the deployed application and click "Start Free Trial" to register an Admin account.
2. Go to **Dashboard > Settings**.
3. Input your **Meta Access Token** and **Phone Number ID**.
4. (Optional) Input a custom OpenAI key for this specific tenant if you want to bill per tenant.
5. Go to **Dashboard > Products** and upload a CSV file with your products to train the AI.

## CSV Format
Ensure your CSV has the following headers (as defined in the app):
- `urun_adi` (Product Name)
- `kisa_aciklama` (Short Description)
- `detayli_aciklama` (Detailed Description)
- `resim_url` (Image URL) - Optional
- `fiyat` (Price) - Optional
- `stok` (Stock) - Optional
- `kategori` (Category) - Optional
- `marka` (Brand) - Optional

## Local Development (If Node is installed)
```bash
npm install
npx prisma db push
npm run dev
```

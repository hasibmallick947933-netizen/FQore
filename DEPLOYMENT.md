# Production Deployment Guide

This guide walks you through deploying the **EduX Intel** educational platform to **Vercel** (Frontend), **Render** (Backend), **MongoDB Atlas** (Database), and **Cloudinary** (Media Storage).

---

## 1. MongoDB Atlas Setup (Database)

1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster (e.g. M0 tier).
3. Under **Database Access**, create a database user:
   - Username: `edux_admin`
   - Password: Choose a secure password (e.g. `YourStrongPassword123`)
   - Role: Read and write to any database.
4. Under **Network Access**, add IP address:
   - Add `0.0.0.0/0` (Allow Access from Anywhere so Render can connect).
5. Click **Connect** → **Drivers** (Node.js) → Copy the connection string:
   ```
   mongodb+srv://edux_admin:<password>@cluster0.abcde.mongodb.net/edux_db?retryWrites=true&w=majority
   ```
   *(Replace `<password>` with your actual database user password)*

---

## 2. Cloudinary Setup (File & Media Storage)

Cloudinary stores all uploaded images, video masterclasses, PDF guides, and Excel spreadsheets.

1. Sign up / log in to [Cloudinary](https://cloudinary.com/).
2. From the **Dashboard**, copy your 3 API credentials:
   - **Cloud Name** (e.g. `dxy8abcde`)
   - **API Key** (e.g. `982348719283749`)
   - **API Secret** (e.g. `aBcDeFgHiJkLmNoPqRsTuVwXyZ`)

---

## 3. Render Deployment (Backend REST API)

1. Push this repository to GitHub or GitLab.
2. Sign in to [Render](https://render.com/).
3. Click **New +** → **Web Service**.
4. Connect your GitHub repository.
5. Configure the service settings:
   - **Name**: `edux-backend-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Starter)
6. Add **Environment Variables** in the Render dashboard:
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Production environment |
   | `PORT` | `10000` | Render default port |
   | `MONGODB_URI` | `mongodb+srv://FQoreadmin:HM2506@cluster0.oue58pu.mongodb.net/edux_db?retryWrites=true&w=majority&appName=Cluster0` | MongoDB Atlas live cluster URI |
   | `JWT_SECRET` | `super_secret_jwt_key_edux_production_secure_778899` | Secret key for JWT auth |
   | `JWT_EXPIRE` | `30d` | Token expiry |
   | `CLOUDINARY_CLOUD_NAME` | `xbvjx6qb` | Cloudinary Cloud Name |
   | `CLOUDINARY_API_KEY` | `312782684283273` | Cloudinary API Key |
   | `CLOUDINARY_API_SECRET` | `m_xLdjxrYN3NsAT78tg-_o9TnTU` | Cloudinary API Secret |
   | `RAZORPAY_KEY_ID` | `rzp_live_...` or `rzp_test_...` | Razorpay Key ID (fallback test mode active if blank) |
   | `RAZORPAY_KEY_SECRET` | `your_secret_...` | Razorpay Key Secret |
   | `CLIENT_URL` | `https://your-edux-frontend.vercel.app` | Your Vercel frontend URL |

7. Click **Create Web Service**.
8. Once deployed, note your backend URL (e.g. `https://edux-backend-api.onrender.com`).
9. *(Optional)* Run the seed script via Render's **Shell** tab:
   ```bash
   node utils/seedData.js
   ```
   *(Note: The live MongoDB Atlas cluster is already seeded with Admin, sample curriculum publications, and the 3 pricing tiers: Starter ₹59, Growth ₹99, Premium ₹149).*

---

## 4. Vercel Deployment (Frontend Next.js App)

1. Sign in to [Vercel](https://vercel.com/).
2. Click **Add New...** → **Project**.
3. Import your Git repository.
4. In the configuration screen:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click edit and select `frontend`
5. Expand **Environment Variables** and add:
   | Key | Value |
   | :--- | :--- |
   | `NEXT_PUBLIC_API_URL` | `https://edux-backend-api.onrender.com/api` |
   *(Point to your deployed Render backend `/api` endpoint)*
6. Click **Deploy**.

---

## 5. Post-Deployment Verification

1. Open your Vercel URL in a browser.
2. Verify that homepage loads the futuristic cyber theme, ambient glow, and curriculum tracks.
3. Click **Log In** (`/login`) and authenticate using the seeded credentials:
   - Email: `fqorein@gmail.com`
   - Password: `sunny005`
4. Access `/admin` to verify:
   - KPI metrics and active modules
   - Media upload to Cloudinary
   - Creation of an educational article or financial model.

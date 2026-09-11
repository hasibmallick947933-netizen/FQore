# EduX Intel | Production Full-Stack Educational & Financial Intelligence Platform

A production-ready full-stack web application designed for publishing and consuming institutional-grade educational content on business models, stock markets, company equity analyses, corporate case studies, trading mechanics, and downloadable financial models.

The user interface and motion design are crafted after high-tech cyber-fintech aesthetics: deep obsidian backdrops (`#030712`), ambient neon cyan/blue lighting, interactive matrix grid animations with pulsing nodes, numbered glassmorphic cards (`01.`, `02.`), and brushed metallic chrome CTA controls.

---

## Architecture Overview

```
                        ┌────────────────────────┐
                        │      VERCEL CLOUD      │
                        │    Next.js 14 App      │
                        └───────────┬────────────┘
                                    │ HTTPS (REST API)
                                    ▼
                        ┌────────────────────────┐
                        │      RENDER CLOUD      │
                        │ Node.js / Express API  │
                        └─────┬────────────┬─────┘
                              │            │
             ┌────────────────▼───┐    ┌───▼────────────────┐
             │   MONGODB ATLAS    │    │  CLOUDINARY CLOUD  │
             │   (Cloud Database) │    │  (Files, PDFs,     │
             │   Metadata, Users  │    │   Videos, Models)  │
             └────────────────────┘    └────────────────────┘
```

---

## Core Capabilities

### 1. Database-Driven Zero-Code CMS
The Administrator can operate, curate, and scale the entire platform from the `/admin` CMS dashboard without touching a single line of code:
* **Create, Edit & Delete**: Multi-format educational content (Articles, Videos, PDFs, Excel models, CSVs, Company Analyses, Case Studies, Educational Notes).
* **Taxonomy & Categories**: Dynamically add and organize categories and topic tracks.
* **Direct Cloudinary Media Uploads**: Stream PDFs, financial spreadsheets, videos, and images up to 50MB directly to Cloudinary with automatic metadata indexing in MongoDB.
* **Instant Publishing Toggle**: One-click toggling between Draft and Published status.
* **Homepage Curation**: Mark modules as Featured to instantly update the homepage hero showcase and flagship cards.
* **User & Role Administration**: Promote or demote learner accounts to Administrator.

### 2. Public Educational Hubs
* **Business Models (`/business`)**: Unit economics, SaaS metrics (Rule of 40, CAC payback, NDR), marketplace dynamics.
* **Stock Market (`/stock-market`)**: Order book mechanics, clearing, auctions, bid-ask spread liquidity.
* **Company Deep Dives (`/companies`)**: Institutional equity scorecards (Ticker, Sector, Moats, Risks, Financial Highlights).
* **Investing & Valuation (`/investing`)**: Discounted Cash Flow (DCF) modeling, WACC calculation, margin of safety.
* **Trading Concepts (`/trading`)**: Price action, candlestick anatomy (Hammer, Pin Bar, Engulfing), risk management psychology.
* **Business Case Studies (`/case-studies`)**: Structured retrospectives detailing challenges, tactical pivots, and key lessons.
* **Macro Market Analysis (`/market-analysis`)**: Yield curve dynamics, central bank liquidity cycles, inflation regimes.
* **Resource Center (`/resources`)**: Filterable downloadable library for Excel models, CSVs, and PDF checklists.
* **Global Search (`/search`)**: Full-text querying with faceted category and format filters.
* **Learner Dashboard (`/bookmarks`)**: Saved bookmarks and tracking of completed courses.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express.js, REST Architecture, Helmet, CORS, Express-Rate-Limit, Multer |
| **Database** | MongoDB & Mongoose (MongoDB Atlas in Production, In-Memory MongoDB in Dev Fallback) |
| **Media Storage** | Cloudinary SDK (with automatic fallback to local disk storage in development) |
| **Security** | JWT Authentication, Bcrypt password hashing, Input Sanitization, Role Gatekeepers |

---

## Quick Start (Local Development)

### 1. Backend Setup

```bash
cd backend
npm install
npm run seed     # Pre-populates database with demo content & users
npm run dev      # Starts API server on http://localhost:5001
```

### 2. Frontend Setup

In a new terminal window:
```bash
cd frontend
npm install
npm run dev      # Starts Next.js app on http://localhost:3000
```

Visit **`http://localhost:3000`** in your browser!

---

## Default Seeded Credentials

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Administrator** | `fqorein@gmail.com` | `sunny005` | Complete CMS Access (`/admin`) |
| **Student / User** | `student@eduxchain.com` | `Student@123456` | Bookmarks, Progress Tracking |

> **Tip**: The login screen (`/login`) includes one-click demo credential buttons for instant testing.

---

## REST API Specification

### Authentication
* `POST /api/auth/register`: Create learner account
* `POST /api/auth/login`: Authenticate and receive JWT token
* `GET /api/auth/me`: Get current authenticated user profile
* `PUT /api/auth/profile`: Update name, avatar, bio

### Content Engine
* `GET /api/content`: Paginated search and faceted filter query
* `GET /api/content/:slug`: Fetch single publication (increments view count, returns related articles)
* `GET /api/content/resources/all`: Filtered query for downloadable attachments
* `POST /api/content`: Create educational publication *(Admin)*
* `GET /api/content/id/:id`: Fetch single publication by ID *(Admin)*
* `PUT /api/content/id/:id`: Update publication *(Admin)*
* `DELETE /api/content/id/:id`: Delete publication *(Admin)*
* `PATCH /api/content/id/:id/publish`: Toggle published / draft state *(Admin)*

### Media & Cloudinary
* `POST /api/media/upload`: Multipart upload (Cloudinary stream with disk fallback) *(Admin)*
* `GET /api/media`: List uploaded assets *(Admin)*
* `DELETE /api/media/:id`: Remove media from Cloudinary and database *(Admin)*

### Taxonomy
* `GET /api/categories`: List categories with active module counts
* `POST /api/categories`: Create category *(Admin)*
* `PUT /api/categories/:id`: Update category *(Admin)*
* `DELETE /api/categories/:id`: Delete category *(Admin)*

### User Operations
* `GET /api/bookmarks`: Fetch saved items for authenticated user
* `POST /api/bookmarks/:contentId`: Toggle bookmark on/off
* `GET /api/progress`: Retrieve completed modules and percentages
* `POST /api/progress/:contentId`: Save course progress percentage

### Administration & Analytics
* `GET /api/stats`: Aggregate KPIs, view counts, and format distributions *(Admin)*
* `GET /api/users`: Search and list registered accounts *(Admin)*
* `PUT /api/users/:id`: Change user role (`admin` / `user`) *(Admin)*
* `DELETE /api/users/:id`: Remove user *(Admin)*

### Pricing Plans & Razorpay Payments
* `GET /api/plans`: Fetch all active pricing plans (Public - Starter ₹59, Growth ₹99, Premium ₹149)
* `GET /api/plans/all`: List all plans including inactive ones *(Admin)*
* `POST /api/plans`: Create a new custom plan tier *(Admin)*
* `PUT /api/plans/:id`: Edit pricing, features, badge, or active status *(Admin)*
* `DELETE /api/plans/:id`: Delete a pricing tier *(Admin)*
* `POST /api/payments/create-order`: Generate Razorpay payment order (with automatic sandbox simulation fallback)
* `POST /api/payments/verify`: Cryptographically verify Razorpay signature and unlock paywalled materials

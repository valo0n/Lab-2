# Clicon — E-Commerce Marketplace

Full-stack e-commerce application built with the MERN Stack.

## Tech Stack

- **Backend:** Node.js + Express.js
- **Frontend:** React + Vite + Tailwind CSS
- **SQL Database:** MySQL (Prisma ORM)
- **NoSQL Database:** MongoDB (Mongoose)
- **Real-Time:** Socket.IO
- **Payments:** Stripe (Test Mode)
- **Auth:** JWT (Access + Refresh Tokens)
- **State Management:** Redux Toolkit

## Setup

### 1. Clone and install

```bash
git clone https://github.com/your-team/clicon-ecommerce.git
cd clicon-ecommerce
npm run install-all
```

### 2. Configure environment

```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your credentials
```

### 3. Create database and setup Prisma

```bash
mysql -u root -p -e "CREATE DATABASE clicon_ecommerce;"
cd backend
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

Admin login: `admin@clicon.com` / `Admin@123`

### 4. Start development

```bash
npm run dev
```

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

## Test Cards (Stripe)

- `4242 4242 4242 4242` — Payment succeeds
- `4000 0000 0000 0002` — Payment declined

## Team

| Member   | Responsibilities                      |
| -------- | ------------------------------------- |
| Member 1 | Auth, Users, Roles, Project Setup     |
| Member 2 | Products, Categories, Search          |
| Member 3 | Cart, Orders, Stripe Payments         |
| Member 4 | Reviews, Notifications, Admin, Export |

## API Documentation (Swagger)

Pasi të nisësh backend-in, dokumentacioni interaktiv i API-së gjendet te:

```
http://localhost:5000/api/docs
```

Aty janë të listuara të gjitha endpoint-et (auth, products, orders, payments, etj.) me metodat, parametrat dhe sigurinë (Bearer JWT). Spec-i OpenAPI ndodhet te `backend/src/config/openapi.json`.

## Database Diagram (ERD)

ERD-ja e plotë e bazës relacionale (28 tabela) gjendet te [`docs/ERD.md`](docs/ERD.md) dhe renderohet automatikisht në GitHub.

## Real-Time Communication

Aplikacioni përdor **Socket.IO** për njoftime live:

- Backend-i emiton evente te `user_<id>` (p.sh. kur krijohet një porosi ose ndryshon statusi i saj).
- Frontend-i lidhet me socket-in pas login-it dhe shfaq njoftimet live si toast (pa rifreskuar faqen).

## Environment Variables (shtesë)

Sigurohu që `backend/.env` ka:

```
JWT_SECRET=...            # ose JWT_ACCESS_SECRET
JWT_REFRESH_SECRET=...
STRIPE_SECRET_KEY=sk_test_...
CLIENT_URL=http://localhost:5173
```

Dhe `frontend/.env`:

```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

# Advanced School Management

## Project Structure

```
school-management/
├── frontend/               ← Frontend application (React + Vite)
│   ├── tsconfig.json
│   ├── package.json
│   ├── index.html
│   ├── vite.config.ts
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       └── ...
│
├── backend/                ← Backend API (Express + Prisma)
│   ├── tsconfig.json
│   ├── package.json
│   ├── prisma/
│   └── src/
│       └── server.ts
│
└── README.md
```

## Running the code

### Frontend
```bash
cd frontend
# Copy .env file if needed
cp .env.example .env
# Edit .env to set VITE_API_URL
pnpm install
pnpm dev
```

### Backend
```bash
cd backend
pnpm install
pnpm dev
```

### Install all dependencies (from root)
```bash
pnpm install
```

## Deployment

### Frontend (Render)
- Frontend is deployed on Render
- Set `VITE_API_URL` environment variable in Render to your backend URL
- Example: `VITE_API_URL=https://your-backend.onrender.com/api`

### Backend (Render)
- Backend is deployed on Render
- Ensure Prisma migrations are run during deployment
- Set environment variables in Render (DATABASE_URL, JWT_SECRET, etc.)
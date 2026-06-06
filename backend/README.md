# School Management Backend

Industry-standard Node.js/TypeScript backend with Express for the school management system.

## Tech Stack

- **Node.js** with **TypeScript**
- **Express** - Web framework
- **Prisma** - ORM for PostgreSQL
- **CORS** - Cross-origin resource sharing
- **express-validator** - Request validation

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.ts  # Prisma client
│   │   └── index.ts     # App configuration
│   ├── controllers/     # Request handlers
│   │   └── dashboardController.ts
│   ├── middleware/      # Express middleware
│   │   ├── auth.ts      # Authentication & authorization
│   │   ├── cors.ts      # CORS configuration
│   │   ├── errorHandler.ts  # Error handling
│   │   └── validation.ts # Request validation
│   ├── routes/          # API routes
│   │   ├── dashboardRoutes.ts
│   │   └── index.ts
│   ├── services/        # Business logic
│   │   ├── dashboardService.ts
│   │   └── index.ts
│   ├── types/           # TypeScript types
│   │   └── express.d.ts
│   ├── utils/           # Utility functions
│   │   ├── asyncHandler.ts
│   │   ├── response.ts
│   │   └── index.ts
│   └── server.ts        # Main server file
├── prisma/
│   └── schema.prisma    # Database schema
├── .env                 # Environment variables
├── package.json
└── tsconfig.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pnpm install
```

### 2. Configure Environment Variables

Update the `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/school_management?schema=public"
PORT=5000
NODE_ENV=development
```

### 3. Set Up Database

```bash
# Generate Prisma client
pnpm prisma:generate

# Run migrations (when ready to connect to database)
pnpm prisma:migrate

# Optional: Open Prisma Studio to view database
pnpm prisma:studio
```

### 4. Run Development Server

```bash
pnpm dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/attendance` - Get attendance data
- `GET /api/dashboard/grades` - Get grade distribution
- `GET /api/dashboard/performance` - Get performance trends

## Features Implemented

- ✅ Industry-standard folder structure
- ✅ TypeScript configuration
- ✅ Express server setup
- ✅ CORS middleware
- ✅ Error handling middleware
- ✅ Request validation middleware
- ✅ Authentication/Authorization middleware (stub)
- ✅ Response utility functions
- ✅ Async error handler
- ✅ Service layer for business logic
- ✅ Controller layer for request handling
- ✅ Route organization
- ✅ Prisma ORM setup with schema
- ✅ Environment configuration

## Next Steps

1. **Connect to PostgreSQL database** - Update `.env` with your database credentials
2. **Run Prisma migrations** - Create the database tables
3. **Implement JWT authentication** - Replace the mock authentication in `middleware/auth.ts`
4. **Add more controllers** - Create controllers for students, teachers, classes, etc.
5. **Connect services to database** - Replace mock data with actual database queries in services
6. **Add input validation** - Implement validation rules using express-validator
7. **Add tests** - Write unit and integration tests
8. **Add logging** - Implement request/response logging

## Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build TypeScript to JavaScript
- `pnpm start` - Start production server
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Run database migrations
- `pnpm prisma:studio` - Open Prisma Studio

# College Management System

A full-stack, production-ready College Management System built with React, Node.js, Express, Sequelize, and MySQL.

## Project Overview
This platform provides dedicated portals for Administrators, Professors, and Students. It covers everything from academic record management and course assignments to student gamification, dashboards, and analytics.

## Architecture
- **Frontend**: React.js with React Router (v6)
- **Backend**: Node.js + Express.js
- **Database**: MySQL managed via Sequelize ORM
- **Authentication**: JWT-based session management, securely passing tokens via `localStorage` and Authorization headers.

## Folder Structure
```text
clg_management/
├── backend/
│   ├── config/            # Database configuration (Sequelize)
│   ├── migrations/        # Database migrations
│   ├── seeders/           # Dummy data seeders
│   ├── src/
│   │   ├── controllers/   # Route controllers (Admin, Student, Professor, Auth)
│   │   ├── middleware/    # Auth & Error handling middlewares
│   │   ├── models/        # Sequelize models (User, Course, Module, etc.)
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # Business logic and database queries
│   │   └── app.js         # Express app entry point
│   └── package.json
└── frontend/
    ├── public/            # Static assets
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Page components (Admin, Auth, Student, Professor)
    │   ├── services/      # API communication layer (api.js)
    │   ├── App.jsx        # Routing and Protected Routes setup
    │   └── index.js       # React root
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- MySQL (v8+ recommended)

### Environment Variables
**Backend (`backend/.env`)**
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=clg_management_db
JWT_SECRET=supersecretkey
```

**Frontend (`frontend/.env`)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Database Setup
Ensure MySQL is running, then navigate to the backend folder and run:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create the database:
   ```bash
   npx sequelize-cli db:create
   ```
3. Run migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
4. Seed the database (Important for default admin and initial data):
   ```bash
   npx sequelize-cli db:seed:all
   ```

## Running the Application

### Running Backend
```bash
cd backend
npm start       # or npm run dev for nodemon
```
The API will run on `http://localhost:5000`.

### Running Frontend
```bash
cd frontend
npm install
npm start
```
The React app will open at `http://localhost:3000`.

## Testing APIs
You can test the APIs using Postman or Insomnia. 
1. Hit `POST /api/auth/login` with valid credentials to receive a token.
2. Pass the token as `Bearer <token>` in the Authorization header to access protected routes (e.g., `/api/admin/students`).

## Deployment Notes
- **Frontend**: The React application can be built using `npm run build` and served as static files via Nginx or hosted on Vercel/Netlify.
- **Backend**: Can be hosted on Heroku, Render, or a VPS (EC2/DigitalOcean). Ensure CORS is correctly configured in `app.js` to only accept requests from the production frontend domain.
- **Database**: Use a managed MySQL database (like AWS RDS) for production.
- **Security**:
  - Global error handler catches unexpected exceptions.
  - Transactions prevent orphaned data creation.
  - Form validation on frontend limits garbage input.

## AI Features
AI modules (Quiz Generator, Assignment Generator, Summary Generator, etc.) have intentionally been bypassed in this phase and currently act as UI placeholders.

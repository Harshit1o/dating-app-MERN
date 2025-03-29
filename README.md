# Dating App (MERN Stack)

A basic dating application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features
- User authentication (signup/login)
- User profiles
- Basic matching system
- Chat functionality
- Purple theme design

## Project Structure
```
dating-app/
├── frontend/          # React + Vite frontend
└── backend/           # Node.js + Express backend
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory with:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used
- Frontend: React, Vite, TailwindCSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## API Endpoints
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- PUT /api/users/:id - Update user profile
- POST /api/matches - Create a match
- GET /api/matches - Get user matches 
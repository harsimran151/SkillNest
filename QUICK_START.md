# MERN Stack - Quick Start Guide

## Overview
Your Skill Share Hub project has been converted to a proper MERN (MongoDB, Express, React, Node.js) monorepo structure. This guide will help you get started immediately.

## What Changed?

### ✅ Completed Conversions
1. **Monorepo Structure**: Project split into `/client` (React frontend) and `/server` (Node.js/Express backend)
2. **Removed Firebase**: All Firebase dependencies and implementation removed
3. **API Layer Created**: New API service for frontend to communicate with backend
4. **JWT Authentication**: Replaced with backend JWT-based auth system
5. **MongoDB Ready**: Models and schema templates created for database
6. **Proper Separation**: Clean separation between frontend and backend concerns

## Quick Start (5 Steps)

### Step 1: Install MongoDB
Choose one:
- **Local**: Download from https://www.mongodb.com/try/download/community
- **Cloud**: Create free cluster at https://www.mongodb.com/cloud/atlas

### Step 2: Set Up Environment Variables

**Frontend (.env.local in `client/` folder):**
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Skill Share Hub
```
✅ Already created with default values

**Backend (.env.local in `server/` folder):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skill-share-hub
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080
```
✅ Already created with default values

### Step 3: Install Dependencies
```bash
# From root folder
npm install

# Install client dependencies
npm install --workspace=client

# Install server dependencies
npm install --workspace=server
```

### Step 4: Start MongoDB
```bash
# If MongoDB is installed locally:
mongod

# Or use MongoDB Atlas (cloud) - update MONGODB_URI in server/.env.local
```

### Step 5: Run Development Servers
```bash
# From root folder - runs both frontend and backend
npm run dev

# Or run separately:
npm run client      # Frontend only (port 8080)
npm run server      # Backend only (port 5000)
```

## URLs After Starting
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## Current API Endpoints

### Authentication ✅ (Already Implemented)
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Skills (Ready for Implementation)
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill details
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Tasks (Ready for Implementation)
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task details
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Community (Ready for Implementation)
- `GET /api/community` - Get all posts
- `GET /api/community/:id` - Get post details
- `POST /api/community` - Create post

### Users (Ready for Implementation)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user profile

## How to Use API in Frontend

### Example: Fetch Skills
```typescript
import { useQuery } from '@tanstack/react-query';
import { skillsAPI } from '@/lib/apiEndpoints';

function SkillsList() {
  const { data: skills, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: skillsAPI.getAll,
  });

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {skills?.map(skill => (
        <div key={skill._id}>{skill.title}</div>
      ))}
    </div>
  );
}
```

### Example: Login
```typescript
import { useAuth } from '@/hooks/useAuth';

function LoginForm() {
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      console.log('Logged in successfully!');
    } else {
      console.error(result.error);
    }
  };

  // Form JSX...
}
```

## Project Structure

```
skill-share-hub/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── lib/
│   │   │   ├── api.ts              # Axios setup
│   │   │   ├── apiEndpoints.ts     # API functions
│   │   │   └── authUtils.ts        # Auth helpers
│   │   ├── hooks/useAuth.ts        # Auth state (Zustand)
│   │   ├── pages/                  # Route pages
│   │   └── components/             # React components
│   ├── .env.local                   # Frontend config
│   └── package.json
│
├── server/                          # Express Backend
│   ├── src/
│   │   ├── models/                 # MongoDB schemas
│   │   │   ├── User.js
│   │   │   ├── Skill.js
│   │   │   ├── Task.js
│   │   │   └── CommunityPost.js
│   │   ├── controllers/            # Request handlers
│   │   │   └── authController.js
│   │   ├── routes/                 # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── skillRoutes.js
│   │   │   └── ...
│   │   ├── middleware/             # Middleware
│   │   │   └── auth.js
│   │   ├── utils/                  # Utilities
│   │   │   └── tokenUtils.js
│   │   └── server.js               # Express app
│   ├── .env.local                   # Backend config
│   └── package.json
│
├── package.json                     # Monorepo config
├── MERN_STRUCTURE.md               # Full documentation
├── SETUP_CHECKLIST.md              # Implementation checklist
└── README.md
```

## Key Features Implemented

### ✅ Frontend
- **API Service Layer** - Centralized HTTP requests
- **JWT Authentication** - Token-based auth
- **Request Interceptors** - Auto-attach tokens
- **Error Handling** - 401 redirect on auth failure
- **Auth Store** - Zustand for auth state
- **React Query** - Server state management

### ✅ Backend
- **Express Server** - HTTP API server
- **MongoDB Models** - Database schemas for User, Skill, Task, Community
- **JWT Auth** - Token generation and verification
- **Password Hashing** - bcryptjs for secure passwords
- **Auth Routes** - Signup, login, profile endpoints
- **CORS** - Cross-origin request handling

## Next Steps

### For Frontend Development
1. Update Login.tsx and Signup.tsx to use new auth API
2. Connect existing pages to API endpoints
3. Add React Query hooks for data fetching
4. Add loading states and error handling
5. Remove any remaining Firebase references

### For Backend Development
1. Implement Skills controller and routes
2. Implement Tasks controller and routes
3. Implement Community controller and routes
4. Implement Users controller and routes
5. Add input validation
6. Add error handling

## Testing Auth Endpoint

### Using cURL:
```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Using Postman:
1. Create POST request to `http://localhost:5000/api/auth/signup`
2. Set Body to JSON: `{"name":"John Doe","email":"john@example.com","password":"password123"}`
3. Send request
4. Copy the token from response
5. Use token in Authorization header for protected routes

## Troubleshooting

### Port Already in Use
```bash
# Change port in server/.env.local
PORT=5001

# Change frontend API URL in client/.env.local
VITE_API_BASE_URL=http://localhost:5001/api
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in server/.env.local
- Use MongoDB Compass to test connection

### CORS Error
- Check CORS_ORIGIN in server/.env.local matches frontend URL
- Ensure frontend is at http://localhost:8080

### Auth Token Error
- Clear localStorage: `localStorage.clear()`
- Login again
- Check JWT_SECRET matches on backend

## Documentation Files

- **MERN_STRUCTURE.md** - Complete architecture and API documentation
- **SETUP_CHECKLIST.md** - Implementation tasks and progress tracking
- **This File (QUICK_START.md)** - Quick reference guide

## Need Help?

1. Check MERN_STRUCTURE.md for detailed API documentation
2. Check SETUP_CHECKLIST.md for implementation tasks
3. Review example components in the codebase
4. Check browser console for error messages
5. Check server logs for backend errors

---

## Summary
Your project is now properly structured as a MERN stack! 🎉

- ✅ Monorepo ready
- ✅ Frontend API integration ready
- ✅ Backend scaffolding complete
- ✅ Authentication system ready
- ✅ Database models prepared

**Next**: Run `npm run dev` and start building! 🚀

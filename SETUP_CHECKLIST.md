# MERN Stack Setup Checklist

## ✅ Completed

### Project Structure
- [x] Created monorepo structure with `/client` and `/server` folders
- [x] Root `package.json` with workspace configuration
- [x] Client `package.json` with React dependencies
- [x] Server `package.json` with Node.js/Express dependencies

### Frontend Setup
- [x] Created API service layer (`lib/api.ts`)
  - Axios instance with request/response interceptors
  - Auto-adds JWT token to requests
  - Auto-handles 401 redirects
  
- [x] Created API endpoints module (`lib/apiEndpoints.ts`)
  - Auth endpoints (signup, login, logout, profile)
  - Skills endpoints (CRUD)
  - Tasks endpoints (CRUD)
  - Community endpoints
  - Users endpoints
  
- [x] Created auth utilities (`lib/authUtils.ts`)
  - Token storage/retrieval
  - User storage/retrieval
  - JWT decoding
  - Auth state helpers
  
- [x] Updated `useAuth` hook
  - Connects to backend API
  - Uses JWT tokens
  - Proper error handling
  - Loading states

- [x] Environment configuration
  - `.env.example` with required variables
  - `.env.local` with default values
  - Added axios to dependencies

### Backend Setup
- [x] Express server setup with MongoDB connection
- [x] CORS configuration
- [x] Error handling middleware
- [x] Health check endpoint

### Database Models
- [x] User model (with password hashing)
- [x] Skill model
- [x] Task model
- [x] CommunityPost model

### Authentication
- [x] JWT utility functions
- [x] Auth middleware for protected routes
- [x] Auth controller with signup/login/logout logic
- [x] Auth routes

### Route Placeholders
- [x] Auth routes (implemented)
- [x] Skill routes (placeholder)
- [x] Task routes (placeholder)
- [x] Community routes (placeholder)
- [x] User routes (placeholder)

### Documentation
- [x] Comprehensive MERN_STRUCTURE.md
- [x] This setup checklist

---

## 📋 Next Steps to Complete

### 1. Install Dependencies
```bash
npm install
npm install --workspace=client
npm install --workspace=server
```

### 2. MongoDB Setup
- [ ] Install MongoDB locally OR
- [ ] Create MongoDB Atlas cluster
- [ ] Update MONGODB_URI in `.env.local` (server folder)

### 3. Implement Backend Controllers
- [ ] Skills controller (getAllSkills, getSkillById, createSkill, etc.)
- [ ] Tasks controller (CRUD operations)
- [ ] Community controller (CRUD operations)
- [ ] Users controller (getAll, getById, updateProfile)
- [ ] Update route files to use controllers

### 4. Update Frontend Pages
- [ ] Update Login.tsx to use new auth API
- [ ] Update Signup.tsx to use new auth API
- [ ] Connect pages to API endpoints using React Query
- [ ] Add loading states and error handling
- [ ] Remove Firebase references

### 5. Middleware & Validation
- [ ] Add input validation middleware (express-validator)
- [ ] Add request logging middleware
- [ ] Add rate limiting middleware

### 6. Frontend Components
- [ ] Update all pages to fetch data from backend
- [ ] Add React Query hooks for data fetching
- [ ] Implement proper error boundaries
- [ ] Add loading skeletons

### 7. Environment Setup
- [ ] Create `.env.local` files (copy from `.env.example`)
- [ ] Set JWT_SECRET to secure random string
- [ ] Verify MONGODB_URI is correct
- [ ] Test CORS configuration

### 8. Testing
- [ ] Test signup endpoint
- [ ] Test login endpoint
- [ ] Test JWT token generation
- [ ] Test protected routes
- [ ] Test 401 redirect on token expiry

---

## 🚀 Running the Project

### Development Mode
```bash
# From root folder - starts both frontend and backend
npm run dev

# Or separately:
npm run client      # Frontend only
npm run server      # Backend only
```

### Building
```bash
npm run build
```

---

## 📁 Current Folder Structure

```
skill-share-hub/
├── client/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── api.ts              ✅ Created
│   │   │   ├── apiEndpoints.ts     ✅ Created
│   │   │   └── authUtils.ts        ✅ Created
│   │   ├── hooks/
│   │   │   └── useAuth.ts          ✅ Updated
│   │   ├── pages/
│   │   ├── components/
│   │   └── ...
│   ├── .env.example                ✅ Created
│   ├── .env.local                  ✅ Created
│   ├── package.json                ✅ Updated
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js             ✅ Created
│   │   │   ├── Skill.js            ✅ Created
│   │   │   ├── Task.js             ✅ Created
│   │   │   └── CommunityPost.js    ✅ Created
│   │   ├── controllers/
│   │   │   └── authController.js   ✅ Created
│   │   ├── routes/
│   │   │   ├── authRoutes.js       ✅ Created
│   │   │   ├── skillRoutes.js      ✅ Created
│   │   │   ├── taskRoutes.js       ✅ Created
│   │   │   ├── communityRoutes.js  ✅ Created
│   │   │   └── userRoutes.js       ✅ Created
│   │   ├── middleware/
│   │   │   └── auth.js             ✅ Created
│   │   ├── utils/
│   │   │   └── tokenUtils.js       ✅ Created
│   │   └── server.js               ✅ Updated
│   ├── .env.example                ✅ Created
│   ├── .env.local                  ✅ Created
│   ├── package.json                ✅ Created
│   └── ...
│
├── package.json                    ✅ Updated (monorepo)
├── MERN_STRUCTURE.md               ✅ Created
└── SETUP_CHECKLIST.md              ✅ Created
```

---

## 🔑 Key Integration Points

### Frontend → Backend
- All API calls go through `lib/apiEndpoints.ts`
- JWT token automatically added via axios interceptor
- 401 redirects handled automatically
- Use React Query for data fetching in components

### Example Usage in Components:
```typescript
import { useQuery } from '@tanstack/react-query';
import { skillsAPI } from '@/lib/apiEndpoints';
import { useAuth } from '@/hooks/useAuth';

export function SkillsPage() {
  const { user } = useAuth();
  
  const { data: skills, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: skillsAPI.getAll,
    enabled: !!user, // Only fetch if user is logged in
  });

  if (isLoading) return <LoadingSpinner />;

  return <div>{/* Render skills */}</div>;
}
```

---

## 🔐 Security Notes

- [x] JWT tokens stored in localStorage (production: use httpOnly cookies)
- [x] Passwords hashed with bcryptjs
- [x] Environment variables for sensitive data
- [ ] Add rate limiting for auth endpoints
- [ ] Add CSRF protection
- [ ] Add helmet for security headers
- [ ] Implement refresh token strategy

---

## 📚 Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Query Docs](https://tanstack.com/query/latest)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Status**: 🟢 Ready for implementation phase

Last updated: 2024

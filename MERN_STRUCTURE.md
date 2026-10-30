# Skill Share Hub - MERN Stack Project

A full-stack MERN (MongoDB, Express, React, Node.js) project for skill sharing and learning.

## Project Structure

```
skill-share-hub/
├── client/                 # React Frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks (useAuth, etc.)
│   │   ├── lib/            # Utilities and API integration
│   │   │   ├── api.ts      # Axios instance with interceptors
│   │   │   ├── apiEndpoints.ts  # API service functions
│   │   │   └── authUtils.ts     # Auth utilities
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # Entry point
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.ts      # Vite configuration
│   ├── .env.example        # Example environment variables
│   └── .gitignore
│
├── server/                 # Express Backend (Node.js)
│   ├── src/
│   │   ├── models/         # MongoDB schemas and models
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware (auth, validation, etc.)
│   │   ├── config/         # Configuration files
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Express app setup and server start
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Example environment variables
│   └── .gitignore
│
├── package.json            # Root monorepo configuration
├── .gitignore
└── README.md
```

## Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Reusable UI components
- **React Router** - Client-side routing
- **React Query (@tanstack/react-query)** - Server state management
- **Zustand** - Client state management
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variables

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas connection)

### Installation

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install client dependencies:**
   ```bash
   npm install --workspace=client
   ```

3. **Install server dependencies:**
   ```bash
   npm install --workspace=server
   ```

### Environment Setup

1. **Frontend (.env.local in client folder):**
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_APP_NAME=Skill Share Hub
   ```

2. **Backend (.env.local in server folder):**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/skill-share-hub
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:8080
   ```

### Running the Project

**Development mode (both frontend and backend):**
```bash
npm run dev
```

**Frontend only:**
```bash
npm run client
```

**Backend only:**
```bash
npm run server
```

**Build for production:**
```bash
npm run build
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Skills (To be implemented)
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Tasks (To be implemented)
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Community (To be implemented)
- `GET /api/community` - Get community posts
- `GET /api/community/:id` - Get community post by ID
- `POST /api/community` - Create community post

### Users (To be implemented)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

## Frontend Integration

### Using API in Components

Example of using the API endpoints in a React component:

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { authAPI } from '@/lib/apiEndpoints';
import { useAuth } from '@/hooks/useAuth';

export function ProfileComponent() {
  const { user } = useAuth();
  
  // Fetch user profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => authAPI.getProfile(),
    enabled: !!user,
  });

  // Update profile mutation
  const updateMutation = useMutation({
    mutationFn: (data) => authAPI.updateProfile(data),
    onSuccess: () => {
      // Refetch profile after update
      queryClient.invalidateQueries(['profile']);
    },
  });

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

## Key Features

### Authentication Flow
1. User signs up/logs in through frontend forms
2. Backend validates credentials and returns JWT token
3. Token is stored in localStorage via `authUtils`
4. API interceptors automatically add token to requests
5. Unauthorized requests (401) trigger redirect to login

### API Integration
- Centralized API configuration in `lib/api.ts`
- Request/response interceptors for auth token handling
- Error handling and automatic 401 redirect
- TypeScript types for all API responses

### State Management
- **Zustand** for auth state and simple state
- **React Query** for server state and caching
- **React Router** for client-side navigation

## Next Steps

1. **Implement Backend Routes:**
   - Auth routes (signup, login, logout)
   - Skills CRUD endpoints
   - Tasks CRUD endpoints
   - Community endpoints
   - User profile endpoints

2. **Implement MongoDB Models:**
   - User schema
   - Skill schema
   - Task schema
   - Community post schema

3. **Frontend Features:**
   - Update Login/Signup pages to use new auth
   - Connect existing pages to API endpoints
   - Add error handling and loading states
   - Implement data fetching with React Query

4. **Security:**
   - Add input validation
   - Implement rate limiting
   - Add CSRF protection
   - Set secure CORS headers

## Development Guide

### Adding a New API Endpoint

1. **Backend:**
   ```javascript
   // server/src/routes/example.js
   import express from 'express';
   const router = express.Router();

   router.get('/', (req, res) => {
     res.json({ message: 'Example endpoint' });
   });

   export default router;
   ```

2. **Frontend:**
   ```typescript
   // client/src/lib/apiEndpoints.ts
   export const exampleAPI = {
     getAll: async () => {
       const response = await api.get('/example');
       return response.data;
     },
   };
   ```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

MIT License - feel free to use this project for learning and development.

## Support

For questions and support, please open an issue on the GitHub repository.

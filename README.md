# SkillNest

SkillNest is a student-focused platform for learning, teaching, and exchanging skills. It includes a React and TypeScript frontend and an Express/MongoDB backend.

## Requirements

- Node.js and npm
- MongoDB for backend features

## Getting started

1. Install dependencies from the repository root:

   ```sh
   npm install
   ```

2. Copy `client/.env.example` to `client/.env.local` and `server/.env.example` to `server/.env.local`, then configure the values for your environment.

3. Start the frontend:

   ```sh
   npm run client
   ```

4. In a separate terminal, start the backend:

   ```sh
   npm run server
   ```

## Build

Build the frontend from the repository root with:

```sh
npx vite build
```

## Project structure

- `src/` - React application
- `client/` - frontend API helpers and client package configuration
- `server/` - Express API, MongoDB models, routes, and middleware
- `public/` - static assets

See [MERN_STRUCTURE.md](./MERN_STRUCTURE.md), [QUICK_START.md](./QUICK_START.md), and [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) for additional project documentation.

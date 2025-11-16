# Frontend - React Application

This is the frontend React application for the COMP229 Assignment 3 Portfolio project.

## Tech Stack
- React 18.3
- React Router 6.28
- Vite 7.1.7

## Development

### Start Development Server
```bash
npm run dev
```
Server runs on: http://localhost:5174

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Key Components

- **Home.jsx** - Landing page
- **SignIn.jsx / SignUp.jsx** - Authentication pages
- **ProjectsList.jsx** - Display all projects with CRUD for admin
- **QualificationsList.jsx** - Display qualifications with CRUD for admin
- **ContactsList.jsx** - Admin view of contact submissions
- **Navigation.jsx** - Main navigation with role-based menu items

## API Integration

All API calls are in the `src/api/` folder:
- `api-auth.js` - Authentication endpoints
- `api-user.js` - User management
- `api-project.js` - Projects CRUD
- `api-qualification.js` - Qualifications CRUD
- `api-contact.js` - Contact form submission

## Authentication

JWT tokens are stored in `sessionStorage` via `auth-helper.js`

Protected routes use `PrivateRoute.jsx` component to check authentication before rendering.

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

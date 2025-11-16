# 📚 COMP229 Assignment 3 - Full Stack Portfolio Application

## 🎯 Project Overview

A complete MERN stack portfolio application with authentication, role-based access control, and full CRUD operations for managing contacts, projects, and qualifications/education.

### Technologies Used
- **Frontend:** React.js with React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Build Tool:** Vite

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB running
- Git

### Installation

1. **Install dependencies:**
   ```powershell
   cd client
   npm install
   ```

2. **Create Admin User** (see ADMIN_SETUP.md for details)

3. **Start Application:**
   ```powershell
   cd client
   npm run dev
   ```

4. **Access Application:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

---

## 🔐 Default Credentials

**Admin Account:**
- Email: `admin@portfolio.com`
- Password: (set during setup)

---

## ✨ Features

### Authentication
- ✅ User Sign Up / Sign In
- ✅ JWT token-based authentication
- ✅ Protected routes
- ✅ Session management

### Role-Based Access
- **Admin:** Full CRUD on all entities
- **User:** Read-only access

### CRUD Operations
- **Contacts:** Submit forms, Admin can manage
- **Projects:** Full CRUD for Admin
- **Qualifications:** Full CRUD for Admin

---

## 📁 Key Files

```
client/src/
├── api/              # API integration
├── auth/             # Authentication logic
├── components/       # React components
│   ├── SignIn.jsx
│   ├── SignUp.jsx
│   ├── ProjectForm.jsx
│   ├── QualificationForm.jsx
│   └── ...
└── MainRouter.jsx    # All routes

server/
├── controllers/      # Business logic
├── models/          # Database schemas
├── routes/          # API endpoints
└── express.js       # Express config
```

---

## 📚 Documentation

- **QUICKSTART.md** - 5-minute setup guide
- **ASSIGNMENT3_GUIDE.md** - Complete implementation details
- **IMPLEMENTATION_SUMMARY.md** - What was built
- **ADMIN_SETUP.md** - Admin user setup

---

## 🧪 Testing

1. Sign up a new user
2. Test user (read-only) access
3. Sign in as admin
4. Test CRUD operations
5. See ASSIGNMENT3_GUIDE.md for detailed tests

---

## 📱 API Endpoints

### Authentication
- `POST /api/auth/signin` - Sign in
- `GET /api/auth/signout` - Sign out

### Projects
- `GET /api/projects` - List all
- `POST /api/projects` - Create (Admin)
- `PUT /api/projects/:id` - Update (Admin)
- `DELETE /api/projects/:id` - Delete (Admin)

### Qualifications
- `GET /api/qualifications` - List all
- `POST /api/qualifications` - Create (Admin)
- `PUT /api/qualifications/:id` - Update (Admin)
- `DELETE /api/qualifications/:id` - Delete (Admin)

### Contacts
- `POST /api/contacts` - Submit (Public)
- `GET /api/contacts` - List (Admin)
- `DELETE /api/contacts/:id` - Delete (Admin)

---

## 🎓 Assignment Requirements

### Part I - Backend Auth ✅
- JWT authentication
- Protected routes
- Signin/signout

### Part II - Frontend ✅
- React forms with state management
- API integration
- CRUD operations
- Role-based access control

### Part III - Integration ✅
- Full stack functionality
- Data persistence
- Error-free operation

---

## 👨‍💻 Author

**COMP229 - Web Application Development**
- Assignment 3
- Due: July 19, 2025

---

## 📞 Support

Check documentation files:
- QUICKSTART.md for fast setup
- ASSIGNMENT3_GUIDE.md for complete guide
- ADMIN_SETUP.md for admin user creation

---

**Status:** ✅ Complete and ready for submission

**For detailed information, see ASSIGNMENT3_GUIDE.md**
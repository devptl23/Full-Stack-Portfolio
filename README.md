# COMP229 Assignment 3 - Full Stack Portfolio Application

**Student Name:** [Your Name]  
**Student ID:** [Your ID]  
**Course:** COMP229 - Web Application Development  
**Submission Date:** November 16, 2025  

---

## 📋 Assignment Overview

This is a complete MERN stack portfolio application implementing authentication, role-based access control, and full CRUD operations for managing portfolio content (Contacts, Projects, and Education/Qualifications).

---

## 🛠️ Technologies Used

| Category | Technology |
|----------|------------|
| **Frontend** | React.js 18.3, React Router 6.28 |
| **Backend** | Node.js v24.11.1, Express.js 4.21 |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) |
| **Build Tool** | Vite 7.1.7 |
| **Version Control** | Git & GitHub |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB running locally or cloud instance
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/devptl23/Full-Stack-Portfolio.git
cd Full-Stack-Portfolio
```

### Step 2: Install Backend Dependencies
```bash
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### Step 4: Configure Database
Create `config/config.js` with your MongoDB connection string:
```javascript
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'
};
export default config;
```

### Step 5: Create Admin User
```bash
node create-admin.js
```
This creates an admin account with:
- **Email:** `admin@portfolio.com`
- **Password:** `admin123`

### Step 6: Start Backend Server
```bash
npm run dev
```
Backend runs on **http://localhost:3000**

### Step 7: Start Frontend (New Terminal)
```bash
cd client
npm run dev
```
Frontend runs on **http://localhost:5174**

---

## 🔐 Test Credentials

### Admin Account (Full CRUD Access)
- **Email:** `admin@portfolio.com`
- **Password:** `admin123`

### Regular User Account (Read-Only)
Create via Sign Up page - any email/password will work as a regular user.

---

## ✨ Key Features Implemented

### 1. Authentication System
- ✅ User Registration (Sign Up)
- ✅ User Login (Sign In)
- ✅ JWT Token-based Authentication
- ✅ Secure Password Hashing (bcrypt)
- ✅ Protected Routes

### 2. Role-Based Access Control
- ✅ **Admin Role:** Full CRUD operations (Create, Read, Update, Delete)
- ✅ **User Role:** Read-only access to public content
- ✅ Admin identified by hardcoded email: `admin@portfolio.com`
- ✅ Conditional UI rendering based on user role

### 3. CRUD Operations

#### Projects Management
- ✅ **Create:** Admin can add new projects
- ✅ **Read:** All users can view projects list
- ✅ **Update:** Admin can edit existing projects
- ✅ **Delete:** Admin can remove projects

#### Education/Qualifications Management
- ✅ **Create:** Admin can add qualifications
- ✅ **Read:** All users can view qualifications list
- ✅ **Update:** Admin can edit qualifications
- ✅ **Delete:** Admin can remove qualifications

#### Contacts Management
- ✅ **Create:** Any visitor can submit contact form
- ✅ **Read:** Admin can view all submitted contacts
- ✅ **Delete:** Admin can remove contact messages

### 4. User Interface
- ✅ Responsive navigation bar
- ✅ Home page with portfolio introduction
- ✅ About page
- ✅ Services page
- ✅ Projects showcase page
- ✅ Contact form
- ✅ Admin indicators in UI (green buttons, labels)

---

## 📁 Project Structure

```
MyPortfolio/
├── client/                      # React Frontend
│   ├── public/
│   │   └── assets/             # Images, icons
│   ├── src/
│   │   ├── api/                # API integration files
│   │   │   ├── api-auth.js
│   │   │   ├── api-contact.js
│   │   │   ├── api-project.js
│   │   │   ├── api-qualification.js
│   │   │   └── api-user.js
│   │   ├── auth/               # Authentication
│   │   │   ├── auth-helper.js
│   │   │   └── PrivateRoute.jsx
│   │   ├── components/         # React Components
│   │   │   ├── Home.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── ProjectsList.jsx
│   │   │   ├── ProjectForm.jsx
│   │   │   ├── QualificationsList.jsx
│   │   │   ├── QualificationForm.jsx
│   │   │   └── ContactsList.jsx
│   │   ├── about.jsx
│   │   ├── contact.jsx
│   │   ├── services.jsx
│   │   ├── projects.jsx
│   │   ├── MainRouter.jsx      # All routes defined
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js          # Proxy configuration
├── server/                      # Express Backend
│   ├── controllers/            # Business logic
│   │   ├── auth.controller.js
│   │   ├── contact.controller.js
│   │   ├── education.controller.js
│   │   ├── project.controller.js
│   │   └── user.controller.js
│   ├── models/                 # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── contact.model.js
│   │   ├── project.model.js
│   │   └── education.model.js
│   ├── routes/                 # API endpoints
│   │   ├── auth.routes.js
│   │   ├── contact.routes.js
│   │   ├── project.routes.js
│   │   ├── education.routes.js
│   │   └── user.routes.js
│   ├── helpers/
│   │   └── dbErrorHandler.js
│   └── express.js              # Express configuration
├── config/
│   └── config.js               # Database & JWT config
├── create-admin.js             # Admin user setup script
├── server.js                   # Backend entry point
├── package.json
└── README.md                   # This file
```

---

## � API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Users
- `POST /api/users` - Register new user
- `GET /api/users` - List all users (protected)
- `GET /api/users/:userId` - Get user by ID (protected)

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:projectId` - Update project (protected)
- `DELETE /api/projects/:projectId` - Delete project (protected)

### Qualifications
- `GET /api/qualifications` - List all qualifications
- `POST /api/qualifications` - Create qualification (protected)
- `PUT /api/qualifications/:qualificationId` - Update qualification (protected)
- `DELETE /api/qualifications/:qualificationId` - Delete qualification (protected)

### Contacts
- `GET /api/contacts` - List all contacts (protected)
- `POST /api/contacts` - Submit contact form
- `DELETE /api/contacts/:contactId` - Delete contact (protected)

---

## 🎯 Assignment Requirements Checklist

### Backend (Express.js & MongoDB)
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ User authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ CRUD operations for multiple entities
- ✅ Error handling middleware
- ✅ Database connection management

### Frontend (React.js)
- ✅ React 18 with functional components
- ✅ React Router for navigation
- ✅ Protected routes implementation
- ✅ API integration with fetch
- ✅ Form handling with controlled components
- ✅ Conditional rendering based on authentication
- ✅ Role-based UI elements

### Authentication & Authorization
- ✅ User registration functionality
- ✅ User login with JWT tokens
- ✅ Token storage in sessionStorage
- ✅ Role-based access control (Admin vs User)
- ✅ Protected routes requiring authentication

### CRUD Operations
- ✅ Create operations (Projects, Qualifications, Contacts)
- ✅ Read operations (List and view all entities)
- ✅ Update operations (Edit Projects, Qualifications)
- ✅ Delete operations (Remove all entities)

### Code Quality
- ✅ Clean, organized code structure
- ✅ Proper file organization
- ✅ ES6+ syntax
- ✅ Error handling
- ✅ Responsive design

---

## 📸 Screenshots Required for Submission

Include these screenshots in your Word document:

1. **Sign Up Page** - Registration form
2. **Sign In Page** - Login form
3. **Home Page** - Landing page
4. **Projects Page (Admin View)** - With green "Add Project" button visible
5. **Projects Page (User View)** - Without Add button
6. **Project Form** - Add/Edit project interface
7. **Qualifications Page (Admin View)** - With green "Add Qualification" button
8. **Qualifications Page (User View)** - Read-only view
9. **Qualification Form** - Add/Edit qualification interface
10. **Contact Form** - Contact submission page
11. **Contact Messages (Admin View)** - Admin viewing submitted contacts
12. **Navigation Bar (Admin)** - Showing "Admin" label
13. **Navigation Bar (User)** - Regular user navigation
14. **MainRouter.jsx Code** - Showing route definitions
15. **ProjectsList.jsx Code** - Showing admin check logic
16. **Terminal - Backend Running** - Server started on port 3000
17. **Terminal - Frontend Running** - Vite dev server on port 5174
18. **MongoDB Compass** - Database collections (users, projects, qualifications, contacts)
19. **GitHub Repository** - Repository homepage
20. **GitHub Commits** - Commit history page

---

## 🔗 GitHub Repository

**Repository URL:** https://github.com/devptl23/Full-Stack-Portfolio

---

## 📝 Submission Checklist

Before submitting, ensure you have:

- ✅ Removed all `node_modules` folders
- ✅ Created Word document with all screenshots
- ✅ Added captions to each screenshot explaining what it shows
- ✅ Included GitHub repository link in document
- ✅ Zipped the MyPortfolio folder
- ✅ Verified all features work correctly
- ✅ Tested with both admin and regular user accounts

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if MongoDB is running
# On Windows: Check Services for MongoDB

# Verify Node.js version
node --version  # Should be v14+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend won't start
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Can't see admin buttons
- Verify you're logged in as `admin@portfolio.com`
- Check browser console for errors
- Clear sessionStorage and login again

### Database connection error
- Ensure MongoDB is running
- Check `config/config.js` has correct connection string
- Verify database name matches

---

## 📧 Contact

For questions about this submission:
- **Student:** [Your Name]
- **Email:** [Your Email]
- **GitHub:** https://github.com/devptl23

---

## 📄 License

This project is submitted as part of COMP229 coursework at Centennial College.

---

**End of README**

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
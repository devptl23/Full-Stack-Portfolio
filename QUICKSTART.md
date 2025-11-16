# 🚀 Quick Start Guide - COMP229 Assignment 3

This is a 5-minute quick start guide to get your application running.

---

## ⚡ Fast Setup (First Time)

### 1. Install Dependencies (5 minutes)

```powershell
# Navigate to project root
cd C:\Users\Dev\Desktop\MyPortfolio\MyPortfolio

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Verify MongoDB is Running

**Windows:**
- Press `Win + R`
- Type `services.msc` and press Enter
- Find "MongoDB" in the list
- Ensure Status is "Running"

**Alternative:** Check if MongoDB is accessible
```powershell
mongo --version
# or
mongod --version
```

### 3. Create Admin User (30 seconds)

```powershell
# From project root
node create-admin.js
```

**Output should show:**
```
Admin user created successfully:
Email: admin@portfolio.com
Password: admin123
```

---

## 🎮 Running the Application (Every Time)

### Method 1: Two Terminals (Recommended)

**Terminal 1 - Backend:**
```powershell
cd C:\Users\Dev\Desktop\MyPortfolio\MyPortfolio
npm run dev
```
✅ Backend running on: **http://localhost:3000**

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\Dev\Desktop\MyPortfolio\MyPortfolio\client
npm run dev
```
✅ Frontend running on: **http://localhost:5174**

### Method 2: One Terminal with Background Process

```powershell
# Start backend in background
cd C:\Users\Dev\Desktop\MyPortfolio\MyPortfolio
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

# Start frontend
cd client
npm run dev
```

---

## 🔐 Test Credentials

### Admin Account (Full Access)
- **Email:** `admin@portfolio.com`
- **Password:** `admin123`
- **Can:** Create, Edit, Delete all content

### Regular User Account
- **Create via:** Sign Up page
- **Example:** `user@example.com` / `password123`
- **Can:** View content only (read-only)

---

## 🧪 Quick Test (2 minutes)

1. **Open Browser:** http://localhost:5174

2. **Sign In as Admin:**
   - Click "Sign In"
   - Email: `admin@portfolio.com`
   - Password: `admin123`
   - Click "Sign In"

3. **Verify Admin Access:**
   - Go to "Projects" page
   - **You should see:** Green "Add Project" button
   - Go to "Education" page
   - **You should see:** Green "Add Qualification" button

4. **Test CRUD:**
   - Click "Add Project"
   - Fill in form
   - Click "Submit"
   - Verify project appears in list

5. **Sign Out and Test User View:**
   - Click "Sign Out"
   - Click "Sign Up" to create regular user
   - Sign in with new account
   - Go to "Projects" page
   - **You should NOT see:** Add Project button (read-only)

---

## 🐛 Troubleshooting

### Backend won't start

**Error:** `Cannot find module`
```powershell
# Reinstall dependencies
cd C:\Users\Dev\Desktop\MyPortfolio\MyPortfolio
Remove-Item node_modules -Recurse -Force
npm install
```

**Error:** `Unable to connect to database`
```powershell
# Check if MongoDB is running
# Start MongoDB service in Services (services.msc)
```

**Error:** `Port 3000 is already in use`
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
# Note the PID (last column)
taskkill /PID [PID] /F
```

### Frontend won't start

**Error:** `Port 5174 is already in use`
```powershell
# Kill process on port 5174
netstat -ano | findstr :5174
taskkill /PID [PID] /F
```

**Error:** `Failed to fetch`
- Verify backend is running on port 3000
- Check `client/vite.config.js` has proxy configuration

### Can't see Admin buttons

**Problem:** Logged in but no green buttons visible

**Solution:**
1. Open browser console (F12)
2. Go to Application tab
3. Find sessionStorage
4. Clear all items
5. Sign in again with `admin@portfolio.com`

### Database Issues

**Error:** `Admin user creation failed`
```powershell
# Manually recreate admin
node create-admin.js
```

**Problem:** No data showing in lists

**Solution:**
1. Sign in as admin
2. Manually add 2-3 projects
3. Add 2-3 qualifications
4. Submit contact form as guest

---

## 📱 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5174 | Main React application |
| Backend | http://localhost:3000 | Express API server |
| API Docs | http://localhost:3000/api | API endpoints |

---

## 🎯 Common Tasks

### Add Sample Data for Testing

**As Admin, add 3 projects:**
1. Project 1: "E-commerce Website" - "Built with MERN stack"
2. Project 2: "Mobile App" - "React Native application"
3. Project 3: "Dashboard" - "Analytics dashboard"

**As Admin, add 3 qualifications:**
1. "Bachelor of Computer Science" - "Centennial College" - 2024
2. "React Developer Certificate" - "Udemy" - 2023
3. "Full Stack Bootcamp" - "FreeCodeCamp" - 2023

**As Guest, submit 2 contacts:**
1. Name: "John Doe", Email: "john@example.com", Message: "Great portfolio!"
2. Name: "Jane Smith", Email: "jane@example.com", Message: "Interested in hiring"

### Stop All Servers

**Option 1:** Press `Ctrl + C` in each terminal

**Option 2:** Close terminal windows

**Option 3:** Kill processes
```powershell
# Kill backend
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Kill frontend
netstat -ano | findstr :5174
taskkill /PID [PID] /F
```

---

## 🔄 Restart Application

If things get weird, do a full restart:

```powershell
# Stop all terminals (Ctrl + C)

# Clear sessionStorage in browser
# F12 > Application > Storage > Clear

# Start backend
cd C:\Users\Dev\Desktop\MyPortfolio\MyPortfolio
npm run dev

# In new terminal, start frontend
cd C:\Users\Dev\Desktop\MyPortfolio\MyPortfolio\client
npm run dev

# Refresh browser
```

---

## 📋 Daily Workflow

### Before Taking Screenshots:
1. Start backend and frontend
2. Sign in as admin
3. Add sample data (3 projects, 3 qualifications)
4. Submit 2 contact forms
5. Sign out
6. Create regular user account
7. Sign in as regular user
8. Now take screenshots of both views

### After Making Code Changes:
1. Save files
2. Frontend auto-reloads (Vite HMR)
3. Backend: Restart with `Ctrl + C` then `npm run dev`
4. Test changes in browser

---

## ✅ Ready for Submission?

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Admin login works (`admin@portfolio.com`)
- [ ] Regular user can sign up and login
- [ ] Admin sees green buttons
- [ ] Regular user does NOT see green buttons
- [ ] Can create/edit/delete projects as admin
- [ ] Can create/edit/delete qualifications as admin
- [ ] Can submit contact form as guest
- [ ] Data persists in MongoDB

---

## 🆘 Emergency Commands

**Complete Reset:**
```powershell
# Delete everything and start fresh
cd C:\Users\Dev\Desktop\MyPortfolio\MyPortfolio
Remove-Item node_modules -Recurse -Force
Remove-Item client\node_modules -Recurse -Force
Remove-Item package-lock.json -Force
Remove-Item client\package-lock.json -Force

# Reinstall
npm install
cd client
npm install
cd ..

# Recreate admin
node create-admin.js

# Start servers
npm run dev
# New terminal
cd client
npm run dev
```

---

**Need more help?** Check `README.md` for detailed documentation.

**Ready to submit?** See `SUBMISSION_CHECKLIST.md` for submission requirements.

---

**You're all set! 🎉**

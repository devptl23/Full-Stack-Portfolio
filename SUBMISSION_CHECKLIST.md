# 📋 COMP229 Assignment 3 - Submission Checklist

**Student:** [Your Name]  
**Student ID:** [Your ID]  
**Due Date:** November 16, 2025

---

## ✅ Before You Submit

### 1. Test All Features

- [ ] **Sign Up** - Create new user account
- [ ] **Sign In** - Login with regular user
- [ ] **Sign In as Admin** - Login with `admin@portfolio.com` / `admin123`
- [ ] **View Projects (User)** - No green buttons visible
- [ ] **View Projects (Admin)** - Green "Add Project" button visible
- [ ] **Create Project (Admin)** - Click Add, fill form, save successfully
- [ ] **Edit Project (Admin)** - Click Edit on existing project, modify, save
- [ ] **Delete Project (Admin)** - Click Delete, confirm removal
- [ ] **View Qualifications (User)** - Read-only view
- [ ] **View Qualifications (Admin)** - Green "Add Qualification" button visible
- [ ] **Create Qualification (Admin)** - Add new qualification
- [ ] **Edit Qualification (Admin)** - Modify existing qualification
- [ ] **Delete Qualification (Admin)** - Remove qualification
- [ ] **Submit Contact Form** - Fill and submit as visitor
- [ ] **View Contacts (Admin)** - See all submitted messages
- [ ] **Delete Contact (Admin)** - Remove contact message
- [ ] **Sign Out** - Logout successfully
- [ ] **Protected Routes** - Verify redirect to signin when not authenticated

---

## 📸 Take Screenshots (20 Required)

### Authentication (3 screenshots)
- [ ] 1. Sign Up page with form visible
- [ ] 2. Sign In page with login form
- [ ] 3. Navigation bar showing "Welcome, [Name] (Admin)"

### Admin Views (6 screenshots)
- [ ] 4. Projects page (admin) - GREEN "Add Project" button visible
- [ ] 5. Project Form - Add/Edit interface with fields
- [ ] 6. Qualifications page (admin) - GREEN "Add Qualification" button visible
- [ ] 7. Qualification Form - Add/Edit interface
- [ ] 8. Contacts page (admin) - List of submitted messages
- [ ] 9. Admin view showing Edit/Delete buttons on list items

### User Views (3 screenshots)
- [ ] 10. Projects page (regular user) - NO Add button, read-only
- [ ] 11. Qualifications page (regular user) - NO Add button, read-only
- [ ] 12. Navigation bar showing regular user (no "Admin" label)

### Public Pages (2 screenshots)
- [ ] 13. Home page - Landing page
- [ ] 14. Contact Form - Contact submission page

### Code Screenshots (3 screenshots)
- [ ] 15. MainRouter.jsx - Show route definitions
- [ ] 16. ProjectsList.jsx - Show isAdmin check: `jwt.user.email === 'admin@portfolio.com'`
- [ ] 17. Folder structure - Show client/src/ and server/ folders

### Infrastructure (3 screenshots)
- [ ] 18. Terminal - Backend running on port 3000
- [ ] 19. Terminal - Frontend running on port 5174
- [ ] 20. MongoDB - Database collections (users, projects, qualifications, contacts)

### GitHub (2 screenshots)
- [ ] 21. GitHub repository homepage
- [ ] 22. GitHub commits page showing your commits

---

## 📝 Create Word Document

### Document Structure
1. **Title Page**
   - [ ] Assignment title: "COMP229 Assignment 3 - Full Stack Portfolio"
   - [ ] Your full name
   - [ ] Your student ID
   - [ ] Course code: COMP229
   - [ ] Submission date: November 16, 2025

2. **Table of Contents**
   - [ ] List all sections

3. **Introduction**
   - [ ] Brief description of the application
   - [ ] Technologies used (MERN stack)
   - [ ] Features implemented

4. **Screenshots Section**
   - [ ] All 20+ screenshots
   - [ ] Each screenshot has a caption explaining what it shows
   - [ ] Screenshots are clear and readable

5. **Features Description**
   - [ ] Authentication system
   - [ ] Role-based access control
   - [ ] CRUD operations for Projects
   - [ ] CRUD operations for Qualifications
   - [ ] Contact form management

6. **GitHub Repository**
   - [ ] Link: https://github.com/devptl23/Full-Stack-Portfolio
   - [ ] Brief explanation of commit history

7. **Conclusion**
   - [ ] Summary of implementation
   - [ ] Reflection on assignment

---

## 🗜️ Prepare Submission Package

### Step 1: Clean Up Project
```powershell
# Remove node_modules from root
cd C:\Users\Dev\Desktop\MyPortfolio\MyPortfolio
Remove-Item -Path node_modules -Recurse -Force -ErrorAction SilentlyContinue

# Remove node_modules from client
cd client
Remove-Item -Path node_modules -Recurse -Force -ErrorAction SilentlyContinue
cd ..
```

- [ ] Deleted `node_modules` folder in root
- [ ] Deleted `node_modules` folder in client
- [ ] Kept all source code files
- [ ] Kept package.json and package-lock.json files

### Step 2: Verify Files
- [ ] README.md is updated with your details
- [ ] create-admin.js exists
- [ ] All component files are present
- [ ] All API files are present
- [ ] All model files are present
- [ ] All route files are present

### Step 3: Create ZIP File
```powershell
# Create ZIP file
Compress-Archive -Path "C:\Users\Dev\Desktop\MyPortfolio\MyPortfolio" -DestinationPath "C:\Users\Dev\Desktop\STUDENTID_Assignment3.zip"
```

- [ ] Created ZIP file named: `[YourStudentID]_Assignment3.zip`
- [ ] ZIP includes entire MyPortfolio folder
- [ ] ZIP does NOT include node_modules (should be small, <10MB)

---

## 📤 Final Submission

### Submit These Files:
1. [ ] **ZIP file** - Your project folder (without node_modules)
2. [ ] **Word document** - With all screenshots and descriptions
3. [ ] **GitHub link** - In the Word document

### Verify ZIP Contents:
- [ ] client/ folder
- [ ] server/ folder
- [ ] config/ folder
- [ ] create-admin.js
- [ ] server.js
- [ ] package.json
- [ ] README.md
- [ ] .gitignore

### Double Check Word Document:
- [ ] All 20+ screenshots included
- [ ] Each screenshot has clear caption
- [ ] GitHub repository link is clickable
- [ ] Your name and student ID on title page
- [ ] No spelling errors
- [ ] Professional formatting

---

## 🎓 Grading Criteria (Estimated)

### Backend (25%)
- ✅ Express.js server setup
- ✅ MongoDB connection
- ✅ RESTful API endpoints
- ✅ Authentication with JWT
- ✅ CRUD operations

### Frontend (25%)
- ✅ React components
- ✅ React Router navigation
- ✅ API integration
- ✅ Form handling
- ✅ Conditional rendering

### Authentication (15%)
- ✅ User registration
- ✅ User login
- ✅ Protected routes
- ✅ Role-based access

### CRUD Operations (20%)
- ✅ Projects CRUD
- ✅ Qualifications CRUD
- ✅ Contacts management

### Code Quality (10%)
- ✅ Clean code structure
- ✅ Proper organization
- ✅ Error handling
- ✅ Comments where needed

### Documentation (5%)
- ✅ README with instructions
- ✅ Screenshots in Word doc
- ✅ Clear explanations

---

## 🚨 Common Mistakes to Avoid

- ❌ Submitting with node_modules folder (huge file size)
- ❌ Screenshots too small or blurry
- ❌ Missing admin vs user comparison screenshots
- ❌ Forgetting to show code files
- ❌ No GitHub link in document
- ❌ Not testing all features before submission
- ❌ Missing student name/ID on document
- ❌ Submitting without removing console.log statements

---

## ✨ Bonus Points

Consider adding these to impress:
- [ ] Clean, professional UI design
- [ ] Responsive layout (works on mobile)
- [ ] Loading states for API calls
- [ ] Error messages for failed operations
- [ ] Confirmation dialogs for delete operations
- [ ] Form validation feedback

---

## 📞 Need Help?

If you encounter issues:
1. Check README.md for setup instructions
2. Verify MongoDB is running
3. Check terminal for error messages
4. Clear browser cache and sessionStorage
5. Reinstall node_modules if needed

---

**Good luck with your submission! 🎉**

---

## Sign-off

- [ ] I have tested all features
- [ ] I have taken all required screenshots
- [ ] I have created the Word document
- [ ] I have cleaned up the project folder
- [ ] I have created the ZIP file
- [ ] I am ready to submit

**Date Completed:** _______________

**Signature:** _______________

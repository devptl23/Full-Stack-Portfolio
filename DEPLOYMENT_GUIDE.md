# Cloud Deployment Guide - Assignment 4 Part III

## Overview

This guide walks you through deploying your Full Stack Portfolio Application to cloud services.

**Deployment Architecture:**
- **Database:** MongoDB Atlas (Cloud Database)
- **Backend:** Render (Node.js/Express API)
- **Frontend:** Vercel or Render (React Static Site)

---

## Part 1: MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email or Google account
3. Complete the registration

### Step 2: Create a Cluster

1. Click "Create" → "Deploy a database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select cloud provider: **AWS**
4. Region: Choose closest to you (e.g., US East)
5.  Cluster Name: `portfolio-cluster` or keep default
6. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Create Database User

1. In left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Authentication Method: **Password**
4. Username: `portfolio_admin`
5. Password: Click "Autogenerate Secure Password" - **SAVE THIS PASSWORD!**
6. Database User Privileges: **Atlas admin**
7. Click "Add User"

### Step 4: Configure Network Access

1. In left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - IP Address: `0.0.0.0/0`
4. Click "Confirm"

> ⚠️ **Note:** In production, restrict to specific IPs

### Step 5: Get Connection String

1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**, Version: **4.1 or later**
5. Copy the connection string:
   ```
   mongodb+srv://portfolio_admin:<password>@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your saved password
7. Replace `myFirstDatabase` with `portfolio`

**Example:**
```
mongodb+srv://portfolio_admin:YourPassword123@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Step 6: Migrate Data (Optional)

If you have local data to migrate:

```bash
# Export from local MongoDB
mongodump --db portfolio --out ./backup

# Import to Atlas
mongorestore --uri "YOUR_ATLAS_CONNECTION_STRING" ./backup/portfolio
```

---

## Part 2: Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

1. **Create `.env` file in root** (for local testing):
```env
MONGODB_URI=your_atlas_connection_string_here
JWT_SECRET=your_secret_key_here
NODE_ENV=production
PORT=3000
```

2. **Ensure `config/config.js` uses environment variables:**
```javascript
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'
};
export default config;
```

3. **Update `package.json` in root:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### Step 2: Deploy to Render

1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure service:

**Service Settings:**
- **Name:** `portfolio-backend` (or your choice)
- **Region:** Oregon (US West) or closest to you
- **Branch:** `main` or `master`
- **Root Directory:** Leave empty (or use `/` if needed)
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free

**Environment Variables:**
Click "Advanced" → "Add Environment Variable":
- `MONGODB_URI`: Your Atlas connection string
- `JWT_SECRET`: Your JWT secret key
- `NODE_ENV`: `production`

6. Click "Create Web Service"
7. Wait for deployment (3-5 minutes)
8. Your backend URL will be: `https://portfolio-backend-xxxx.onrender.com`

### Step 3: Test Backend

1. Visit: `https://your-backend-url.onrender.com/api/projects`
2. Should return JSON (projects list or empty array)
3. Test other endpoints

---

## Part 3: Frontend Deployment

### Option A: Deploy to Vercel (Recommended)

#### Step 1: Prepare Frontend

1. **Update API base URL in client:**

Create `client/.env.production`:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

2. **Update API files** to use environment variable:

Edit each API file (e.g., `client/src/api/api-project.js`):
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const list = async (signal) => {
  try {
    let response = await fetch(`${API_URL}/api/projects`, {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};
```

#### Step 2: Deploy to Vercel

**Method 1: Vercel CLI**
```bash
npm install -g vercel
cd client
vercel --prod
```

**Method 2: Vercel Dashboard**
1. Go to [https://vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

6. Add Environment Variable:
   - `VITE_API_URL`: Your Render backend URL

7. Click "Deploy"
8. Your site will be live at: `https://yourapp.vercel.app`

### Option B: Deploy to Render (Alternative)

1. Go to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect repository
4. Configure:
   - **Name:** `portfolio-frontend`
   - **Branch:** `main`
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

5. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL

6. Deploy

---

## Part 4: Configure CORS

**Important:** Update backend to allow frontend domain.

Edit `server/express.js`:
```javascript
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5174',
  'https://your-frontend-url.vercel.app',  // Add your frontend URL
  'https://your-frontend.onrender.com'     // If using Render
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

**Commit and push changes** - Render will auto-deploy.

---

## Part 5: Verification Checklist

### Test Deployed Application

1. **Homepage:**
   - [ ] Loads without errors
   - [ ] Images display correctly
   - [ ] Navigation works

2. **Authentication:**
   - [ ] Sign Up creates new user
   - [ ] Sign In works
   - [ ] Admin login works (`admin@portfolio.com` / `admin123`)

3. **CRUD Operations:**
   - [ ] View projects list
   - [ ] Admin can create project
   - [ ] Admin can edit project
   - [ ] Admin can delete project
   - [ ] Same for qualifications

4. **Contact Form:**
   - [ ] Form submits successfully
   - [ ] Data appears in database

5. **Role-Based Access:**
   - [ ] Regular users see read-only view
   - [ ] Admin sees all CRUD buttons

### Common Issues & Fixes

**Issue: API calls fail / CORS errors**
- Solution: Check CORS configuration
- Verify frontend has correct `VITE_API_URL`

**Issue: 500 errors on backend**
- Check Render logs: Dashboard → Logs
- Verify MongoDB connection string
- Check all environment variables are set

**Issue: Frontend shows old content**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Redeploy frontend

**Issue: Database connection fails**
- Check MongoDB Atlas IP whitelist
- Verify connection string is correct
- Check database user credentials

---

## Deployment URLs

After successful deployment, you'll have:

1. **Frontend URL:** `https://yourapp.vercel.app` or `https://yourapp.onrender.com`
2. **Backend URL:** `https://portfolio-backend.onrender.com`
3. **Database:** MongoDB Atlas cluster

**Add these URLs to your Word document submission!**

---

## Screenshots Required for Submission

### MongoDB Atlas
1. Cluster overview page
2. Database collections (users, projects, qualifications, contacts)
3. Network access settings

### Render (Backend)
1. Service dashboard
2. Environment variables (hide sensitive values)
3. Deployment logs showing success
4. Service URL

### Vercel/Render (Frontend)
1. Project dashboard
2. Deployment success
3. Environment variables
4. Live URL

### Deployed Application
1. Homepage screenshot
2. Admin logged in (showing admin features)
3. Projects CRUD in action
4. Contact form
5. Browser dev console showing no errors

---

## Performance Tips

1. **Enable Render's CDN** (if using Render for frontend)
2. **Use Vercel's Edge Network** (automatic)
3. **Enable compression** in Express:
   ```javascript
   import compression from 'compression';
   app.use(compression());
   ```

---

## Cost

All services used are **FREE:**
- MongoDB Atlas: M0 tier (512 MB storage)
- Render: Free tier (750 hours/month)
- Vercel: Hobby plan (unlimited sites)

---

**Status:** Configuration files ready  
**Next Step:** Follow this guide to deploy your application

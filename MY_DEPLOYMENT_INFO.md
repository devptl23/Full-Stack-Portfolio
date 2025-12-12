# YOUR DEPLOYMENT CREDENTIALS - DO NOT COMMIT TO GIT!

## MongoDB Atlas (For Assignment 4)

**Recommended Database:** PortfolioBackend

**Connection String:**
```
mongodb+srv://2000devp1_db_user:2U5hPcLoTLvzG5x9@portfoliobackend.oouazub.mongodb.net/?appName=PortfolioBackend
```

**For Backend Environment Variable:**
```
MONGODB_URI=mongodb+srv://2000devp1_db_user:2U5hPcLoTLvzG5x9@portfoliobackend.oouazub.mongodb.net/portfolio?retryWrites=true&w=majority&appName=PortfolioBackend
```

(Note: Added `/portfolio` database name)

---

## Render Backend Deployment

**Step 1:** Go to https://render.com

**Step 2:** Create Web Service from `Full-Stack-Portfolio` repo

**Step 3:** Add these environment variables:

```
MONGODB_URI = mongodb+srv://2000devp1_db_user:2U5hPcLoTLvzG5x9@portfoliobackend.oouazub.mongodb.net/portfolio?retryWrites=true&w=majority&appName=PortfolioBackend

JWT_SECRET = your_strong_secret_key_here_change_this

NODE_ENV = production

PORT = 3000
```

**JWT_SECRET:** Use any strong random string (e.g., `MyPortfolio2024SecretKey!@#$`)

---

## Netlify Frontend Deployment

**Step 1:** Deploy to Netlify from GitHub

**Step 2:** After backend is deployed, get your Render URL (e.g., `https://portfolio-backend-xyz.onrender.com`)

**Step 3:** Add this environment variable in Netlify:

```
VITE_API_URL = https://your-backend-url.onrender.com
```

(Replace with your actual Render backend URL)

---

## Quick Deployment Steps

### 1. Deploy Backend to Render (~30 min)
- Sign up at render.com with GitHub
- Create Web Service
- Copy environment variables from above
- Wait for deployment
- Test: Visit `https://your-backend.onrender.com/api/projects`

### 2. Deploy Frontend to Netlify (~15 min)
- Sign up at netlify.com with GitHub
- Import Full-Stack-Portfolio repo
- Base directory: `client`
- Add `VITE_API_URL` environment variable
- Deploy!

### 3. Update CORS (~5 min)
- Edit `server/express.js`
- Add your Netlify URL to allowed origins
- Push to GitHub (Render auto-redeploys)

---

## Your URLs (Fill in after deployment)

```
Frontend (Netlify): https://__________________.netlify.app
Backend (Render):   https://__________________.onrender.com
GitHub:             https://github.com/devptl23/Full-Stack-Portfolio
```

---

**IMPORTANT:** This file contains sensitive credentials. Do NOT commit to GitHub!

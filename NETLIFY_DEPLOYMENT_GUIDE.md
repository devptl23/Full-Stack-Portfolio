# Netlify Deployment Guide - Portfolio Application

## Overview

This guide walks you through deploying your Full Stack Portfolio Application using:
- **Frontend:** Netlify (React/Vite app)
- **Backend:** Render (Node.js/Express API)
- **Database:** MongoDB Atlas

---

## Prerequisites

Before you start, make sure you have:
- [ ] GitHub account with your repository
- [ ] MongoDB Atlas cluster set up (see main DEPLOYMENT_GUIDE.md)
- [ ] Backend deployed to Render (see main DEPLOYMENT_GUIDE.md)

---

## Part 1: Backend Deployment (Render)

**If you haven't deployed the backend yet, follow these steps:**

### Step 1: Deploy Backend to Render

1. Go to [https://render.com](https://render.com)
2. Sign up/Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository: `Full-Stack-Portfolio`

### Step 2: Configure Backend Service

**Basic Settings:**
- **Name:** `portfolio-backend`
- **Region:** Oregon (US West) or closest
- **Branch:** `main`
- **Root Directory:** `/` (leave empty)
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** Free

### Step 3: Set Environment Variables

Click "Advanced" → Add Environment Variables:

```
MONGODB_URI = mongodb+srv://2000devp1_db_user:2U5hPcLoTLvzG5x9@portfoliobackend.oouazub.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=PortfolioBackend
JWT_SECRET = MyPortfolio2024SecretKey!@#$
NODE_ENV = production
PORT = 3000
```

### Step 4: Deploy


1. Click "Create Web Service"
2. Wait 3-5 minutes for deployment
3. Copy your backend URL: `https://your-backend-name.onrender.com`
4. **Save this URL!** You'll need it for Netlify

### Step 5: Test Backend

Visit: `https://your-backend-name.onrender.com/api/projects`

Should return JSON (empty array or projects list)

---

## Part 2: Frontend Deployment (Netlify)

### Step 1: Prepare Frontend

The `netlify.toml` configuration file has already been created in `/client/` folder.

**Update Frontend to Use Environment Variable:**

You need to update your API files to use the environment variable.

**Example - Update `client/src/api/api-project.js`:**

```javascript
// At the top of the file
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Then use API_URL in all fetch calls
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

**Apply this pattern to ALL API files:**
- `api-auth.js`
- `api-contact.js`
- `api-project.js`
- `api-qualification.js`
- `api-user.js`

### Step 2: Commit Changes

```bash
git add .
git commit -m "Add Netlify configuration and environment variable support"
git push origin main
```

### Step 3: Deploy to Netlify

#### Option 1: Netlify Dashboard (Recommended)

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign up/Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose "Deploy with GitHub"
5. Authorize Netlify to access your GitHub
6. Select your repository: `Full-Stack-Portfolio`

#### Step 4: Configure Build Settings

Netlify should auto-detect settings from `netlify.toml`, but verify:

- **Base directory:** `client`
- **Build command:** `npm run build`
- **Publish directory:** `client/dist`
- **Branch to deploy:** `main`

Click "Show advanced" if you need to modify.

#### Step 5: Set Environment Variables

**IMPORTANT:** Before deploying, set the environment variable.

1. In the site settings (before deploying), click "Site configuration" → "Environment variables"
2. Click "Add a variable" → "Add a single variable"
3. Add:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend-name.onrender.com` (your Render backend URL)
4. Click "Create variable"

#### Step 6: Deploy

1. Click "Deploy [your-site-name]"
2. Watch the deployment process (takes 2-3 minutes)
3. Once complete, you'll get a URL like: `https://amazing-site-name-123456.netlify.app`

#### Option 2: Netlify CLI (Alternative)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from client directory
cd client
netlify deploy

# Follow prompts:
# - Create new site
# - Choose team
# - Site name (optional)
# - Build directory: dist

# For production deployment
netlify deploy --prod
```

If using CLI, set environment variable:
```bash
netlify env:set VITE_API_URL "https://your-backend-name.onrender.com"
```

---

## Part 3: Update Backend CORS

**CRITICAL:** Update your backend to allow requests from Netlify domain.

### Step 1: Update server/express.js

```javascript
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5174',
  'https://your-site-name.netlify.app',  // Add your Netlify URL
  // If using custom domain:
  // 'https://yourportfolio.com'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### Step 2: Commit and Push

```bash
git add server/express.js
git commit -m "Add Netlify URL to CORS allowed origins"
git push origin main
```

Render will automatically redeploy your backend (takes 2-3 minutes).

---

## Part 4: Verify Deployment

### Test Your Deployed Application

1. **Visit your Netlify URL**
2. **Open Browser DevTools** (F12) → Console tab
3. **Test each feature:**
   - [ ] Homepage loads without errors
   - [ ] Navigation works
   - [ ] Sign Up creates new user
   - [ ] Sign In works
   - [ ] Admin login works (`admin@portfolio.com` / `admin123`)
   - [ ] Projects list loads
   - [ ] Admin can create/edit/delete projects
   - [ ] Contact form submits
   - [ ] No CORS errors in console

### Common Issues & Fixes

#### Issue: API calls fail with CORS error
**Solution:**
- Check backend CORS configuration includes Netlify URL
- Verify no typos in allowed origins
- Wait 2-3 minutes for Render to redeploy

#### Issue: 404 errors on page refresh
**Solution:**
- Verify `netlify.toml` has the redirect rule
- Check it's in the `client` folder

#### Issue: Environment variable not working
**Solution:**
- In Netlify dashboard: Site configuration → Environment variables
- Verify `VITE_API_URL` is set correctly
- Redeploy the site (Deploys → Trigger deploy → Clear cache and deploy)

#### Issue: API calls go to localhost
**Solution:**
- Check all API files are using `import.meta.env.VITE_API_URL`
- Rebuild frontend: `npm run build` locally to test
- Redeploy to Netlify

---

## Part 5: Custom Domain (Optional)

### Add Custom Domain

1. Go to Netlify Dashboard → Your site
2. Click "Domain management"
3. Click "Add custom domain"
4. Enter your domain: `yourportfolio.com`
5. Follow instructions to configure DNS

Netlify provides free HTTPS certificates automatically!

---

## Part 6: Continuous Deployment

### Auto-Deploy Setup

Netlify automatically deploys when you push to your connected branch!

**How it works:**
1. You push code to GitHub (`main` branch)
2. Netlify detects the change
3. Runs build command (`npm run build`)
4. Deploys new version automatically
5. Live in 2-3 minutes!

**Verify Auto-Deploy:**
1. Netlify Dashboard → Site settings → Build & deploy
2. Under "Continuous deployment"
3. Should show: "Active" for your main branch

---

## Part 7: Netlify Features

### Helpful Netlify Features

#### Deploy Previews
- Automatic preview deployments for Pull Requests
- Test changes before merging

#### Rollback
- Deploys → Click on any previous deployment → "Publish deploy"
- Instant rollback to any previous version

#### Build Logs
- Deploys → Click on deployment → View logs
- Debug build failures

#### Environment Variables
- Different variables for production/preview/development
- Secure storage of API keys

---

## Quick Reference

### Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | `https://your-site.netlify.app` | Live application |
| **Backend** | `https://your-backend.onrender.com` | API server |
| **Database** | MongoDB Atlas cluster | Data storage |
| **Netlify Dashboard** | `https://app.netlify.com` | Deployment management |
| **Render Dashboard** | `https://dashboard.render.com` | Backend management |

### Environment Variables

**Netlify (Frontend):**
```
VITE_API_URL = https://your-backend.onrender.com
```

**Render (Backend):**
```
MONGODB_URI = mongodb+srv://...
JWT_SECRET = your_secret_key
NODE_ENV = production
```

### Deployment Commands

```bash
# Build frontend locally
cd client
npm run build

# Deploy to Netlify (if using CLI)
netlify deploy --prod

# View deployment logs (CLI)
netlify logs

# Open deployed site
netlify open:site
```

---

## Screenshots for Assignment Submission

### Required Screenshots

**Netlify Setup:**
1. Netlify site dashboard showing deployment
2. Build settings page
3. Environment variables page (hide API URL value is okay)
4. Successful deployment page
5. Site overview with URL

**Netlify Deployment:**
1. Deploy logs showing successful build
2. Build time and status
3. Published URL

**Live Application:**
1. Homepage at Netlify URL
2. Admin logged in (showing admin features)
3. Projects CRUD working
4. Browser console (no errors)

**Build Configuration:**
1. `netlify.toml` file contents
2. Updated API files with environment variable

---

## Troubleshooting

### Build Fails on Netlify

**Check:**
1. Build logs in Netlify dashboard
2. Ensure `package.json` has all dependencies
3. Node version compatibility
4. Build command is correct: `npm run build`

**Common fixes:**
```bash
# Make sure build works locally first
cd client
npm run build

# If successful, push to GitHub
git push origin main
```

### API Calls Not Working

**Checklist:**
- [ ] `VITE_API_URL` environment variable set in Netlify
- [ ] All API files updated to use `import.meta.env.VITE_API_URL`
- [ ] Backend CORS allows Netlify URL
- [ ] Backend is running on Render
- [ ] MongoDB connection string is correct

**Test backend directly:**
```bash
curl https://your-backend.onrender.com/api/projects
```

Should return JSON response.

---

## Performance on Netlify

### Netlify Advantages

✅ **Global CDN** - Fast loading worldwide  
✅ **Automatic HTTPS** - Free SSL certificate  
✅ **Instant rollbacks** - One-click revert  
✅ **Deploy previews** - Test before merging  
✅ **Edge optimization** - Smart caching  

### Performance Tips

1. **Enable asset optimization** (Netlify does this automatically)
2. **Use Netlify Analytics** (optional paid feature)
3. **Monitor Core Web Vitals** with Lighthouse
4. **Leverage browser caching** (already configured in netlify.toml)

---

## Cost

**Everything is FREE!** 🎉

- **Netlify Free Tier:**
  - 100 GB bandwidth/month
  - Unlimited sites
  - Automatic HTTPS
  - Continuous deployment

- **Render Free Tier:**
  - 750 hours/month
  - Auto-sleep after inactivity
  - Wakes on request

- **MongoDB Atlas Free Tier:**
  - 512 MB storage
  - Shared cluster

---

## Summary

### Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Backend deployed to Render with environment variables
- [ ] Backend tested and accessible
- [ ] Frontend API files updated with environment variable
- [ ] `netlify.toml` configuration in place
- [ ] Netlify site created from GitHub
- [ ] `VITE_API_URL` environment variable set in Netlify
- [ ] Frontend deployed successfully
- [ ] Backend CORS updated with Netlify URL
- [ ] Full application tested on live URLs
- [ ] Screenshots captured for submission

### Your URLs

Fill these in after deployment:

```
Frontend (Netlify): https://________________.netlify.app
Backend (Render):   https://________________.onrender.com
GitHub Repo:        https://github.com/devptl23/Full-Stack-Portfolio
```

---

## CI/CD with Netlify

### Automatic Deployment

✅ **Already configured!** When you:
1. Push to GitHub main branch
2. Netlify automatically builds and deploys
3. Live in 2-3 minutes

### For CI/CD Demonstration (Part IV):

1. Create feature branch
2. Make visible changes
3. Push to GitHub
4. Create pull request
5. Netlify creates **deploy preview** automatically!
6. Merge PR
7. Netlify deploys to production
8. Capture screenshots of before/after

**Netlify Deploy Previews** are perfect for Assignment 4 Part IV demonstration!

---

## Need Help?

1. Check Netlify documentation: https://docs.netlify.com
2. Review build logs in Netlify dashboard
3. Test API calls in browser DevTools
4. Verify environment variables are set

---

**Status:** Ready to deploy! Follow this guide step-by-step.  
**Expected Time:** 2-3 hours total  
**Difficulty:** Easy with this guide!

🚀 Good luck with your deployment!

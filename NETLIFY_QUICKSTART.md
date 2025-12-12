# Quick Guide: Deploying to Netlify

## 🚀 FASTEST PATH TO DEPLOYMENT

### Step 1: Update API Files (5 minutes)

You need to update your API files to use environment variables. Here's what to do:

**For EACH file in `client/src/api/` folder, add this at the top:**

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

**Then replace all `http://localhost:3000` with `${API_URL}`**

**Files to update:**
1. `client/src/api/api-auth.js`
2. `client/src/api/api-contact.js`
3. `client/src/api/api-project.js`
4. `client/src/api/api-qualification.js`
5. `client/src/api/api-user.js`

**Example for api-project.js:**

```javascript
// Add at top
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const list = async (signal) => {
  try {
    let response = await fetch(`${API_URL}/api/projects`, {  // Changed from http://localhost:3000
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

const read = async (params, signal) => {
  try {
    let response = await fetch(`${API_URL}/api/projects/` + params.projectId, {  // Changed
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch(err) {
    console.log(err);
  }
};

// Apply same pattern to ALL fetch calls in the file
```

### Step 2: Commit Changes (2 minutes)

```bash
git add .
git commit -m "Add environment variable support for API URLs"
git push origin main
```

### Step 3: Deploy Backend to Render (1 hour)

**If not already deployed:**

1. Go to https://render.com
2. Sign in with GitHub
3. New + → Web Service
4. Connect `Full-Stack-Portfolio` repo
5. Settings:
   - Name: `portfolio-backend`
   - Build: `npm install`
   - Start: `npm start`
   - Add environment variables:
     - `MONGODB_URI` = your Atlas connection string
     - `JWT_SECRET` = any strong random string
     - `NODE_ENV` = production
6. Create Web Service
7. **SAVE YOUR BACKEND URL!** Example: `https://portfolio-backend-abc123.onrender.com`

### Step 4: Deploy Frontend to Netlify (30 minutes)

1. Go to https://app.netlify.com
2. Sign in with GitHub
3. "Add new site" → "Import an existing project"
4. Choose GitHub
5. Select `Full-Stack-Portfolio` repository
6. Settings should auto-fill from `netlify.toml`:
   - Base: `client`
   - Build: `npm run build`
   - Publish: `client/dist`
7. **BEFORE DEPLOYING:** Click "Site configuration" → "Environment variables"
8. Add variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com` (from Step 3)
9. Click "Deploy site"
10. Wait 2-3 minutes
11. **GET YOUR NETLIFY URL!** Example: `https://myportfolio-abc123.netlify.app`

### Step 5: Update CORS (5 minutes)

Edit `server/express.js`:

```javascript
const allowedOrigins = [
  'http://localhost:5174',
  'https://myportfolio-abc123.netlify.app',  // YOUR NETLIFY URL HERE
];
```

Commit and push:
```bash
git add server/express.js
git commit -m "Add Netlify URL to CORS"
git push origin main
```

Render will auto-redeploy in 2-3 minutes.

### Step 6: Test Everything (10 minutes)

Visit your Netlify URL and test:
- [ ] Homepage loads
- [ ] Sign up/sign in works
- [ ] Admin features work
- [ ] Create/edit/delete projects works
- [ ] No console errors (F12 → Console)

---

## 📋 URLs to Submit

After deployment, fill these in:

```
GitHub Repository: https://github.com/devptl23/Full-Stack-Portfolio
Frontend (Netlify): https://________________.netlify.app
Backend (Render):   https://________________.onrender.com
```

---

## 🎯 For CI/CD Demonstration

Netlify has AUTOMATIC deploy previews! When you:

1. Create feature branch
2. Make changes (update homepage text)
3. Push and create Pull Request
4. **Netlify automatically creates a preview deployment!**
5. Merge PR
6. Netlify auto-deploys to production

Perfect for Part IV demonstration! 🎉

---

## ⚠️ Common Issues

**"API calls fail"**
→ Check environment variable `VITE_API_URL` is set in Netlify

**"CORS error"**
→ Make sure Netlify URL is in backend `allowedOrigins`

**"404 on page refresh"**
→ Verify `netlify.toml` is in `client` folder

---

## 📸 Screenshots Needed

1. Netlify dashboard showing your site
2. Environment variables page
3. Successful deployment
4. Live site at Netlify URL
5. Admin features working
6. Browser console (no errors)

---

**Total Time:** ~2 hours  
**Difficulty:** Easy with this guide!

🚀 **Start here:** Update API files → Deploy!

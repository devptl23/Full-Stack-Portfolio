# CI/CD Documentation - Assignment 4 Part IV

## Overview

This document explains the Continuous Integration / Continuous Deployment (CI/CD) pipeline setup for the Portfolio Application.

**CI/CD Tools:**
- **GitHub Actions:** Automated testing and deployment triggers
- **Render:** Auto-deployment from GitHub
- **Vercel:** Auto-deployment from GitHub

---

## CI/CD Workflow

### Workflow File

Location: `.github/workflows/deploy.yml`

### Trigger Events

The workflow runs automatically when:
1. Code is pushed to `main` or `master` branch
2. Pull request is created targeting `main` or `master`

### Workflow Jobs

#### Job 1: Test
- Runs on every push and PR
- Steps:
  1. Checkout code from repository
  2. Setup Node.js environment
  3. Install frontend dependencies
  4. Run unit tests (`npm test`)
  5. Build frontend (`npm run build`)
- **Purpose:** Ensure code quality before deployment

#### Job 2: Deploy Backend
- Runs only on push to main/master (not on PRs)
- **Trigger:** Render's automatic deployment
- Render monitors the repository and deploys automatically

#### Job 3: Deploy Frontend
- Runs only on push to main/master (not on PRs)
- **Trigger:** Vercel's automatic deployment
- Vercel monitors the repository and deploys automatically

---

## Setting Up CI/CD

### Part 1: GitHub Actions Setup

#### Step 1: Push Workflow File

The workflow file is already created at `.github/workflows/deploy.yml`.

```bash
git add .github/workflows/deploy.yml
git commit -m "Add CI/CD workflow"
git push origin main
```

#### Step 2: Verify Workflow

1. Go to your GitHub repository
2. Click "Actions" tab
3. You should see the workflow running
4. Click on the workflow to see details

### Part 2: Configure Render Auto-Deploy

1. Go to Render Dashboard
2. Select your backend service
3. Go to "Settings"
4. Under "Build & Deploy":
   - **Auto-Deploy:** `Yes`
   - **Branch:** `main` or `master`
5. Save changes

**How it works:**
- Every push to main branch triggers automatic deployment
- Render pulls latest code
- Runs build command (`npm install`)
- Restarts service with new code

### Part 3: Configure Vercel Auto-Deploy

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Settings" → "Git"
4. Verify settings:
   - **Production Branch:** `main` or `master`
   - **Auto Deploy:** Enabled
5. **Deploy Hooks** (optional):
   - Can create webhook for manual triggers

**How it works:**
- Every push to main branch triggers automatic deployment
- Vercel pulls latest code
- Runs build command (`npm run build`)
- Deploys new version to CDN

---

## Demonstrating CI/CD (Required for Assignment)

### Step 1: Capture "Before" State

1. Visit your deployed application
2. Take screenshot of homepage showing current content
3. Note the timestamp or add a visible date

### Step 2: Create Feature Branch

```bash
# Create new branch
git checkout -b update-homepage-content

# or

git checkout -b assignment4-demo
```

### Step 3: Make Content Changes

**Option 1: Update Homepage**

Edit `client/src/components/Home.jsx`:
```jsx
<p style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "1rem" }}>
  Mission: To build intelligent, scalable software that solves real-world problems.
  {/* Add new line: */}
  <br />
  <strong>Last Updated: December 2024</strong>
</p>
```

**Option 2: Update About Page**

Edit `client/src/about.jsx`:
```jsx
// Add a new paragraph
<p style={{ marginTop: "1rem", fontStyle: "italic" }}>
  Updated for Assignment 4 - CI/CD Demonstration
</p>
```

**Option 3: Add New Project**

Through the admin interface:
1. Login as admin
2. Go to Projects
3. Add a new project with title "CI/CD Demonstration Project"

### Step 4: Commit Changes

```bash
git add .
git commit -m "Update homepage content for Assignment 4 CI/CD demo"
git push origin update-homepage-content
```

### Step 5: Create Pull Request

1. Go to GitHub repository
2. Click "Pull requests" → "New pull request"
3. Base: `main`, Compare: `update-homepage-content`
4. Click "Create pull request"
5. Add description: "Assignment 4: CI/CD Demonstration"
6. **Take screenshot of Pull Request page**

### Step 6: Check GitHub Actions

1. Go to "Actions" tab
2. Click on the running workflow
3. Watch the test job execute
4. **Take screenshot showing:**
   - Workflow running
   - Tests passing
   - Build successful

### Step 7: Merge Pull Request

1. Return to Pull Request
2. Click "Merge pull request"
3. Click "Confirm merge"
4. **Take screenshot of merge confirmation**

### Step 8: Monitor Deployment

**For Render (Backend):**
1. Go to Render Dashboard
2. Click on backend service
3. Go to "Logs" tab
4. Watch deployment progress
5. **Take screenshot of deployment logs**

**For Vercel (Frontend):**
1. Go to Vercel Dashboard
2. Click on project
3. Go to "Deployments" tab
4. Watch latest deployment
5. **Take screenshot showing:**
   - Deployment in progress
   - Deployment successful

### Step 9: Verify Deployment

1. Wait 2-5 minutes for deployment to complete
2. Visit your deployed URL
3. **Hard refresh** (Ctrl+Shift+R or Cmd+Shift+R)
4. Verify changes are visible
5. **Take screenshot of "After" state** showing updated content

### Step 10: Compare Before/After

Create comparison showing:
- Screenshot 1: Before update (Step 1)
- Screenshot 2: After update (Step 9)
- Highlight the changes made

---

## Screenshots Required for Submission

### CI/CD Setup
1. **GitHub Actions workflow file** (deploy.yml code)
2. **Render auto-deploy settings** (showing enabled)
3. **Vercel deployment settings** (showing production branch)

### CI/CD in Action
1. **Before deployment:** Homepage/feature before changes
2. **GitHub branch:** Feature branch with changes
3. **Pull Request:** PR page showing changes
4. **GitHub Actions:** Workflow running and passing tests
5. **Merge confirmation:** PR merged to main
6. **Render deployment:** Backend deployment logs
7. **Vercel deployment:** Frontend deployment progress
8. **After deployment:** Homepage/feature with visible changes
9. **Commit history:** GitHub commits showing merge

### Verification
1. **GitHub Actions history:** Multiple successful runs
2. **Network timeline:** Showing automatic deployments
3. **Deployment timestamps:** Matching commit times

---

## CI/CD Pipeline Flow

```
┌─────────────────────────────────────────────────────────┐
│  Developer: Make code changes locally                    │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Git: Commit and Push to feature branch                 │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  GitHub: Create Pull Request                            │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  GitHub Actions: Run Tests on PR                        │
│  - Install dependencies                                 │
│  - Run unit tests                                       │
│  - Build frontend                                       │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
          ┌─────────┴──────────┐
          │                    │
    Tests PASS           Tests FAIL
          │                    │
          ▼                    ▼
    Merge Allowed        Fix Required
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│  GitHub: Merge PR to main branch                        │
└───────────────────┬─────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌─────────────────┐   ┌─────────────────┐
│ Render: Backend │   │ Vercel: Frontend│
│ Auto-Deploy     │   │ Auto-Deploy     │
│ - Pull code     │   │ - Pull code     │
│ - Install deps  │   │ - Build app     │
│ - Start server  │   │ - Deploy to CDN │
└────────┬────────┘   └────────┬────────┘
         │                     │
         └──────────┬──────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  Production: Updated application live                   │
└─────────────────────────────────────────────────────────┘
```

---

## Benefits of This CI/CD Pipeline

### 1. Automated Testing
- Every code change is tested
- Prevents broken code from deploying
- Catches errors early

### 2. Faster Deployment
- No manual deployment steps
- Push code → Automatic deploy
- Reduces deployment time from minutes to seconds

### 3. Quality Assurance
- Tests must pass before merge
- Consistent deployment process
- Reduces human error

### 4. Rollback Capability
- Previous versions available
- Easy to revert if issues occur
- Deployment history tracked

### 5. Collaboration
- PR reviews before merge
- CI status visible to team
- Documented change history

---

## Troubleshooting

### Issue: GitHub Actions Fail

**Check:**
1. View workflow logs in Actions tab
2. Identify failing step
3. Common causes:
   - Test failures → Fix tests locally
   - Build errors → Fix syntax errors
   - Dependencies → Update package.json

### Issue: Deployment Doesn't Trigger

**Render:**
- Check auto-deploy is enabled
- Verify correct branch is configured
- Check Render logs for errors

**Vercel:**
- Check production branch setting
- Verify repository connection
- Check Vercel deployment logs

### Issue: Deployed Changes Not Visible

**Solutions:**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Wait 2-3 minutes for CDN propagation
- Check deployment completed successfully

---

## Advanced: Manual Deployment Triggers

### Render Deploy Hook

1. Render Dashboard → Service → Settings
2. Find "Deploy Hook"
3. Copy webhook URL
4. Trigger manually:
```bash
curl -X POST "YOUR_DEPLOY_HOOK_URL"
```

### Vercel Deploy Hook

1. Vercel Dashboard → Settings → Git
2. Create Deploy Hook
3. Copy URL
4. Trigger:
```bash
curl -X POST "YOUR_VERCEL_HOOK_URL"
```

---

## Summary

### What You've Implemented

✅ **Continuous Integration:**
- Automated testing on every push
- Build verification before deployment
- PR checks before merge

✅ **Continuous Deployment:**
- Automatic deployment on merge to main
- Backend and frontend deploy independently
- No manual intervention required

✅ **Best Practices:**
- Feature branch workflow
- Pull request reviews
- Automated quality gates
- Deployment history tracking

---

## Grading Checklist

For full marks on Part IV, ensure you have:

- [ ] `.github/workflows/deploy.yml` file created
- [ ] GitHub Actions running successfully
- [ ] Render auto-deploy configured
- [ ] Vercel auto-deploy configured
- [ ] Feature branch created with changes
- [ ] Pull request created and merged
- [ ] Before screenshot captured
- [ ] After screenshot captured (showing changes)
- [ ] GitHub Actions workflow screenshot
- [ ] Deployment logs screenshot
- [ ] All changes visible on live site

---

**Status:** ✅ CI/CD Pipeline Configured  
**Demonstration:** Ready to execute

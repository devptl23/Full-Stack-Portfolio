# Testing Documentation - Assignment 4 Part I

## Unit Testing Summary

### Tests Created
1. **Home.test.jsx** - 5 tests
   - Component rendering
   - Mission statement display
   - Logo image rendering
   - Button functionality
   - Navigation link verification

2. **Navigation.test.jsx** - 12 tests
   - Navigation links for all pages
   - Sign In/Sign Up button display
   - Welcome message with username
   - Admin label display (Admin)
   - Messages link for admin only
   - Sign Out button functionality
   - Role-based UI rendering

3. **ProjectsList.test.jsx** - 10 tests
   - Projects list rendering
   - Admin vs User view differences
   - Add New Project button (admin only)
   - Edit/Delete buttons (admin only)
   - Empty state handling
   - Project data display

### Test Results
- **Total Tests:** 27
- **Passed:** 27 (100%)
- **Failed:** 0
- **Duration:** ~1.04s

### Running Unit Tests

```bash
cd client
npm test                 # Run tests in watch mode
npm test -- --run        # Run tests once
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Generate coverage report
```

## E2E Testing with Cypress

### Test Files Created

1. **navigation.cy.js**
   - Homepage loading
   - Navigation to all pages (About, Projects, Education, Contact)
   - Complete navigation flow through all routes
   - Sign In/Sign Up button visibility

2. **authentication.cy.js**
   - User registration (Sign Up)
   - User login (Sign In)
   - User logout (Sign Out)
   - Admin login verification
   - Admin features visibility
   - Role-based UI elements

3. **crud-operations.cy.js**
   - Creating new projects (Admin)
   - Viewing projects list
   - Creating qualifications (Admin)
   - Viewing qualifications list
   - Contact messages access (Admin only)
   - Edit/Delete button visibility for admin
   - Regular user restrictions

4. **contact-form.cy.js**
   - Contact form display
   - Form submission
   - Field validation

### Running Cypress Tests

#### Prerequisites
1. Start the backend server:
```bash
# In root directory
npm run dev
```

2. Start the frontend dev server:
```bash
# In client directory
cd client
npm run dev
```

3. Ensure MongoDB is running with test data

#### Running Tests

**Interactive Mode** (Recommended for development):
```bash
cd client
npm run cypress:open
```
- Select "E2E Testing"
- Choose a browser (Chrome recommended)
- Click on test files to run them

**Headless Mode** (For recording videos):
```bash
cd client
npm run cypress:run
```
- Runs all tests automatically
- Generates videos in `cypress/videos/`
- Takes screenshots on failures in `cypress/screenshots/`

### Cypress Video Recordings

After running `npm run cypress:run`, video files will be saved to:
```
client/cypress/videos/
├── navigation.cy.js.mp4
├── authentication.cy.js.mp4
├── crud-operations.cy.js.mp4
└── contact-form.cy.js.mp4
```

### Test Coverage

#### Unit Tests Coverage
- **Components:** Home, Navigation, ProjectsList
- **Coverage Areas:**
  - Component rendering
  - Props handling
  - State management
  - Role-based conditional rendering
  - User authentication states

#### E2E Tests Coverage
- **User Flows:**
  - Complete navigation through all pages
  - Full authentication cycle
  - Admin CRUD operations
  - Regular user read-only access
  - Form submissions

- **Features Tested:**
  - Authentication (Sign Up, Sign In, Sign Out)
  - Role-Based Access Control (Admin vs User)
  - Projects CRUD (Create, Read, Update, Delete)
  - Qualifications CRUD
  - Contact form submission
  - Navigation between pages

### Key Test Scenarios

#### Admin User Testing
- Login as: `admin@portfolio.com` / `admin123`
- Verify "Add New Project" button appears
- Verify "Add New Qualification" button appears
- Verify "Messages" link in navigation
- Verify "(Admin)" label in welcome message
- Verify Edit/Delete buttons on items

#### Regular User Testing
- Create new test account
- Verify NO "Add" buttons
- Verify NO "Edit/Delete" buttons
- Verify NO "Messages" link
- Verify can view all public content

### Screenshots Required for Submission

1. **Unit Test Results**
   - Terminal output showing all 27 tests passing
   - Coverage report (if generated)

2. **Cypress Test Code**
   - Screenshots of test files (navigation.cy.js, authentication.cy.js, crud-operations.cy.js)

3. **Cypress Execution**
   - Cypress Test Runner UI
   - Test execution in progress
   - All tests passing (green checkmarks)
   - Video recordings

4. **Test Evidence**
   - Before/after states for CRUD operations
   - Admin vs User UI differences
   - Authentication flow steps

### Notes

- All tests are configured to work with local development environment
- Cypress tests require both backend (port 3000) and frontend (port 5174) to be running
- Videos are automatically saved after each test run
- Tests use dynamic timestamps to avoid conflicts with duplicate data

### Test Maintenance

To update tests:
1. Unit tests: Edit files in `client/src/test/`
2. E2E tests: Edit files in `client/cypress/e2e/`
3. Cypress config: Modify `client/cypress.config.js`
4. Vitest config: Modify `client/vitest.config.js`

---

**Status:** ✅ All Tests Created and Configured
**Next Step:** Run Cypress tests to generate video recordings for submission

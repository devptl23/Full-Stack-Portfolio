// CRUD Operations E2E Test (Admin Features)
describe('CRUD Operations - Admin', () => {
    beforeEach(() => {
        // Sign in as admin before each test
        cy.visit('/signin');
        cy.get('input[name="email"]').type('admin@portfolio.com');
        cy.get('input[type="password"]').type('admin123');
        cy.contains('button', 'Sign In').click();
        cy.wait(2000); // Wait for auth
    });

    afterEach(() => {
        // Sign out after each test
        cy.contains('Sign Out').click();
    });

    describe('Projects CRUD', () => {
        const testProject = {
            title: `Test Project ${Date.now()}`,
            firstname: 'Cypress',
            lastname: 'Test',
            email: 'cypress@test.com',
            description: 'This is a test project created by Cypress E2E tests'
        };

        it('should create a new project', () => {
            cy.contains('Projects').click();
            cy.url().should('include', '/projects-list');

            // Click Add New Project
            cy.contains('Add New Project').click();
            cy.url().should('include', '/project/new');

            // Fill out form
            cy.get('input[name="title"]').type(testProject.title);
            cy.get('input[name="firstname"]').type(testProject.firstname);
            cy.get('input[name="lastname"]').type(testProject.lastname);
            cy.get('input[name="email"]').type(testProject.email);
            cy.get('input[name="completion"]').type('2024-12-31');
            cy.get('textarea[name="description"]').type(testProject.description);

            // Submit
            cy.contains('button', 'Submit').click();

            // Verify project was created
            cy.wait(1000);
            cy.contains(testProject.title).should('be.visible');
        });

        it('should view projects list', () => {
            cy.contains('Projects').click();
            cy.url().should('include', '/projects-list');
            cy.contains('Projects List').should('be.visible');
        });

        it('should show Edit and Delete buttons for admin', () => {
            cy.contains('Projects').click();
            cy.url().should('include', '/projects-list');

            // Check for action buttons (if projects exist)
            cy.get('body').then($body => {
                if (!$body.text().includes('No projects found')) {
                    cy.contains('button', 'Edit').should('be.visible');
                    cy.contains('button', 'Delete').should('be.visible');
                }
            });
        });
    });

    describe('Qualifications CRUD', () => {
        const testQualification = {
            institution: `Test University ${Date.now()}`,
            program: 'Computer Science',
            credential: 'Bachelor of Science',
            location: 'Toronto, Canada'
        };

        it('should create a new qualification', () => {
            cy.contains('Education').click();
            cy.url().should('include', '/qualifications-list');

            // Click Add New Qualification
            cy.contains('Add New Qualification').click();
            cy.url().should('include', '/qualification/new');

            // Fill out form
            cy.get('input[name="institution"]').type(testQualification.institution);
            cy.get('input[name="program"]').type(testQualification.program);
            cy.get('input[name="credential"]').type(testQualification.credential);
            cy.get('input[name="location"]').type(testQualification.location);
            cy.get('input[name="startdate"]').type('2020-09-01');
            cy.get('input[name="completiondate"]').type('2024-05-31');

            // Submit
            cy.contains('button', 'Submit').click();

            // Verify qualification was created
            cy.wait(1000);
            cy.contains(testQualification.institution).should('be.visible');
        });

        it('should view qualifications list', () => {
            cy.contains('Education').click();
            cy.url().should('include', '/qualifications-list');
            cy.contains('Qualifications List').should('be.visible');
        });
    });

    describe('Contact Messages', () => {
        it('should view contact messages as admin', () => {
            // Admin should see Messages link
            cy.contains('Messages').should('be.visible');

            // Click Messages
            cy.contains('Messages').click();
            cy.url().should('include', '/contacts-list');
            cy.contains('Contact Messages').should('be.visible');
        });
    });

    describe('Role-Based Access Control', () => {
        it('should display admin indicator in navigation', () => {
            cy.contains('(Admin)').should('be.visible');
        });

        it('should show admin-only buttons', () => {
            // Check Projects page
            cy.contains('Projects').click();
            cy.contains('Add New Project').should('be.visible');

            // Check Education page
            cy.contains('Education').click();
            cy.contains('Add New Qualification').should('be.visible');
        });

        it('should show Messages link only for admin', () => {
            cy.contains('Messages').should('be.visible');
        });
    });
});

// CRUD Operations - Regular User View
describe('CRUD Operations - Regular User', () => {
    const timestamp = Date.now();
    const regularUser = {
        name: `Regular User ${timestamp}`,
        email: `regular${timestamp}@test.com`,
        password: 'RegularPass123!'
    };

    it('should NOT show admin features for regular users', () => {
        // Create and sign in as regular user
        cy.visit('/signup');
        cy.get('input[name="name"]').type(regularUser.name);
        cy.get('input[name="email"]').type(regularUser.email);
        cy.get('input[type="password"]').type(regularUser.password);
        cy.contains('button', 'Sign Up').click();

        cy.wait(1000);

        // Sign in
        cy.visit('/signin');
        cy.get('input[name="email"]').clear().type(regularUser.email);
        cy.get('input[type="password"]').clear().type(regularUser.password);
        cy.contains('button', 'Sign In').click();

        cy.wait(2000);

        // Should NOT see (Admin) label
        cy.contains('(Admin)').should('not.exist');

        // Should NOT see Messages link
        cy.contains('Messages').should('not.exist');

        // Check Projects page - should NOT see Add/Edit/Delete buttons
        cy.contains('Projects').click();
        cy.contains('Add New Project').should('not.exist');

        // Sign out
        cy.contains('Sign Out').click();
    });
});

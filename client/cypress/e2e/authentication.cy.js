// Authentication Flow E2E Test
describe('Authentication Flow', () => {
    const timestamp = Date.now();
    const testUser = {
        name: `Test User ${timestamp}`,
        email: `testuser${timestamp}@test.com`,
        password: 'TestPassword123!'
    };

    beforeEach(() => {
        cy.visit('/');
    });

    it('should complete full sign up and sign in flow', () => {
        // Navigate to Sign Up
        cy.contains('Sign Up').click();
        cy.url().should('include', '/signup');

        // Fill sign up form
        cy.get('input[name="name"]').type(testUser.name);
        cy.get('input[name="email"]').type(testUser.email);
        cy.get('input[type="password"]').type(testUser.password);

        // Submit form
        cy.contains('button', 'Sign Up').click();

        // Should redirect to sign in or show success
        cy.wait(1000);

        // Now sign in with the new account
        cy.visit('/signin');
        cy.get('input[name="email"]').clear().type(testUser.email);
        cy.get('input[type="password"]').clear().type(testUser.password);
        cy.contains('button', 'Sign In').click();

        // Should be authenticated
        cy.wait(1000);
        cy.contains(`Welcome, ${testUser.name}`).should('be.visible');

        // Sign out
        cy.contains('Sign Out').click();
        cy.contains('Sign In').should('be.visible');
    });

    it('should show appropriate UI for non-authenticated users', () => {
        cy.contains('Sign In').should('be.visible');
        cy.contains('Sign Up').should('be.visible');
        cy.contains('Sign Out').should('not.exist');
    });

    it('should navigate to sign in page', () => {
        cy.contains('Sign In').click();
        cy.url().should('include', '/signin');
        cy.contains('Email').should('be.visible');
        cy.contains('Password').should('be.visible');
    });

    it('should navigate to sign up page', () => {
        cy.contains('Sign Up').click();
        cy.url().should('include', '/signup');
        cy.get('input[name="name"]').should('be.visible');
        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
    });

    it('should sign in as admin and see admin features', () => {
        // Sign in as admin
        cy.visit('/signin');
        cy.get('input[name="email"]').type('admin@portfolio.com');
        cy.get('input[type="password"]').type('admin123');
        cy.contains('button', 'Sign In').click();

        // Wait for redirect
        cy.wait(2000);

        // Check for admin label
        cy.contains('(Admin)').should('be.visible');

        // Navigate to projects and check for admin buttons
        cy.contains('Projects').click();
        cy.url().should('include', '/projects-list');

        // Admin should see "Add New Project" button
        cy.contains('Add New Project').should('be.visible');

        // Clean up - sign out
        cy.contains('Sign Out').click();
    });
});

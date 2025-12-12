// Portfolio Navigation E2E Test
describe('Portfolio Navigation Flow', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should load the homepage successfully', () => {
        cy.contains('Mission: To build intelligent, scalable software').should('be.visible');
        cy.get('img[alt="Dev Patel Logo"]').should('be.visible');
    });

    it('should navigate to About page', () => {
        cy.contains('About').click();
        cy.url().should('include', '/about');
    });

    it('should navigate to Projects page', () => {
        cy.contains('Projects').click();
        cy.url().should('include', '/projects-list');
        cy.contains('Projects List').should('be.visible');
    });

    it('should navigate to Education page', () => {
        cy.contains('Education').click();
        cy.url().should('include', '/qualifications-list');
    });

    it('should navigate to Contact page', () => {
        cy.contains('Contact').click();
        cy.url().should('include', '/contact');
    });

    it('should show Sign In and Sign Up buttons when not authenticated', () => {
        cy.contains('Sign In').should('be.visible');
        cy.contains('Sign Up').should('be.visible');
    });

    it('should navigate through all pages using navigation bar', () => {
        // Home -> About
        cy.contains('About').click();
        cy.url().should('include', '/about');

        // About -> Projects
        cy.contains('Projects').click();
        cy.url().should('include', '/projects-list');

        // Projects -> Education
        cy.contains('Education').click();
        cy.url().should('include', '/qualifications-list');

        // Education -> Contact
        cy.contains('Contact').click();
        cy.url().should('include', '/contact');

        // Contact -> Home
        cy.contains('Portfolio').click();
        cy.url().should('equal', Cypress.config().baseUrl + '/');
    });
});

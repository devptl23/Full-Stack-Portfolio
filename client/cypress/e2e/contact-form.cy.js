// Contact Form E2E Test
describe('Contact Form Submission', () => {
    beforeEach(() => {
        cy.visit('/contact');
    });

    it('should display contact form', () => {
        cy.contains('Contact').should('be.visible');
        cy.get('input[name="firstname"]').should('be.visible');
        cy.get('input[name="lastname"]').should('be.visible');
        cy.get('input[name="email"]').should('be.visible');
    });

    it('should submit contact form successfully', () => {
        const timestamp = Date.now();

        cy.get('input[name="firstname"]').type('John');
        cy.get('input[name="lastname"]').type('Doe');
        cy.get('input[name="email"]').type(`john.doe${timestamp}@test.com`);
        cy.get('textarea[name="message"]').type('This is a test message from Cypress E2E tests.');

        cy.contains('button', 'Submit').click();

        // Wait for submission
        cy.wait(1000);

        // Should show success message or redirect
        // (Adjust based on your actual implementation)
    });
});

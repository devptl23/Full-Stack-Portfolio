// Cypress E2E support file
// Import commands.js if you have custom commands
// import './commands'

// Prevent Cypress from failing on uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

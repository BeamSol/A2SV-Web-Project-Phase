// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Mock Next.js router for navigation testing
Cypress.Commands.add('login', (token = 'mock-token') => {
  cy.window().then((win) => {
    win.localStorage.setItem('next-auth.session-token', token);
  });
});

Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('next-auth.session-token');
  });
});
// cypress/support/e2e.ts

// This will run after each test in every spec file.
afterEach(() => {
  // We check the state of the test to ensure it passed.
  if (cy.state('test').state === 'passed') {
    // A little logic to sanitize the test title for use as a filename
    // Replaces spaces and special characters with underscores
    const testTitle = cy.state('test').title.replace(/[\s"“':>]/g, '_');

    // We construct a filename that includes the parent suite titles
    // This creates a nice folder structure, e.g., /Bookmark_Functionality/as_an_authenticated_user/
    const screenshotName = `${cy.state('test').parent.title}/${testTitle}`;

    // Take the screenshot and save it with our custom name
    cy.screenshot(screenshotName, {
      capture: 'runner', // Captures the entire Cypress Runner window
      overwrite: true,
    });
  }
});
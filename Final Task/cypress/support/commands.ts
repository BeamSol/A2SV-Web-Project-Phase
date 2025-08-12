/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('mockBookmarksApi', (status = 200, response = { data: [] }) => {
  cy.intercept('GET', '/api/bookmarks', {
    statusCode: status,
    body: response,
  }).as('getBookmarks');
});

Cypress.Commands.add('mockAddBookmarkApi', (status = 200, response = {}) => {
  cy.intercept('POST', '/api/bookmarks', {
    statusCode: status,
    body: response,
  }).as('addBookmark');
});

Cypress.Commands.add('mockRemoveBookmarkApi', (status = 200, response = {}) => {
  cy.intercept('DELETE', '/api/bookmarks/*', {
    statusCode: status,
    body: response,
  }).as('removeBookmark');
});

Cypress.Commands.add('mockOpportunitiesApi', (status = 200, response = { data: [] }) => {
  cy.intercept('GET', 'https://akil-backend.onrender.com/opportunities/search', {
    statusCode: status,
    body: response,
  }).as('getOpportunities');
});
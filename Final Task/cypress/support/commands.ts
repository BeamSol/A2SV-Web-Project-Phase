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


declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Sets up the intercept for a logged-in session. Does NOT create an alias.
       */
      stubSessionAsLoggedIn(): Chainable<void>;

      /**
       * Sets up the intercept for a logged-out session. Does NOT create an alias.
       */
      stubSessionAsLoggedOut(): Chainable<void>;

      mockOpportunitiesApi(status?: number, response?: any): Chainable<void>;
    }
  }
}

/**
 * Sets up the API intercept for a valid, authenticated user session.
 * The test (`it` block) is responsible for aliasing this intercept if it needs to be awaited.
 */
Cypress.Commands.add('stubSessionAsLoggedIn', () => {
  cy.intercept('GET', '/api/auth/session', {
    statusCode: 200,
    body: {
      user: { name: 'Test User', email: 'test@example.com' },
      accessToken: 'mock-jwt-token-for-testing',
    },
  });
});

/**
 * Sets up the API intercept for a logged-out user session.
 */
Cypress.Commands.add('stubSessionAsLoggedOut', () => {
  cy.intercept('GET', '/api/auth/session', {
    statusCode: 200,
    body: {},
  });
});

Cypress.Commands.add('mockOpportunitiesApi', (status = 200, response = { data: [] }) => {
  cy.intercept('GET', 'https://akil-backend.onrender.com/opportunities/search', {
    statusCode: status,
    body: response,
  }).as('getOpportunities');
});
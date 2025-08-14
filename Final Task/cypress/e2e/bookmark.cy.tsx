
describe('Bookmark Functionality', () => {
  const mockJob = {
    id: '1',
    title: 'Frontend Developer',
    location: 'Remote',
    description: 'Build cool stuff',
    opType: 'Full-time',
    categories: ['Tech', 'Remote'],
    logoUrl: '/mock-logo.png',
  };

  describe('as an authenticated user', () => {
    beforeEach(() => {
      // Set up intercepts that are common to all tests in this block.
      cy.mockOpportunitiesApi(200, { data: [mockJob] });
    });

    it('allows a user to add a bookmark', () => {
      // --- Arrange ---
      // Define ALL intercepts here, including aliasing the session.
      cy.stubSessionAsLoggedIn(); // Sets up the intercept from the command
      cy.intercept('GET', '/api/auth/session').as('session'); // **ALIAS IS CREATED HERE**
      cy.intercept('GET', '**/bookmarks', { statusCode: 200, body: { data: [] } }).as('getBookmarks');
      cy.intercept('POST', '**/bookmarks/1', { statusCode: 200, body: { success: true } }).as('addBookmark');

      // --- Act ---
      cy.visit('/jobs');

      // --- Assert ---
      cy.wait(['@session', '@getOpportunities', '@getBookmarks']);
      cy.get('[data-testid="bookmark-button"]').find('[data-testid="bookmark"]').should('be.visible');

      // --- Act ---
      cy.get('[data-testid="bookmark-button"]').click();

      // --- Assert ---
      cy.wait(['@addBookmark', '@getBookmarks']);
      cy.contains('Added to bookmarks').should('be.visible');
      cy.get('[data-testid="bookmark-button"]').find('[data-testid="bookmark-check"]').should('be.visible');
    });

    it('allows a user to remove a bookmark', () => {
      // --- Arrange ---
      cy.stubSessionAsLoggedIn();
      cy.intercept('GET', '/api/auth/session').as('session');
      cy.intercept('GET', '**/bookmarks', { statusCode: 200, body: { data: [{ eventID: '1' }] } }).as('getBookmarks');
      cy.intercept('DELETE', '**/bookmarks/1', { statusCode: 200, body: { success: true } }).as('removeBookmark');

      // --- Act ---
      cy.visit('/jobs');

      // --- Assert ---
      cy.wait(['@session', '@getOpportunities', '@getBookmarks']);
      cy.get('[data-testid="bookmark-button"]').find('[data-testid="bookmark-check"]').should('be.visible');

      // --- Act ---
      cy.get('[data-testid="bookmark-button"]').click();

      // --- Assert ---
      cy.wait(['@removeBookmark', '@getBookmarks']);
      cy.contains('Removed from bookmarks').should('be.visible');
      cy.get('[data-testid="bookmark-button"]').find('[data-testid="bookmark"]').should('be.visible');
    });

    it('handles a server error when trying to add a bookmark', () => {
      // --- Arrange ---
      cy.stubSessionAsLoggedIn();
      cy.intercept('GET', '/api/auth/session').as('session');
      cy.intercept('GET', '**/bookmarks', { statusCode: 200, body: { data: [] } }).as('getBookmarks');
      cy.intercept('POST', '**/bookmarks/1', { statusCode: 500, body: { message: 'Internal Server Error' } }).as('addBookmarkFails');

      // --- Act ---
      cy.visit('/jobs');

      // --- Assert ---
      cy.wait(['@session', '@getOpportunities', '@getBookmarks']);
      cy.get('[data-testid="bookmark-button"]').find('[data-testid="bookmark"]').should('be.visible');

      // --- Act ---
      cy.get('[data-testid="bookmark-button"]').click();
      cy.wait('@addBookmarkFails');

      // --- Assert ---
      cy.contains('Internal Server Error').should('be.visible');
      cy.get('[data-testid="bookmark-button"]').find('[data-testid="bookmark"]').should('be.visible');
    });

    it('persists bookmark state on page reload', () => {
      // --- Arrange ---
      cy.stubSessionAsLoggedIn();
      cy.intercept('GET', '/api/auth/session').as('session');
      cy.intercept('GET', '**/bookmarks', { statusCode: 200, body: { data: [{ eventID: '1' }] } }).as('getBookmarks');

      // --- Act & Assert ---
      cy.visit('/jobs');
      cy.wait(['@session', '@getOpportunities', '@getBookmarks']);
      cy.get('[data-testid="bookmark-check"]').should('be.visible');

      // --- Act & Assert ---
      cy.reload();
      cy.wait(['@session', '@getOpportunities', '@getBookmarks']);
      cy.get('[data-testid="bookmark-check"]').should('be.visible');
    });
  });

  describe('as an unauthenticated user', () => {
    it('redirects to login when attempting to bookmark', () => {
      // --- Arrange ---
      cy.stubSessionAsLoggedOut();
      cy.intercept('GET', '/api/auth/session').as('session');
      cy.mockOpportunitiesApi(200, { data: [mockJob] });

      // --- Act ---
      cy.visit('/jobs');
      
      // --- Assert ---
      cy.wait(['@session', '@getOpportunities']);
      cy.get('[data-testid="bookmark-button"]').click();
      cy.contains('You need to be logged in').should('be.visible');
      cy.url({ timeout: 5000 }).should('include', '/login');
    });
  });
});
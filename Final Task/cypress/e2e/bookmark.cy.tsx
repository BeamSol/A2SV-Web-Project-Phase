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

  beforeEach(() => {
    // Mock the opportunities and bookmarks API calls
    cy.mockOpportunitiesApi(200, { data: [mockJob] });
    cy.mockBookmarksApi(200, { data: [] });
    // Start the Next.js app
    cy.visit('/jobs');
    cy.wait('@getOpportunities');
  });

  it('allows an authenticated user to add a bookmark', () => {
    // Simulate authenticated user
    cy.login('mock-token');
    // Mock successful bookmark addition
    cy.mockAddBookmarkApi(200, { success: true });
    // Mock updated bookmarks list
    cy.mockBookmarksApi(200, { data: [{ eventID: '1', ...mockJob }] });

    // Verify job card is rendered
    cy.get('[data-testid="job-card"]').contains('Frontend Developer').should('be.visible');
    cy.get('[data-testid="bookmark-button"]').should('have.attr', 'data-testid', 'bookmark');

    // Click bookmark button
    cy.get('[data-testid="bookmark-button"]').click();
    cy.wait('@addBookmark').its('request.body').should('deep.equal', { jobId: '1' });

    // Verify success toast
    cy.get('.Toastify__toast--success').contains('Added to bookmarks').should('be.visible');

    // Verify bookmark icon changes
    cy.get('[data-testid="bookmark-check"]').should('be.visible');
  });

  it('allows an authenticated user to remove a bookmark', () => {
    // Simulate authenticated user with an existing bookmark
    cy.login('mock-token');
    cy.mockBookmarksApi(200, { data: [{ eventID: '1', ...mockJob }] });
    cy.mockRemoveBookmarkApi(200, { success: true });
    cy.mockBookmarksApi(200, { data: [] }); // Updated bookmarks list after removal

    // Reload to apply updated bookmarks mock
    cy.visit('/jobs');
    cy.wait('@getOpportunities');
    cy.wait('@getBookmarks');

    // Verify job card and bookmark status
    cy.get('[data-testid="job-card"]').contains('Frontend Developer').should('be.visible');
    cy.get('[data-testid="bookmark-check"]').should('be.visible');

    // Click bookmark button to remove
    cy.get('[data-testid="bookmark-button"]').click();
    cy.wait('@removeBookmark').its('request.url').should('include', '/api/bookmarks/1');

    // Verify success toast
    cy.get('.Toastify__toast--success').contains('Removed from bookmarks').should('be.visible');

    // Verify bookmark icon changes
    cy.get('[data-testid="bookmark"]').should('be.visible');
  });

  it('redirects unauthenticated user to login when attempting to bookmark', () => {
    // Simulate unauthenticated user
    cy.logout();
    cy.mockBookmarksApi(200, { data: [] });

    // Verify job card is rendered
    cy.get('[data-testid="job-card"]').contains('Frontend Developer').should('be.visible');

    // Click bookmark button
    cy.get('[data-testid="bookmark-button"]').click();

    // Verify error toast
    cy.get('.Toastify__toast--error').contains('You need to be logged in to bookmark a job.').should('be.visible');

    // Verify redirection to login
    cy.url().should('include', '/login');

    // Navigate back and verify bookmark icon doesn't change
    cy.visit('/jobs');
    cy.wait('@getOpportunities');
    cy.get('[data-testid="bookmark"]').should('be.visible');
  });

  it('handles bookmark toggle failure', () => {
    // Simulate authenticated user
    cy.login('mock-token');
    cy.mockAddBookmarkApi(500, { error: 'Server error' });

    // Verify job card is rendered
    cy.get('[data-testid="job-card"]').contains('Frontend Developer').should('be.visible');

    // Click bookmark button
    cy.get('[data-testid="bookmark-button"]').click();
    cy.wait('@addBookmark');

    // Verify error toast
    cy.get('.Toastify__toast--error').contains('Something went wrong while toggling bookmark.').should('be.visible');

    // Verify bookmark icon doesn't change
    cy.get('[data-testid="bookmark"]').should('be.visible');
  });

  it('persists bookmark state on page reload', () => {
    // Simulate authenticated user with a bookmark
    cy.login('mock-token');
    cy.mockBookmarksApi(200, { data: [{ eventID: '1', ...mockJob }] });

    // Verify initial bookmark state
    cy.get('[data-testid="job-card"]').contains('Frontend Developer').should('be.visible');
    cy.get('[data-testid="bookmark-check"]').should('be.visible');

    // Reload the page
    cy.reload();
    cy.wait('@getOpportunities');
    cy.wait('@getBookmarks');

    // Verify bookmark state persists
    cy.get('[data-testid="bookmark-check"]').should('be.visible');
  });
});
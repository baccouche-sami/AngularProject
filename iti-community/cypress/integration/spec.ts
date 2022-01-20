describe('Testing Authentification', () => {

  beforeEach(() => {
    cy.visit('/splash/login');
  });

  it('Login Page', () => {

     // Fill the username
     cy.get('input[name="username"]')
     .type('samibaccouche')
     .should('have.value', 'samibaccouche');

   // Fill the password
   cy.get('input[name="password"]')
     .type('Azerty123')
     .should('have.value', 'Azerty123');

   // Locate and submit the form
   cy.get('form').submit();
   
   // Verify the app redirected you to the homepage
   cy.location('pathname', { timeout: 10000 }).should('eq', '/app');
   
   // Verify the page title is "Home"
   cy.title().should('eq', 'ItiCommunity');
    // cy.visit('/')
    // cy.contains('Welcome')
    // cy.contains('sandbox app is running!')
  })
})

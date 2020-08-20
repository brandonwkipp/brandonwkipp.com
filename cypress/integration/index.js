const host = (Cypress.env('environment') === 'deployment') ? Cypress.env('deployment') : Cypress.env('development');

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit(host);
  });

  // Check that the document contains login form & components
  it('Does the Home Page render correctly?', () => {
    cy.title()
      .should('eq', 'RadiumTree');

    cy.get('#signup')
      .should('exist');

    cy.get('[data-cy=signupForm]')
      .should('exist')
      .should('be.visible');

    cy.get('[data-cy=signupFirstName]')
      .should('exist')
      .should('be.visible');

    cy.get('[data-cy=signupLastName]')
      .should('exist')
      .should('be.visible');

    cy.get('[data-cy=signupEmail]')
      .should('exist')
      .should('be.visible');

    cy.get('[data-cy=signupPassword]')
      .should('exist')
      .should('be.visible');

    cy.get('[data-cy=signupPasswordConfirm]')
      .should('exist')
      .should('be.visible');

    cy.get('[data-cy=signupSubmit]')
      .should('exist')
      .should('be.visible');
  });
});

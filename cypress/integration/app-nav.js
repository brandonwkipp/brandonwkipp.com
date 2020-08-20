const host = (Cypress.env('environment') === 'deployment') ? Cypress.env('deployment') : Cypress.env('development');

describe('AppNav', () => {
  beforeEach(() => {
    cy.visit(host);
  });

  it('Does document.title contain the text, "RadiumTree"?', () => {
    cy.title()
      .should('match', /RadiumTree/);
  });

  it('Does NavbarBrand render correctly?', () => {
    cy.get('.navbar-brand')
      .find('img')
      .should('be.visible');
  });
});

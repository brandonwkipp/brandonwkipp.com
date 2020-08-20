const YAML = require('yamljs');

// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('validateGatsbyImg', () => {
  cy.get('.data-cy-gatsby-img')
    .each((imageWrapper) => {
      // Let's test if we can find both the blurry image data
      cy.get(imageWrapper)
        .children('img', { timeout: 1000 })
        .should('exist')
        .and('be.visible');

      // TODO: Test that the blurry image is valid base64?

      // Let's test that the real image data lazy loads
      cy.get(imageWrapper)
        .children('picture', { timeout: 1000 })
        .should('exist')
        .then((picture) => {
          // Let's make sure the underlying img element exists
          cy.get(picture)
            .children('img')
            .should('exist')
            .should('be.visible')
            .then((img) => {
              // Let's test the real image data renders correctly
              cy.request(img[0].src);
            });
        });
    });
});

Cypress.Commands.add('validateNonNullableFormInput', (formInput, formSubmit, formType) => {
  if (!formInput || !formSubmit || !formType) return;

  // Test that form elements exist
  cy.get(`[data-cy=${formInput}]`)
    .should('exist')
    .should('be.visible');

  cy.get(`[data-cy=${formSubmit}]`)
    .should('exist')
    .should('be.visible');

  // Test against blank input
  cy.get(`[data-cy=${formInput}]`)
    .clear();

  cy.get(`[data-cy=${formSubmit}]`)
    .click();

  cy.get(`[data-cy=${formInput}]`)
    .should('have.class', 'is-invalid');
});

Cypress.Commands.add('validateSingleTypeableFormInput', (formInput, formSubmit, formType) => {
  if (!formInput || !formSubmit || !formType) return;

  // Test that form elements exist
  cy.get(`[data-cy=${formInput}]`)
    .should('exist')
    .should('be.visible');

  cy.get(`[data-cy=${formSubmit}]`)
    .should('exist')
    .should('be.visible');

  // Test against blank input
  cy.get(`[data-cy=${formInput}]`)
    .clear();

  cy.get(`[data-cy=${formSubmit}]`)
    .click();

  cy.get(`[data-cy=${formInput}]`)
    .should('have.class', 'is-invalid');

  // Test against pre-defined invalid types
  cy.readFile(`cypress/fixtures/forms/${formType}.yml`).then((types) => {
    // Fetch pre-defined invalid types
    const parsedYAML = YAML.parse(types);

    parsedYAML.invalid.map((type) => {
      cy.get(`[data-cy=${formInput}]`)
        .clear()
        .type(type);

      cy.get(`[data-cy=${formSubmit}]`)
        .click();

      cy.get(`[data-cy=${formInput}]`)
        .should('have.class', 'is-invalid');

      return null;
    });
  });
});

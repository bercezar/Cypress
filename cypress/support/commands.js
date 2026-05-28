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

Cypress.Commands.add("createUserDynamic", () => {
  cy.fixture("register_user").then((data) => {
    const emailDynamic = "teste_" + Date.now() + "@testmail.com";

    cy.visit("https://automationexercise.com");
    cy.get(".logo.pull-left").should("be.visible");

    cy.contains(" Signup / Login").click();
    cy.get('[data-qa="signup-name"]').type(data.signup.name);
    cy.get('[data-qa="signup-email"]').type(emailDynamic);
    cy.get('[data-qa="signup-button"]').click();

    // Account Information
    cy.contains("Enter Account Information").should("be.visible");

    cy.get("#id_gender1").check(data.accountInfo.title);
    cy.get('[data-qa="password"]').type(data.accountInfo.password);
    cy.get('[data-qa="days"]').select(data.accountInfo.dateOfBirth.day);
    cy.get('[data-qa="months"]').select(data.accountInfo.dateOfBirth.month);
    cy.get('[data-qa="years"]').select(data.accountInfo.dateOfBirth.year);
    cy.get("#newsletter").check();
    cy.get("#optin").check();

    // Adrees Information
    cy.get('[data-qa="first_name"]').type(data.addressInfo.firstName);
    cy.get('[data-qa="last_name"]').type(data.addressInfo.lastName);
    cy.get('[data-qa="company"]').type(data.addressInfo.company);
    cy.get('[data-qa="address"]').type(data.addressInfo.address1);
    cy.get('[data-qa="address2"]').type(data.addressInfo.address2);
    cy.get('[data-qa="country"]').select(data.addressInfo.country);
    cy.get('[data-qa="state"]').type(data.addressInfo.state);
    cy.get('[data-qa="city"]').type(data.addressInfo.city);
    cy.get('[data-qa="zipcode"]').type(data.addressInfo.zipcode);
    cy.get('[data-qa="mobile_number"]').type(data.addressInfo.mobileNumber);

    cy.get('[data-qa="create-account"]').click();

    cy.contains("Account Created!").should("be.visible");
    cy.wrap(emailDynamic).as("emailRegistered");

    cy.get('[data-qa="continue-button"]').click();
  });
});

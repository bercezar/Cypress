describe("Login_correct", () => {
  beforeEach(() => {
    // cypress/support/commands.js
    cy.createUserDynamic();
  });
  it("Login User with correct email and password", function () {
    // ARRANGE
    cy.visit("http://automationexercise.com");
    cy.get(".logo.pull-left").should("be.visible");

    // ACT
    cy.contains(" Signup / Login").click();
    cy.contains("Login to your account").should("be.visible");

    cy.fixture("register_user").then((data) => {
      cy.get('[data-qa="login-email"]').type(this.emailRegistered);
      cy.get('[data-qa="login-password').type(data.accountInfo.password);
      cy.get('[data-qa="login-button"]').click();

      cy.contains(" Logged in as " + data.signup.name).should("be.visible");
    });

    cy.contains(" Delete Account").click();

    cy.contains("Account Deleted!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();

    // ASSERT
    cy.url().should("eq", "https://automationexercise.com/");
  });
});

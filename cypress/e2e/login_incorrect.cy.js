describe("Login_correct", () => {
  it("Login User with correct email and password", function () {
    // ARRANGE
    cy.visit("http://automationexercise.com");

    // ACT
    cy.get(".logo.pull-left").should("be.visible");
    cy.contains(" Signup / Login").click();
    cy.contains("Login to your account").should("be.visible");

    cy.get('[data-qa="login-email"]').type("emailerrado@testmail.com");
    cy.get('[data-qa="login-password').type("senhaerradaTeste");
    cy.get('[data-qa="login-button"]').click();

    // ASSERT
    cy.get(".login-form p")
      .should("be.visible")
      .and("have.text", "Your email or password is incorrect!");
  });
});

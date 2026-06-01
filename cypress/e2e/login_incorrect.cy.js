describe("Login_correct", () => {
  it("Login User with correct email and password", function () {
    // ARRANGE
    cy.visit("http://automationexercise.com");

    // ACT
    cy.contains("#slider-carousel h2", "Full-Fledged practice website").should(
      "be.visible",
    ); // Valida o carregamento da Home Page checando o carrosel exclusivo

    cy.contains(" Signup / Login").click();

    // Página de login
    cy.url().should("include", "/login");
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

describe("Login_correct", () => {
  beforeEach(() => {
    // cypress/support/commands.js
    cy.createUserDynamic(); // Criação do email dinâmico
    cy.contains(" Logout").click();
  });
  // Para ter o usuário cadastrado e verificar o login correto, é necessário ter uma criação de conta anterior e o logout para fazer o login com os dados recém criados

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

    cy.fixture("standard-user-profile").then((data) => {
      cy.get('[data-qa="login-email"]').type(this.emailRegistered);
      cy.get('[data-qa="login-password').type(data.accountInfo.password);
      cy.get('[data-qa="login-button"]').click();

      cy.contains(" Logged in as " + data.signup.name).should("be.visible"); // Verifica se o nome do login bate com o arquivado (arquivo json)
    });

    cy.contains(" Delete Account").click();

    // ASSERT
    cy.contains("Account Deleted!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
    cy.url().should("eq", "https://automationexercise.com/");
  });
});

describe("register_user", () => {
  it("Register User", () => {
    // ARRANGE
    cy.visit("https://automationexercise.com");

    // ACT
    cy.contains("#slider-carousel h2", "Full-Fledged practice website").should(
      "be.visible",
    ); // Valida o carregamento da Home Page checando o carrosel exclusivo

    cy.contains(" Signup / Login").click();
    cy.url().should("include", "/login");
    cy.contains("New User Signup!").should("be.visible");

    cy.contains("Login to your account").should("be.visible");
    cy.fixture("standard-user-profile").then((data) => {
      // Acesso dos dados JSON
      const emailTrash = "teste_" + Date.now() + "@testmail.com";
      cy.get('[data-qa="signup-name"]').type(data.signup.name);
      cy.get('[data-qa="signup-email"]').type(emailTrash);

      cy.get('[data-qa="signup-button"]').click(); // Click no botão de cadastrar

      cy.contains("Enter Account Information").should("be.visible");

      /////////////// Preenchimento dos campos de cadastro  ///////////////

      // Account Information
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

      /////////////////////////////////////////////////////////////////////

      cy.get('[data-qa="create-account"]').click();

      cy.contains("Account Created!").should("be.visible");

      cy.get('[data-qa="continue-button"]').click();
      cy.contains(" Logged in as " + data.signup.name).should("be.visible"); // Confirmação do usuário logado
    });

    cy.contains(" Delete Account").click();

    // ASSERT
    cy.contains("Account Deleted!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();

    cy.url().should("eq", "https://automationexercise.com/");
  });
});

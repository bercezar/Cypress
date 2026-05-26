describe("register_user", () => {
  it("Register User", () => {
    // ARRANGE
    cy.visit("https://automationexercise.com");

    // ACT
    cy.contains(" Signup / Login").click();
    cy.contains("New User Signup!").should("be.visible");

    cy.fixture("register_user").then((data) => {
      const emailTrash = "teste_" + Date.now() + "@testmail.com";
      cy.get('[data-qa="signup-name"]').type(data.signup.name);
      cy.get('[data-qa="signup-email"]').type(emailTrash);

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

      cy.get('[data-qa="continue-button"]').click();
      cy.contains("Logged in as " + data.signup.name).should("be.visible");
    });

    cy.contains(" Delete Account").click();

    cy.contains("Account Deleted!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();

    // ASSERT
    cy.url().should("eq", "https://automationexercise.com/");
  });
});

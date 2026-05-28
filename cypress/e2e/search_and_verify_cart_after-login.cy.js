describe("search-and-verify-cart-after-login", () => {
  beforeEach(() => {
    cy.createUserDynamic();
    cy.contains(" Logout").click();
  });
  it("Search Products and Verify Cart After Login", () => {
    // ARRANGE
    cy.visit("http://automationexercise.com");

    // ACT
  });
});

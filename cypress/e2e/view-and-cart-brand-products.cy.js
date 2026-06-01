describe("view-and-cart-brand-products", () => {
  it("View & Cart Brand Products", () => {
    // ARRANGE
    cy.visit("https://automationexercise.com");

    // ACT
    cy.get(".navbar-nav").within(() => {
      cy.contains(" Products").should("be.visible").click(); // Clique no Botão de produtos
    });

    cy.get(".brands-name").should("be.visible"); // Marcas estão visíveis

    cy.contains(".nav-stacked a", "Madame").click(); // Clique na marca Madame

    cy.url().should("include", "/brand_products/Madame");

    cy.contains(".features_items h2", "Brand - Madame Products").should(
      "be.visible",
    );

    cy.contains(".nav-stacked a", "Polo").click();
    cy.url().should("include", "/Polo");

    cy.contains(".features_items h2", "Brand - Polo Products").should(
      "be.visible",
    );
  });
});

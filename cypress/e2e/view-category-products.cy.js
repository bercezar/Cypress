describe("view-category-products", () => {
  it("View Category Products", () => {
    // ARRANGE
    cy.visit("https://automationexercise.com");

    // ACT
    cy.get("#accordian").should("be.visible"); // Categorias estão visíveis
    cy.contains(".panel-title a[data-toggle='collapse']", "Women").click(); // Clique na categoria de "Women"

    cy.contains("#Women .panel-body li a", "Dress").click(); // Clique na categoria "Dress"

    cy.contains(".features_items h2", "Women - Dress Products").should(
      "be.visible",
    );

    cy.contains(".panel-title a[data-toggle='collapse']", "Men").click(); // Clique na categoria de "Men"

    cy.contains("#Men .panel-body li a", "Jeans").click(); // Clique na categoria "Dress"

    // ASSERT
    cy.contains(".features_items h2", "Men - Jeans Products").should(
      "be.visible",
    );
  });
});

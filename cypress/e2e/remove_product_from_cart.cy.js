describe("remove_product_from_cart", () => {
  beforeEach(() => {
    cy.createUserDynamic();
  });
  it("Remove Products From Cart", () => {
    // ACT
    const targetIds = ["1", "4"];
    targetIds.forEach((id) => {
      cy.get(`[data-product-id="${id}"]`).first().click({ force: true });
      cy.contains("Continue Shopping").should("be.visible").click();
    });

    cy.get(".navbar-nav").within(() => {
      cy.contains(" Cart").should("be.visible").click();
    });

    cy.contains("Shopping Cart").should("be.visible");

    targetIds.forEach((id) => {
      cy.get(`#product-${id}`).within(() => {
        cy.get(".cart_quantity_delete").should("be.visible").click();
      });
    });

    // ASSERT
    cy.get("#empty_cart").within(() => {
      cy.get(".text-center b").should("have.text", "Cart is empty!");
    });

    // CLEANUP
    cy.contains(" Delete Account").click();

    cy.contains("Account Deleted!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
  });
});

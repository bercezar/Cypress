describe("remove_product_from_cart", () => {
  it("Remove Products From Cart", () => {
    // ARRANGE

    cy.visit("https://automationexercise.com");

    // ACT
    cy.contains("#slider-carousel h2", "Full-Fledged practice website").should(
      "be.visible",
    ); // Valida o carregamento da Home Page checando o carrosel exclusivo

    const targetIds = ["1", "4"];
    targetIds.forEach((id) => {
      cy.get(`[data-product-id="${id}"]`).first().click({ force: true }); // Adiciona produto ao carrinho
      cy.contains("Continue Shopping").should("be.visible").click(); // Confirma se deseja continuar comprando
    });

    cy.get(".navbar-nav").within(() => {
      cy.contains(" Cart").should("be.visible").click(); // Direciona ao carrinho
    });

    cy.contains("Shopping Cart").should("be.visible");

    // Excluir do carrinho o id relacionado ao produto de compra ao adicionar ao carrinho
    targetIds.forEach((id) => {
      cy.get(`#product-${id}`).within(() => {
        cy.get(".cart_quantity_delete").should("be.visible").click();
      });
    });

    // ASSERT
    // Verificação da exclusão
    cy.get("#empty_cart").within(() => {
      cy.get(".text-center b").should("have.text", "Cart is empty!");
    });
  });
});

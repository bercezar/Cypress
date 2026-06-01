describe("chore: create files for test cases", () => {
  it("Verify All Products and product detail page", () => {
    // Arrange
    cy.visit("https://automationexercise.com");

    // ACT
    cy.contains("#slider-carousel h2", "Full-Fledged practice website").should(
      "be.visible",
    ); // Valida o carregamento da Home Page checando o carrosel exclusivo

    cy.get(".navbar-nav").within(() => {
      cy.contains(" Products").should("be.visible").click(); // Clique no Botão de produtos
    });

    cy.url().should("include", "/products"); // Página de produtos

    cy.get(".features_items .col-sm-4").should("have.length.greaterThan", 0); // Verifica se lista de produtos está visíveis

    cy.get(".productinfo.text-center") // Resgata do primeiro produto nome e produto
      .first()
      .within(() => {
        cy.get("h2")
          .invoke("text")
          .then((textoPreco) => {
            cy.wrap(textoPreco).as("productPrice");
          });

        cy.get("p")
          .invoke("text")
          .then((textoNome) => {
            cy.wrap(textoNome).as("productName");
          });
      });

    cy.get(".choose a").first().click(); // Seleciona o primeiro produto a visualizar

    cy.url().should("include", "/product_details"); // Página de detalhes do produto selecionado

    // ASSERT

    // Verificação dos detalhes do produto estão visíveis e se condiz com nome e preço
    cy.get(".product-information").within(() => {
      cy.get("@productName").then((name) => {
        cy.get("h2").should("have.text", name);
      });
      cy.get("@productPrice").then((price) => {
        cy.get("span span").should("have.text", price);
      });
      cy.contains("p", "Category:").should("be.visible");
      cy.contains("p", "Availability:").should("be.visible");
      cy.contains("p", "Condition:").should("be.visible");
      cy.contains("p", "Brand:").should("be.visible");
    });
  });
});

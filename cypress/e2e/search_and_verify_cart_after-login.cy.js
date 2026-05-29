describe("search-and-verify-cart-after-login", () => {
  beforeEach(() => {
    cy.createUserDynamic(); // Criação do email dinâmico
    cy.contains(" Logout").click();
  });
  it("Search Products and Verify Cart After Login", function () {
    // ARRANGE
    cy.visit("http://automationexercise.com");

    // ACT
    cy.get(".navbar-nav").within(() => {
      cy.contains(" Products").should("be.visible").click(); // Clique no Botão de produtos
    });

    cy.get(".features_items").should("be.visible");

    const productName = "Fancy Green Top";
    cy.get("#search_product").type(productName); // Introduz o nome do produto para ser feito a busca

    cy.get("#submit_search").click(); // Clica em Buscar

    cy.contains("Searched Products").should("be.visible"); // Produtos buscados em tela

    cy.get(".productinfo.text-center p").should("have.text", productName); // Nome do produto deve constar no card de produtos

    cy.contains(".productinfo", productName).find(".add-to-cart").click(); // Adiciona o produto buscado ao carrinho

    cy.get(".navbar-nav").within(() => {
      cy.contains(" Cart").click({ force: true });
    }); // Verificar o carrinho

    cy.get(".cart_description h4 a").should("have.text", productName); // Verifica o produto deseja se foi adicionado ao carrinho

    /////////////// LOGIN  ///////////////
    cy.contains(" Signup / Login").click();
    cy.contains("Login to your account").should("be.visible");

    cy.fixture("standard-user-profile").then((data) => {
      cy.get('[data-qa="login-email"]').type(this.emailRegistered);
      cy.get('[data-qa="login-password"]').type(data.accountInfo.password);
      cy.get('[data-qa="login-button"]').click();

      cy.contains(" Logged in as " + data.signup.name).should("be.visible"); // Confirmação do usuário logado
    });
    //////////////////////////////////////

    cy.get(".navbar-nav").within(() => {
      cy.contains(" Cart").should("be.visible").click();
    }); // Verificar o carrinho novamente

    // ASSERT
    cy.get(".cart_description h4 a").should("have.text", productName); // Verificar se o produto ainda se mantém no carrinho

    // CLEANUP
    cy.contains(" Delete Account").should("be.visible").click();
    cy.contains("Account Deleted!").should("be.visible");
  });
});

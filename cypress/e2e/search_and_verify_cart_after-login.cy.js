describe("search-products-and-verify-cart-after-login", () => {
  beforeEach(() => {
    cy.createUserDynamic(); // Criação do email dinâmico
    cy.contains(" Logout").click();
  });
  // Para ter o usuário cadastrado e verificar o login correto, é necessário ter uma criação de conta anterior e o logout para fazer o login com os dados recém criados
  it("Search Products and Verify Cart After Login", function () {
    // ARRANGE
    cy.visit("https://automationexercise.com");

    // ACT
    cy.get(".navbar-nav").within(() => {
      cy.contains(" Products").should("be.visible").click(); // Clique no Botão de produtos
    });

    // Página de produtos
    cy.url().should("include", "/products"); // Página de produtos
    cy.get(".features_items .col-sm-4").should("have.length.greaterThan", 0); // Verifica se lista de produtos está visíveis

    const productName = "Fancy Green Top";
    cy.get("#search_product").type(productName); // Introduz o nome do produto para ser feito a busca

    cy.get("#submit_search").click(); // Clica em Buscar

    cy.contains("Searched Products").should("be.visible"); // Produtos buscados em tela

    cy.get(".productinfo.text-center p").should("have.text", productName); // Nome do produto deve constar no card de produtos

    cy.contains(".productinfo", productName).find(".add-to-cart").click(); // Adiciona o produto buscado ao carrinho

    cy.contains("Continue Shopping").should("be.visible").click();

    cy.get(".navbar-nav").within(() => {
      cy.contains(" Cart").should("be.visible").click();
    }); // Verificar o carrinho

    cy.get(".cart_description h4 a").should("have.text", productName); // Verifica o produto desejado se foi adicionado ao carrinho

    /////////////// LOGIN  ///////////////
    cy.contains(" Signup / Login").click();

    cy.url().should("eq", "https://automationexercise.com/login");
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

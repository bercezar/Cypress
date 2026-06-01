describe("register_before_checkout", () => {
  beforeEach(() => {
    cy.createUserDynamic(); // Criação do email dinâmico
    cy.contains(" Logout").click();
  });
  it("Register before Checkout", () => {
    // ARRANGE
    cy.visit("https://automationexercise.com");

    // ACT
    cy.contains("#slider-carousel h2", "Full-Fledged practice website").should(
      "be.visible",
    ); // Valida o carregamento da Home Page checando o carrosel exclusivo

    cy.contains(" Signup / Login").click();

    // Página de login
    cy.url().should("include", "/login");
    cy.contains("Login to your account").should("be.visible");

    cy.fixture("standard-user-profile").then((data) => {
      // Acesso dos dados JSON

      // Realiza o LOGIN
      cy.get('[data-qa="login-email"]').type(this.emailRegistered);
      cy.get('[data-qa="login-password').type(data.accountInfo.password);
      cy.get('[data-qa="login-button"]').click();

      cy.contains(" Logged in as " + data.signup.name).should("be.visible"); // Verifica usário logado

      // Relaciona o nome e valor junto ao id que se encontra o produto
      const targetIds = ["1", "3"];
      targetIds.forEach((id) => {
        cy.get(`.productinfo [data-product-id="${id}"]`)
          .parent()
          .then(($container) => {
            const productName = $container.find("p").first().text().trim(); // Nome
            const valueProduct = $container.find("h2").first().text().trim(); // Valor
            cy.wrap(productName).as(`productName_add_cart${id}`);
            cy.wrap(valueProduct).as(`value${id}`);
            cy.get(`[data-product-id="${id}"]`).first().click({ force: true }); // Adiciona ao carrinho
          });
        cy.contains("Continue Shopping").should("be.visible").click();
      });

      cy.get(".navbar-nav").within(() => {
        cy.contains(" Cart").should("be.visible").click(); // Direciona ao carrinho
      });

      // Página do carrinho
      cy.url().should("include", "/view_cart");
      cy.contains("Shopping Cart").should("be.visible");

      cy.contains("Proceed To Checkout").should("be.visible").click(); // Prossegue para confirmação

      cy.contains("Address Details").should("be.visible");

      targetIds.forEach((id) => {
        cy.get(`#product-${id}`).within(() => {
          // Nome do produto referente ao clique do adicionar ao carrinho
          cy.get(`@productName_add_cart${id}`).then((productName) => {
            cy.get(".cart_description h4 a").should("have.text", productName);
          });
          // Quantidade
          cy.get(".cart_quantity button").should("have.text", "1");

          // Valor referente ao produto escolhido e adicionado ao carrinho
          cy.get(`@value${id}`).then((valueProduct) => {
            cy.get(".cart_total p").should("have.text", valueProduct);
          });
        });
      });

      // Confere os dados do pedido aos dados referentes ao cadastrado (arquivo json)
      cy.get("#address_delivery")
        .should(
          "contain",
          `${data.accountInfo.title}. ${data.addressInfo.firstName} ${data.addressInfo.lastName}`,
        )
        .and("contain", data.addressInfo.company)
        .and("contain", data.addressInfo.address1)
        .and("contain", data.addressInfo.address2)
        .and("contain", data.addressInfo.city)
        .and("contain", data.addressInfo.state)
        .and("contain", data.addressInfo.zipcode)
        .and("contain", data.addressInfo.country)
        .and("contain", data.addressInfo.mobileNumber);

      cy.get("#ordermsg textarea").type("TESTE"); // Preenche no campo Descrição

      cy.contains("Place Order").click();

      // Informa os dados do cartão para confirmar comprar (arquivo json)
      cy.contains("Payment").should("be.visible");

      cy.get('[data-qa="name-on-card"]').type(data.paymentInfo.nameOnCard);
      cy.get('[data-qa="card-number"]').type(data.paymentInfo.cardNumber);
      cy.get('[data-qa="cvc"]').type(data.paymentInfo.cvc);
      cy.get('[data-qa="expiry-month"]').type(data.paymentInfo.expirationMonth);
      cy.get('[data-qa="expiry-year"]').type(data.paymentInfo.expirationYear);
    });

    cy.get('[data-qa="pay-button"]').click(); // Confirma compra

    // cy.get("success_message")
    //   .should("be.visible")
    //   .and("have.text", "Your order has been placed successfully!"); // Compra Sucedida

    // IGNORADO: Ocorre uma Race Condition após o clique.
    // O redirecionamento da página destrói o DOM antes do Cypress conseguir capturar o alerta.
    // A garantia da compra é validada pelo estado final na tela seguinte (Order Placed).

    // ASSERT

    cy.get('[data-qa="order-placed"]')
      .should("be.visible")
      .and("contain.text", "Order Placed!"); // Confirmação da compra
    cy.contains(" Delete Account").click();
    cy.contains("Account Deleted!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
    cy.url().should("eq", "https://automationexercise.com/");
  });
});

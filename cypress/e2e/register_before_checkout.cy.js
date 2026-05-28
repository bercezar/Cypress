describe("register_before_checkout", () => {
  beforeEach(() => {
    cy.createUserDynamic();
  });
  it("Register before Checkout", () => {
    // ACT
    cy.fixture("register_user").then((data) => {
      cy.contains(" Logged in as " + data.signup.name).should("be.visible");

      // Relaciona o nome do produto junto ao id, todos estão dentro da mesma div pai
      const targetIds = ["1", "3"];
      targetIds.forEach((id) => {
        cy.get(`.productinfo [data-product-id="${id}"]`)
          .parent()
          .then(($container) => {
            const productName = $container.find("p").first().text().trim();
            const valueProduct = $container.find("h2").first().text().trim();
            cy.wrap(productName).as(`productName_add_cart${id}`);
            cy.wrap(valueProduct).as(`value${id}`);
            cy.get(`[data-product-id="${id}"]`).first().click({ force: true });
          });
        cy.contains("Continue Shopping").should("be.visible").click();
      });

      cy.contains(" Cart").click();

      cy.contains("Shopping Cart").should("be.visible");
      cy.contains("Proceed To Checkout").should("be.visible").click();

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

      cy.get("#ordermsg textarea").type("TESTE");

      cy.contains("Place Order").click();

      cy.contains("Payment").should("be.visible");

      cy.get('[data-qa="name-on-card"]').type(data.paymentInfo.nameOnCard);
      cy.get('[data-qa="card-number"]').type(data.paymentInfo.cardNumber);
      cy.get('[data-qa="cvc"]').type(data.paymentInfo.cvc);
      cy.get('[data-qa="expiry-month"]').type(data.paymentInfo.expirationMonth);
      cy.get('[data-qa="expiry-year"]').type(data.paymentInfo.expirationYear);
    });

    cy.get('[data-qa="pay-button"]').click();

    cy.get('[data-qa="order-placed"]').should("be.visible");

    cy.contains(" Delete Account").click();

    cy.contains("Account Deleted!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();

    // ASSERT
    cy.url().should("eq", "https://automationexercise.com/");
  });
});

# 🚀 E2E Test Automation | Cypress

Este repositório contém a automação de testes End-to-End (E2E) do portal [Automation Exercise](https://automationexercise.com/), desenvolvida com Cypress.

O projeto foi criado com o objetivo de praticar a automação de fluxos de negócio utilizando Cypress, aplicando conceitos de organização, reutilização de código e manutenção de testes automatizados.

---

## 📋 Casos de Teste Implementados

A suíte contempla os seguintes cenários:

- **Test Case 1:** [Register User](https://github.com/bercezar/Cypress/blob/main/cypress/e2e/register_user.cy.js)
- **Test Case 2:** [Login User with correct email and password](https://github.com/bercezar/Cypress/blob/main/cypress/e2e/login_correct.cy.js)
- **Test Case 3:** [Login User with incorrect email and password](https://github.com/bercezar/Cypress/blob/main/cypress/e2e/login_incorrect.cy.js)
- **Test Case 8:** [Verify All Products and product detail page](https://github.com/bercezar/Cypress/blob/main/cypress/e2e/verify-all-products-and-product-detail-page.cy.js)
- **Test Case 15:** [Place Order: Register before Checkout](https://github.com/bercezar/Cypress/blob/main/cypress/e2e/register_before_checkout.cy.js)
- **Test Case 17:** [Remove Products From Cart](https://github.com/bercezar/Cypress/blob/main/cypress/e2e/remove_product_from_cart.cy.js)
- **Test Case 18:** [View Category Products](https://github.com/bercezar/Cypress/blob/main/cypress/e2e/view-category-products.cy.js)
- **Test Case 19:** [View & Cart Brand Products](https://github.com/bercezar/Cypress/blob/main/cypress/e2e/view-and-cart-brand-products.cy.js)
- **Test Case 20:** [Search Products and Verify Cart After Login](https://github.com/bercezar/Cypress/blob/main/cypress/e2e/search_and_verify_cart_after-login.cy.js)
- **Test Case 24:** [Download Invoice after purchase order](https://github.com/bercezar/Cypress/blob/main/cypress/e2e/download-invoice-after-purchase-order.cy.js)

---

## 🏗️ Estrutura e Abordagens Utilizadas

### 1. Localização de Elementos

Em diversas partes da aplicação não existem identificadores exclusivos para os elementos da interface. Por esse motivo, os testes utilizam principalmente `cy.contains()` em conjunto com comandos como `.parent()`, `.find()` e `.within()` para localizar elementos a partir do texto exibido e do contexto em que estão inseridos.

### 2. Escopo de Elementos por Atributos

Nos cenários que envolvem listagem de produtos, atributos como `data`, `product` e `id` são utilizados para delimitar o contexto das buscas e interações.

Dessa forma, informações como nome e preço são obtidas do produto correto antes da execução das ações necessárias.

### 3. Custom Commands

Ações reutilizadas em diferentes cenários foram centralizadas em comandos customizados no arquivo `cypress/support/commands.js`.

O fluxo de login, por exemplo, foi abstraído para evitar duplicação de código e simplificar a preparação dos testes que exigem um usuário autenticado.

### 4. Fixtures

Os dados utilizados durante a execução dos testes ficam armazenados em arquivos JSON na pasta `fixtures`. Para os testes de cadastro, são gerados e-mails únicos durante a execução para evitar conflitos de registros.

### 5. Validação de Download de Arquivos

No cenário de download de faturas, foi utilizada uma integração entre Cypress e Node.js para verificar a existência do arquivo baixado.

Também foi implementada uma rotina de limpeza da pasta de downloads antes da execução dos testes, evitando interferência de arquivos gerados em execuções anteriores.

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Instalação

```bash
npm install
```

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
  })
 
  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
     
  it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'Teste, teste, teste, teste, teste'
        
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('rodrigofcosta37@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('rodrigofcosta37@gmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-númérico', function(){
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('rodrigofcosta37@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
      .type('Rodrigo')
      .should('have.value', 'Rodrigo')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Ferreira')
      .should('have.value', 'Ferreira')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('rodrigofcosta37@gmail.com')
      .should('have.value', 'rodrigofcosta37@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()      
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')      
  })

  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
})

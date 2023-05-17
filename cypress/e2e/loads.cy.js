/// <reference types="cypress"/>
describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.contains('.status__time', '00:01')
    cy.get('.game__cell--filled').should('have.length', 45)
    cy.get('.game__cell--filled').should('have.length', 45)
  })
})
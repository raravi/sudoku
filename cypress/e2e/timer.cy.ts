/// <reference types="Cypress" />

describe('timer', () => {
  it('shows 10 seconds', () => {
    cy.visit('/')
    for (let k = 0; k < 10; k++) {
      cy.contains('.status__time', `00:0${k}`)
    }
  })
  it.only('show minutes and seconds since game started', () => {
    cy.clock()
    cy.visit('/')
    cy.get('.status__time').contains('00:00')
    cy.tick(30_000)
    cy.get('.status__time').contains('00:30')
    cy.tick(30_000)
    cy.get('.status__time').contains('01:00')
  })
})

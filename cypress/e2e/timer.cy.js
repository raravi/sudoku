/// <reference types="cypress"/>
describe('Timer', () => {
    it('shows 10 sec', () => { 
      cy.visit('/')
      cy.contains('.status__time', '00:06', { timeout: 7000 })
      cy.get('.game__cell--filled').should('have.length', 45)
    })
    it.only('shows minutes and seconds since the game started', () => {
      cy.clock()
      cy.visit('/')
      cy.contains('.status__time', '00:00')
      cy.clock().then(clock => {
        clock.restore()

      })
      // cy.clock()
      // cy.tick(5000)
      // cy.tick(5000)
      // cy.tick(5000)
      cy.contains('.status__time', '00:05')
    })
  })
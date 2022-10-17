describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.contains('.status__time','00:03')
    cy.get('.game__cell--filled').should('have.length',45)
    cy.get('.game__cell').should('have.length',81)
  })
})
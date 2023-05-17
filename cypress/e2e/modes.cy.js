/// <reference types="cypress"/>
describe('play mode', () => {
    beforeEach(() => {

    })
    it('shows a different number of empty cells', () => {
        cy.visit('/')
        cy.get('select[name=status__difficulty-select')
            .should('have.value', 'Easy')
        cy.get('.game__cell--filled')
            .should('have.length', 45)
            its('length')
            .as('easyN')

            cy.get('select[name=status__difficulty-select').select('Medium')
            cy.get('.game__cell--filled')
            .should('have.length', 40)
            its('length')
            .as('mediumN')
            
            cy.get('select[name=status__difficulty-select').select('Hard')
            cy.get('.game__cell--filled')
            .should('have.length', 30)
            its('length')
            .as('hardN')
            .then(function () {
                expect(this.easyN, 'easy').to.be.greaterThan(this.mediumN)
                expect(this.mediumN, 'medium').to.be.greaterThan(this.hardN)
            })
    })
})
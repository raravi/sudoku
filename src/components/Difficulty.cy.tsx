/// <reference types="Cypress" />\
import { Difficulty } from './Difficulty'

describe('Difficulty selection functions properly', () => {
  it('selects dificulty level correctly', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(<Difficulty onChange={onChangeSpy} />)
    cy.get('select').select('Easy').should('contain.text', 'Easy');
    cy.get('select').select('Medium').should('contain.text', 'Medium');
    cy.get('select').select('Hard').should('contain.text', 'Hard');
  })
})
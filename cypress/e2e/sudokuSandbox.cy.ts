/// <reference types="Cypress" />

import _ from 'lodash';
import { getStartingSudokuValues, isGridComplete, removePossibleValuesForCells, fillMissingValuesInGrid } from '../support/utils';

describe('Sandbox', () => {
  let sudokuBoard: any;
  let filledIndices: any;

  beforeEach(() => {
    cy.visit('/').then(() => {
      cy.get(".game__cell.game__cell--filled").should('be.visible').then(() =>{
        const startingSudokuValues = getStartingSudokuValues();
        sudokuBoard = startingSudokuValues.startingBoard;
        filledIndices = startingSudokuValues.startingIndices;
        return;
      }).then(() => {
        while(!isGridComplete(sudokuBoard)) {
          sudokuBoard = removePossibleValuesForCells(sudokuBoard);
        }
      });
    });
  });

  it('Solves the puzzle', () => {
    fillMissingValuesInGrid(sudokuBoard, filledIndices);
    cy.contains('solved').should('exist');
  });

})
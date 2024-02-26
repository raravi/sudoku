import _ from 'lodash';
import { getStartingSudokuValues, fillMissingValuesInGrid, solveBoard, backtrackSolve } from '../support/utils';

describe('Solve The Sudoku Boards', () => {
  const defaultStabilityOptions = {pollInterval: 1000, timeout: 10000};
  let sudokuBoard: any;
  let startingIndices: any;

  describe('Solve Sudoku Board - Easy', () => {
    beforeEach(() => {
      cy.visit('/').then(() => {
        cy.get('#gameBoard').waitForStableDOM(defaultStabilityOptions);
        getStartingSudokuValues().then((startingSudokuValues) => {
          startingIndices = startingSudokuValues.startingIndices;
          sudokuBoard = startingSudokuValues.startingBoard;
          backtrackSolve(sudokuBoard);
        });
      });
    });
  
    it('Solves the puzzle using backtracking', () => {
      fillMissingValuesInGrid(sudokuBoard, startingIndices);
      cy.contains('solved').should('exist');
    });
  });

  describe('Solve Sudoku Board - Medium', () => {
    beforeEach(() => {
      cy.visit('/').then(() => {
        cy.findByTestId('difficulty-select').waitForStableDOM(defaultStabilityOptions).select('Medium');
        cy.get('#gameBoard').waitForStableDOM(defaultStabilityOptions);
        getStartingSudokuValues().then((startingSudokuValues) => {
          startingIndices = startingSudokuValues.startingIndices;
          sudokuBoard = startingSudokuValues.startingBoard;
          backtrackSolve(sudokuBoard);
        });
      });
    });
  
    it('Solves the puzzle using backtracking', () => {
      fillMissingValuesInGrid(sudokuBoard, startingIndices);
      cy.contains('solved').should('exist');
    });
  });

  describe('Solve Sudoku Board - Hard', () => {
    beforeEach(() => {
      cy.visit('/').then(() => {
        cy.findByTestId('difficulty-select').waitForStableDOM(defaultStabilityOptions).select('Hard');
        cy.get('#gameBoard').waitForStableDOM(defaultStabilityOptions);
        getStartingSudokuValues().then((startingSudokuValues) => {
          startingIndices = startingSudokuValues.startingIndices;
          sudokuBoard = startingSudokuValues.startingBoard;
          backtrackSolve(sudokuBoard);
        });
      });
    });
  
    it('Solves the puzzle using backtracking', () => {
      fillMissingValuesInGrid(sudokuBoard, startingIndices);
      cy.contains('solved').should('exist');
    });
  });

})
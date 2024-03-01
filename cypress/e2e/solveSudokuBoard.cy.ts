import _ from 'lodash';
import {
  getStartingSudokuValues,
  fillMissingValuesInGrid,
  solveBoard,
} from '../support/e2eUtils/utils';

describe('Solve The Sudoku Boards', () => {
  const defaultStabilityOptions = { pollInterval: 1000, timeout: 10000 };
  let sudokuBoard: any;
  let startingCompletedIndices: any;

  describe('Solve Sudoku Board - Easy', () => {
    const start = performance.now();
    beforeEach(() => {
      cy.visit('/').then(() => {
        cy.get('#gameBoard').waitForStableDOM(defaultStabilityOptions);
        getStartingSudokuValues().then((startingSudokuValues) => {
          startingCompletedIndices =
            startingSudokuValues.startingCompletedIndices;
          sudokuBoard = startingSudokuValues.startingBoard;
          solveBoard(sudokuBoard);
        });
      });
    });

    it('Solves the puzzle using backtracking', () => {
      console.log('Easy - using elimination', performance.now() - start);
      fillMissingValuesInGrid(sudokuBoard, startingCompletedIndices);
      // TODO: fix bug associated with checking for solved Grid
    });
  });

  describe('Solve Sudoku Board - Medium', () => {
    beforeEach(() => {
      cy.visit('/').then(() => {
        cy.findByTestId('difficulty-select')
          .waitForStableDOM(defaultStabilityOptions)
          .select('Medium');
        cy.get('#gameBoard').waitForStableDOM(defaultStabilityOptions);
        getStartingSudokuValues().then((startingSudokuValues) => {
          startingCompletedIndices =
            startingSudokuValues.startingCompletedIndices;
          sudokuBoard = startingSudokuValues.startingBoard;
          solveBoard(sudokuBoard);
        });
      });
    });

    it('Solves the puzzle using backtracking', () => {
      fillMissingValuesInGrid(sudokuBoard, startingCompletedIndices);
      // TODO: fix bug associated with checking for solved Grid
    });
  });

  describe('Solve Sudoku Board - Hard', () => {
    beforeEach(() => {
      cy.visit('/').then(() => {
        cy.findByTestId('difficulty-select')
          .waitForStableDOM(defaultStabilityOptions)
          .select('Hard');
        cy.get('#gameBoard').waitForStableDOM(defaultStabilityOptions);
        getStartingSudokuValues().then((startingSudokuValues) => {
          startingCompletedIndices =
            startingSudokuValues.startingCompletedIndices;
          sudokuBoard = startingSudokuValues.startingBoard;
          solveBoard(sudokuBoard);
        });
      });
    });

    it('Solves the puzzle using backtracking', () => {
      fillMissingValuesInGrid(sudokuBoard, startingCompletedIndices);
      // TODO: fix bug associated with checking for solved Grid
    });
  });
});

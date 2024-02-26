import _ from 'lodash';
import { useTimer } from 'react-timer-hook';
import { getStartingSudokuValues, fillMissingValuesInGrid, backtrackSolve, solveBoard } from '../support/utils';

describe('Solve The Sudoku Boards', () => {
  const defaultStabilityOptions = {pollInterval: 1000, timeout: 10000};
  let sudokuBoard: any;
  let startingIndices: any;

  describe.only('Solve Sudoku Board - Easy', () => {
    const start = performance.now();
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
      console.log("Easy - using elimination", performance.now() - start);
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
    const startTime1 = performance.now();
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
      const elapsedTime1 = performance.now() - startTime1;
      console.log("Time to solve using backtracking alone: ", elapsedTime1);
      fillMissingValuesInGrid(sudokuBoard, startingIndices);
      cy.contains('solved').should('exist');
    });
  });

  // describe('Solve Sudoku Board - Hard', () => {
  //   const startTime2 = performance.now();
  //   beforeEach(() => {
  //     cy.visit('/').then(() => {
  //       cy.findByTestId('difficulty-select').waitForStableDOM(defaultStabilityOptions).select('Hard');
  //       cy.get('#gameBoard').waitForStableDOM(defaultStabilityOptions);
  //       getStartingSudokuValues().then((startingSudokuValues) => {
  //         startingIndices = startingSudokuValues.startingIndices;
  //         sudokuBoard = solveBoard(startingSudokuValues);
  //       });
  //     });
  //   });
  
  //   it('Solves the puzzle using elimination THEN backtracking', () => {
  //     const elapsedTime2 = performance.now() - startTime2;
  //     console.log("Time to solve using elimination before backtracking: ", elapsedTime2);
  //     fillMissingValuesInGrid(sudokuBoard, startingIndices);
  //     cy.contains('solved').should('exist');
  //   });
  // });

})
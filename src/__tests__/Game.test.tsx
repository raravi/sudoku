import { expect, test } from '@jest/globals';
import { isSolved } from '../utils';
import {
  solvedSudokuBoard1,
  solvedSudokuBoard2,
  solvedSudokuBoard3,
  sudokuBoardConflictingValues,
  sudokuBoardMissingValues,
} from '../__mocks__/sudokuBoards';

test('Verifys that isSolved returns true for solved boards', () => {
  expect(isSolved(solvedSudokuBoard1)).toBe(true);
  expect(isSolved(solvedSudokuBoard2)).toBe(true);
  expect(isSolved(solvedSudokuBoard3)).toBe(true);
});

test('Verifys that isSolved returns false with conflicting values on board', () => {
  expect(isSolved(sudokuBoardConflictingValues)).toBe(false);
});

test('Verifys that isSolved returns false with missing values on board', () => {
  expect(isSolved(sudokuBoardMissingValues)).toBe(false);
});

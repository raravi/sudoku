import _ from 'lodash';

export const getStartingSudokuValues = () => {
  type GridMap = { [key: number]: { [key: number]: number } };
  let startingBoard: GridMap;
  let startingCompletedIndices: any;
  startingBoard = new Array(9).fill(null).map(() => new Array(9).fill(null));
  startingCompletedIndices = [];
  for (let index = 0; index < 81; index++) {
    let row = getRowFromIndex(index);
    let col = getColFromIndex(index);
    let cellValue;
    cy.findByTestId(`cell_${index}`).then(($element) => {
      cellValue = $element.text();
      startingBoard[row][col] = Number(cellValue);
      if (cellValue != '0') startingCompletedIndices.push(index);
    });
  }
  return cy.wrap({ startingBoard, startingCompletedIndices });
};

export const solveBoard = (grid: any, r = 0, c = 0): boolean => {
  if (r == 9) return true;
  else if (c === 9) return solveBoard(grid, r + 1, 0);
  else if (grid[r][c] !== 0) return solveBoard(grid, r, c + 1);
  else {
    for (let tryValue = 1; tryValue <= 9; tryValue++) {
      let valuesAssociatedToGrid = getValuesAssociatedToCell(r, c, grid);
      if (!valuesAssociatedToGrid.includes(tryValue)) {
        grid[r][c] = tryValue;
        if (solveBoard(grid, r, c + 1)) return true;
        grid[r][c] = 0;
      }
    }
    return false;
  }
};

export const fillMissingValuesInGrid = (
  grid: any,
  alreadySolvedCellIndices: any
) => {
  for (let index = 0; index < 81; index++) {
    if (alreadySolvedCellIndices.includes(index)) {
      continue;
    }
    let row = getRowFromIndex(index);
    let col = getColFromIndex(index);
    let value = grid[row][col];
    cy.findByTestId(`cell_${index}`)
      .click()
      .invoke('attr', 'class')
      .should('contain', 'game__cell--highlightselected');
    cy.get('.status__number').contains(value).click();
  }
};

const getValuesAssociatedToCell = (
  row: number,
  col: number,
  currentGrid: any
) => {
  const valuesFromColAndRow = getRowAndColumnValues(row, col, currentGrid);
  const valuesFromLocalBox = getLocalBoxValues(row, col, currentGrid);
  return [...new Set([...valuesFromColAndRow, ...valuesFromLocalBox])];
};

const getRowAndColumnValues = (row: number, col: number, currentGrid: any) => {
  const valuesAssociatedToCell: any = [];
  for (let index = 0; index < 9; index++) {
    valuesAssociatedToCell.push(currentGrid[row][index]);
    valuesAssociatedToCell.push(currentGrid[index][col]);
  }
  return valuesAssociatedToCell;
};

const getLocalBoxValues = (row: number, col: number, currentGrid: any) => {
  const valuesToRemove: any = [];
  const startingRow = row - (row % 3);
  const startingCol = col - (col % 3);
  for (let rowNum = startingRow; rowNum < startingRow + 3; rowNum++) {
    for (let colNum = startingCol; colNum < startingCol + 3; colNum++) {
      valuesToRemove.push(currentGrid[rowNum][colNum]);
    }
  }
  return valuesToRemove;
};

const getRowFromIndex = (index: number) => {
  return Math.floor(index / 9);
};

const getColFromIndex = (index: number) => {
  return index % 9;
};

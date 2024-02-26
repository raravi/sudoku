import _ from 'lodash';

export const getStartingSudokuValues = () => { 
  type GridMap = { [key: number]: { [key: number]: any } };
  let startingBoard: GridMap;
  let startingIndices: any;
  startingBoard = new Array(9).fill(null).map(() => new Array(9).fill(null).map(() => new Array(9).fill(true)));
  startingIndices = [];
  for(let index = 0; index < 81; index++) { 
      let row = getRowFromIndex(index);
      let col = getColFromIndex(index);
      let cellValue;
      cy.findByTestId(`cell_${index}`).then(($element) => {
        cellValue = $element.text();
        if(cellValue != '0') {
          startingBoard[row][col] = Number(cellValue);
          startingIndices.push(index);
        }
      });
  };
  return cy.wrap({startingBoard, startingIndices});
};

export const solveBoard = (startingSudokuValues: any) => {
  let solvedIndices = startingSudokuValues.startingIndices;
  let sudokuGrid= startingSudokuValues.startingBoard
  let count = 30;
  while(count > 0) {
    sudokuGrid = removePossibleValuesForCells(sudokuGrid, solvedIndices);
    count--;
  }
  return sudokuGrid;
}

export const backtrackSolve = (grid: any, r = 0, c = 0) => {
  console.log("Row and coll during solve: ", r, c, grid);
  if (r == 9) return grid;
  else if (c === 9) return backtrackSolve(grid, r + 1, 0);
  else if (!Array.isArray(grid[r][c]) && grid[r][c] !== 0) return backtrackSolve(grid, r, c + 1);
  else {
      for (let k = 1; k <= 9; k++) {
          let valuesAssociatedToGrid = getValuesAssociatedToCell(r, c, grid);
          // console.log("row, col, k, and vals associated", r, c, k, valuesAssociatedToGrid);
          if (!valuesAssociatedToGrid.includes(k)) {
              grid[r][c] = k;
              if (backtrackSolve(grid, r, c + 1)) {
                  return true;
              }
              grid[r][c] = 0;
          }
      }
      return false;
  }

}

export const fillMissingValuesInGrid = (grid: any, alreadySolvedCellIndices: any) => {
  console.log("This grid should be completed: ", grid);
  for(let index = 0; index < 81; index++) { 
    if(alreadySolvedCellIndices.includes(index)) {
      continue;
    }
    let row = getRowFromIndex(index);
    let col = getColFromIndex(index);
    let value = grid[row][col];
    cy.findByTestId(`cell_${index}`)
      .click()
      .invoke('attr', 'class')
      .should('contain', 'game__cell--highlightselected');
    cy.get(".status__number")
      .contains(value)
      .click()
  };
}

// paused for now, while we strategize on how to solve on hard mode
const isGridComplete = (board: any) => {
  for(let index =0; index < 81; index++){
    let row = getRowFromIndex(index);
    let col = getColFromIndex(index);
    if(Array.isArray(board[row][col])) return false;
  }
  return true;
}

const removePossibleValuesForCells = (currentBoard: any, solvedIndices: any) => {
  let newSudokuMap = _.cloneDeep(currentBoard);
  for(let index = 0; index < 81; index++) {
    if(solvedIndices.includes(index)) continue;
    let row = getRowFromIndex(index);
    let col = getColFromIndex(index);
    let cellValue = currentBoard[row][col];
    if(Array.isArray(cellValue)) {
      let valuesToRemove = getValuesAssociatedToCell(row, col, currentBoard);
      let newBoolArray = removePossibleValues(valuesToRemove, cellValue);
      newSudokuMap[row][col] = computeSudokuValue(newBoolArray);
    }
  }
  return newSudokuMap;
}

const getValuesAssociatedToCell = (row: number, col: number, currentGrid: any) => {
  const valuesToRemoveFromColAndRow = getRowAndColumnValuesAssociatedToCell(row, col, currentGrid);
  const valuesFromLocalBox = getLocalBoxValues(row, col, currentGrid);
  return [...new Set([...valuesToRemoveFromColAndRow, ...valuesFromLocalBox])];
}

const getRowAndColumnValuesAssociatedToCell = (row: number, col: number, currentGrid: any) => {
  const valuesToRemove = new Array();
  for(let index = 0; index < 9; index++){
    let valueInColumn = currentGrid[row][index];
    let valueInRow = currentGrid[index][col];

    if(!Array.isArray(valueInColumn) && !arrayHasValue(valuesToRemove, valueInColumn)) {
      valuesToRemove.push(valueInColumn);
    }
    if(!Array.isArray(valueInRow) && !arrayHasValue(valuesToRemove, valueInRow)) {
      valuesToRemove.push(valueInRow);
    }
  }
  return valuesToRemove;
}

const getLocalBoxValues = (row: number, col: number, currentGrid: any) => {
  const valuesToRemove: any = [];
  const startingRow = row - (row % 3);
  const startingCol = col - (col % 3);

  const finalRow = startingRow + 3;
  const finalCol = startingCol + 3;

  for(let rowNum = startingRow; rowNum < finalRow; rowNum++){
    for(let colNum = startingCol; colNum < finalCol; colNum++) {
      let valueInCell = currentGrid[rowNum][colNum];
      if(!Array.isArray(valueInCell) && !arrayHasValue(valuesToRemove, valueInCell)) {
        valuesToRemove.push(valueInCell);
      }
    }
  }
  return valuesToRemove;
}

const arrayHasValue = (array: any, value: any) => {
  return -1 < Number(array.indexOf(value))
}

const removePossibleValues = (values: any, booleanArray: any) => {
  values.map((value: number) => {
    booleanArray[(Number(value)-1)] = false;
  });
  return booleanArray
}

const computeSudokuValue = (boolArray: any) => {
  if(arrayHasOneTrueValueLeft(boolArray)) {
    return (boolArray.indexOf(true) + 1);
  } else {
    return boolArray;
  }
}

const arrayHasOneTrueValueLeft = (boolArray: any) => {
  return 1 === boolArray.filter((value: boolean) => value === true).length;
}

const getRowFromIndex = (index: number) => {
  return Math.floor(index / 9);
}

const getColFromIndex = (index: number) => {
  return index % 9;
}
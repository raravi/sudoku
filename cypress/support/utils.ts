import _ from 'lodash';

export const getStartingSudokuValues = () => { 
  type GridMap = { [key: number]: { [key: number]: any } };
  let startingBoard: GridMap;
  let startingIndices: any;
  startingIndices = [];
  startingBoard = new Array(9).fill(null).map(() => new Array(9).fill(null).map(() => new Array(9).fill(true)));

  for(let index = 0; index < 81; index++) { 
      let row = Math.floor(index / 9);
      let col = index % 9;
      cy.get("#cell_" + index).then(($element) => {
        let text = $element.text();
        if(text != '0') {
          startingBoard[row][col] = Number(text);
          startingIndices.push(index);
        }
      });
  };
  return {startingBoard, startingIndices};
};

export const isGridComplete = (board: any) => {
  for(let row = 0; row < 9; row++) {
    for(let col = 0; col < 9; col++){
      if(Array.isArray(board[row][col])) {
        return false;
      }
    }
  }
  return true;
}

export const removePossibleValuesForCells = (currentBoard: any) => {
  let newSudokuMap = _.cloneDeep(currentBoard);
  for(let row = 0; row < 9; row++) {
    for(let col = 0; col < 9; col++){
      let cellValue = currentBoard[row][col];
      if(Array.isArray(cellValue)) {
        let valuesToRemove = getValuesToRemove(row, col, currentBoard);
        newSudokuMap[row][col] = cleanBooleanArray(valuesToRemove, cellValue);
      }
    }
  }
  return newSudokuMap;
}

export const fillMissingValuesInGrid = (grid: any, alreadySolvedCellIndices: any) => {
  for(let index = 0; index < 81; index++) { 
    if(alreadySolvedCellIndices.includes(index)) {
      continue;
    }
    let row = Math.floor(index / 9);
    let col = index % 9;
    let value = grid[row][col];
    cy.get("#cell_" + index)
      .click()
      .invoke('attr', 'class')
      .should('contain', 'game__cell--highlightselected');
    cy.get(".status__number")
      .contains(value)
      .click()
  };
}

const getValuesToRemove = (row: number, col: number, currentGrid: any) => {
  const valuesToRemoveFromColAndRow = getRowAndColumnValuesFromArray(row, col, currentGrid);
  const valuesFromLocalBox = getLocalBoxValues(row, col, currentGrid);
  return [...new Set([...valuesToRemoveFromColAndRow, ...valuesFromLocalBox])];
}

const getRowAndColumnValuesFromArray = (row: number, col: number, currentGrid: any) => {
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

const cleanBooleanArray = (values: any, booleanArray: any) => {
  values.map((value: number) => {
    booleanArray[(Number(value)-1)] = false;
  });
  if(arrayHasOneTrueValueLeft(booleanArray)) {
    return (booleanArray.indexOf(true) + 1);
  } else {
    return booleanArray;
  }
}

const arrayHasOneTrueValueLeft = (boolArray: any) => {
  return 1 === boolArray.filter((value: boolean) => value === true).length;
}
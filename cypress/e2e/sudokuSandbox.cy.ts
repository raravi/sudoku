import _ from 'lodash';

describe('Sandbox', () => {

  const arrayHasValue = (array: any, value: any) => {
    return -1 < Number(array.indexOf(value))
  }

  const getStartingSudokuValues = () => { 
    type GridMap = { [key: number]: { [key: number]: any } };
    let sudokuCellMap: GridMap;
    sudokuCellMap = new Array(9).fill(null).map(() => new Array(9).fill(null).map(() => new Array(9).fill(true)));
    for(let index = 0; index < 81; index++) { 
      let row = Math.floor(index / 9);
      let col = index % 9;
      cy.get("#cell_" + index).then(($element) => {
        let text = $element.text(); 
        if(text != '0') {
          sudokuCellMap[row][col] = Number(text);
        }
      });
    };
    return sudokuCellMap;
  };

  const removePossibleValuesForCells = (currentBoard: any) => {
    let newSudokuMap = _.cloneDeep(currentBoard);
    for(let row = 0; row < 9; row++) {
      for(let col = 0; col < 9; col++){
        let cellValue = currentBoard[row][col];
        if(Array.isArray(cellValue)) {
          let valuesToRemove = getValuesToRemove(row, col, currentBoard);
          newSudokuMap[row][col] = cleanBooleanArray(row, col, valuesToRemove, cellValue);
        }
      }
    }
    return newSudokuMap;
  }

  const getValuesToRemove = (row: number, col: number, currentGrid: any) => {
    const valuesToRemoveFromColAndRow = getRowAndColumnValuesFromArray(row, col, currentGrid);
    const valuesFromLocalBox = getLocalBoxValues(row, col, currentGrid);
    return [...new Set([...valuesToRemoveFromColAndRow, ...valuesFromLocalBox])];
  }

  // This one is good
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

  //legit
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

  const cleanBooleanArray = (row: number, col: number, values: any, booleanArray: any) => {
    // console.log("row, col, bool arr", row, col, booleanArray);
    values.map((value: number) => {
      let index = Number(value)-1;
      booleanArray[index] = false;
    });
    if(hasOneOption(booleanArray)) {
      return (booleanArray.indexOf(true) + 1);
    } else {
      return booleanArray;
    }
    
  }


  const isGridComplete = (board: any) => {
    cy.log("Is grid complete?");
    for(let row = 0; row < 9; row++) {
      for(let col = 0; col < 9; col++){
        if(Array.isArray(board[row][col])) {
          cy.log("No");
          return false;
        }
      }
    }
    cy.log("Yes");
    return true;
  }

  const hasOneOption = (boolArray: any) => {
    return 1 === boolArray.filter((value: boolean) => value === true).length;
  }

  const fillGrid = () => {
    console.log("The grid is ready to be filled I guess ");
    return true;

  }

  let sudokuBoard: any;

  beforeEach(() => {
    cy.visit('http://localhost:3000/').then(() => {
      sudokuBoard = getStartingSudokuValues();
    }).then(() => {
      console.log("1 The sud board: ", sudokuBoard);
      while(!isGridComplete(sudokuBoard)) {
        sudokuBoard = removePossibleValuesForCells(sudokuBoard);
      }
    }).then(() => {
      console.log("Complete board: ", sudokuBoard);
      cy.pause();
    });

  });


  it('Solves the puzzle', () => {
    // console.log("Is the board ready?: ", isGridComplete(sudokuBoard));
    // console.log("Current state of the sudoku board: ", sudokuBoard);
    // let thisBoard = removePossibleValuesForCells(sudokuBoard);
    // console.log("Is the board ready?: ", isGridComplete(sudokuBoard));
    // console.log("Current state of the sudoku board: ", thisBoard);
    cy.get(".game").should('exist');
    cy.pause(); 
    // fillGrid();
  });

})
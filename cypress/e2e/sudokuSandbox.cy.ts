describe('Sandbox', () => {
  type GridMap = { [key: number]: { [key: number]: any } };
  let sudokuBoard: GridMap;


  const arrayHasValue = (array: any, value: any) => {
    return -1 < Number(array.indexOf(value))
  }

  const getStartingSudokuValues = () => {
    type GridMap = { [key: number]: { [key: number]: any } };
    let sudokuCellMap: GridMap;
    // cy.pause();
    cy.intercept('POST', '**threatListUpdates**').as('getModels');
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
    }
    cy.pause()
    cy.log("just got the sudoku starting map");
    cy.pause();
    // cy.wait('@getModels')
    // cy.wait('@getModels')
    return sudokuCellMap
  };

  const removeValuesFromBooleanArray = (values: any, booleanArray: any) => {
    for(let value in values){
      let indexOfBooleanArray = Number(value) - 1;
      booleanArray[indexOfBooleanArray] = false;
    }
    return booleanArray;
  }

  const getValuesToRemove = (row: number, col: number) => {
    const valuesToRemoveFromColAndRow = getRowAndColumnValuesFromArray(row, col);
    const valuesFromLocalBox = getLocalBoxValues(row, col);
    return [...new Set([...valuesToRemoveFromColAndRow, ...valuesFromLocalBox])];

  }

  const getRowAndColumnValuesFromArray = (row: number, col: number) => {
    const valuesToRemove = [];
    for(let index = 0; index < 9; index++){
      let valueInColumn = sudokuBoard[row][index];
      let valueInRow = sudokuBoard[index][col];

      if(!Array.isArray(valueInColumn) && !arrayHasValue(valuesToRemove, valueInColumn)) {
        valuesToRemove.push(valueInColumn);
      }
      if(!Array.isArray(valueInRow) && !arrayHasValue(valuesToRemove, valueInRow)) {
        valuesToRemove.push(valueInRow);
      }
    }
    return valuesToRemove;
  }

  const getLocalBoxValues = (row: number, col: number) => {
    console.log("Removing current box values");
    const valuesToRemove: any = [];
    const startingRow = row - (row % 3);
    const startingCol = col - (col % 3);

    const finalRow = startingRow + 3;
    const finalCol = startingCol + 3;

    for(let rowNum = startingRow; rowNum < finalRow; rowNum++){
      for(let colNum = startingCol; colNum < finalCol; colNum++) {

        let valueInCell = sudokuBoard[rowNum][colNum];
        if(!Array.isArray(valueInCell) && !arrayHasValue(valuesToRemove, valueInCell)) {
          valuesToRemove.push(valueInCell);
        }

      }
    }
    return valuesToRemove;
  }

  const removePossibleValuesForCells = (currentBoard: GridMap) => {
    let newBoard = Object.assign({}, currentBoard);
    for(let row = 0; row < 9; row++) {
      for(let col = 0; col < 9; col++){
        if(Array.isArray(newBoard[row][col])) {
          let valuesToRemove = getValuesToRemove(row, col);
          let currentConditionalArray = Object.assign({}, newBoard[row][col]);
          newBoard[row][col] = removeValuesFromBooleanArray(valuesToRemove, currentConditionalArray)
        }
      }
    } 
    return newBoard;
  }

  const isGridComplete = () => {
    cy.log("Is grid complete?");
    for(let row = 0; row < 9; row++) {
      for(let col = 0; row < 9; col++){
        if(Array.isArray(sudokuBoard[row][col])) {
          cy.log("No");
          return false;
        }
      }
    }
    cy.log("Yes");
    return true;
  }

  const hasOneOption = (boolArray: any) => {
    return boolArray.filter((value: boolean) => value === true).length;
  }

  const convertPendingConditionalArrays = () => {
    console.log("We made it here");
    cy.pause();
    for(let row = 0; row < 9; row++) {
      for(let col = 0; col < 9; col++){
        let currentCell = sudokuBoard[row][col];
        if(Array.isArray(currentCell) && hasOneOption(currentCell)) {
          sudokuBoard[row][col] = (currentCell.indexOf(true) + 1);
        }
      }
    }
  }

  const fillGrid = () => {
    console.log("The grid is ready to be filled I guess ", sudokuBoard);
    cy.pause();
    return true;

  }

  before('Get Current value of the sudoku board', () => {
    cy.visit('http://localhost:3000/').then(() => {
      sudokuBoard = getStartingSudokuValues();
    });
  });

  // describe("Solves the puzzle, but in a new describe block", () => {
    it('Solves the puzzle', ()=> {
      cy.log("Solving the puzzle ... ");
      cy.pause();
      let count = 0;
      while(!isGridComplete()) {
        cy.log("In the loop");
        count++;
        sudokuBoard = removePossibleValuesForCells(sudokuBoard);
        convertPendingConditionalArrays();
        cy.log(`This is the board after ${count} iterations:`, sudokuBoard);
        cy.pause();
      }
      fillGrid();
    });
  // });

})
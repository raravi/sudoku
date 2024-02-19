describe('Sandbox', () => {
  type GridMap = { [key: number]: { [key: number]: string } };
  let sudokuBoard: GridMap;


  const getStartingSudokuValues = (): Cypress.Chainable<GridMap> => {
    type GridMap = { [key: number]: { [key: number]: string } };
    const sudokuCellMap: GridMap = {};
  
    return cy.get("table.game__board").then(($table) => {
      const $rows = $table.find('tr');
      $rows.each((rowNum, row) => {
        sudokuCellMap[rowNum] = {};
        const $cells = Cypress.$(row).find('td');
        $cells.each((cellNum, cell) => {
          let cellValue = Cypress.$(cell).text();
          sudokuCellMap[rowNum][cellNum] = cellValue;
        });
      });
      return sudokuCellMap; // Return the sudokuCellMap
    });
  };


  before('Go to local host', () => {
    cy.visit('http://localhost:3000/')
  })

  before('Get Current value of the sudoku board', () => {
    getStartingSudokuValues().then( startingValues => {
      sudokuBoard = startingValues;
    });
  })

  it('Solves the puzzle', ()=> {
    console.log("Hello?", sudokuBoard);
  });

})
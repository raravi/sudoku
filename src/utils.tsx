export function isSolved(gameArray: String[]) {
  let grid = createGridFromGameArray(gameArray);
  for (let index = 0; index < gameArray.length; index++) {
    let cell = gameArray[index];
    let row = getRowFromIndex(index);
    let col = getColFromIndex(index);
    if ('0' == cell) return false;
    if (getValuesAssociatedToCell(row, col, grid).includes(cell)) return false;
  }
  return true;
}

const createGridFromGameArray = (gameArray: String[]) => {
  let grid: String[][] = [];
  for (let i = 0; i < gameArray.length; i += 9) {
    const subArray: String[] = gameArray.slice(i, i + 9);
    grid.push(subArray);
  }
  return grid;
};

const getRowFromIndex = (index: number) => {
  return Math.floor(index / 9);
};

const getColFromIndex = (index: number) => {
  return index % 9;
};

const getValuesAssociatedToCell = (
  row: number,
  col: number,
  currentGrid: String[][]
) => {
  const valuesFromColAndRow = getRowAndColumnValues(row, col, currentGrid);
  const valuesFromLocalBox = getLocalBoxValues(row, col, currentGrid);
  return [...new Set([...valuesFromColAndRow, ...valuesFromLocalBox])];
};

const getRowAndColumnValues = (
  row: number,
  col: number,
  currentGrid: String[][]
) => {
  const valuesAssociatedToCell: String[] = [];
  for (let index = 0; index < 9; index++) {
    if (index != col) valuesAssociatedToCell.push(currentGrid[row][index]);
    if (index != row) valuesAssociatedToCell.push(currentGrid[index][col]);
  }
  return valuesAssociatedToCell;
};

const getLocalBoxValues = (row: number, col: number, currentGrid: any) => {
  const valuesToRemove: any = [];
  const startingRow = row - (row % 3);
  const startingCol = col - (col % 3);
  for (let rowNum = startingRow; rowNum < startingRow + 3; rowNum++) {
    for (let colNum = startingCol; colNum < startingCol + 3; colNum++) {
      if (rowNum == row && colNum == col) continue;
      valuesToRemove.push(currentGrid[rowNum][colNum]);
    }
  }
  return valuesToRemove;
};

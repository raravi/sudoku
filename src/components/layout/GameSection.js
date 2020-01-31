import React from 'react';

export const GameSection = (props) => {
  const rows = [0,1,2,3,4,5,6,7,8];

  function _isCellRelatedToSelectedCell(row, column) {
    if (props.cellSelected === row * 9 + column) {
      return true;
    }
    let rowOfSelectedCell = Math.floor(props.cellSelected / 9);
    let columnOfSelectedCell = props.cellSelected % 9;
    if (rowOfSelectedCell === row || columnOfSelectedCell === column) {
      return true;
    }
    return [  [0,3,0,3],
              [0,3,3,6],
              [0,3,6,9],
              [3,6,0,3],
              [3,6,3,6],
              [3,6,6,9],
              [6,9,0,3],
              [6,9,3,6],
              [6,9,6,9]
            ].some((array) => {
              if (rowOfSelectedCell > array[0]-1 && row > array[0]-1 &&
                  rowOfSelectedCell < array[1] && row < array[1] &&
                  columnOfSelectedCell > array[2]-1 && column > array[2]-1 &&
                  columnOfSelectedCell < array[3] && column < array[3])
                  return true;
              return false;
            });
  }

  function _isCellSameAsSelectedCell(row, column) {
    if (props.fastMode) {
      if (props.numberSelected === props.gameArray[row * 9 + column]) {
        return true;
      }
      return false;
    } else {
      if (props.cellSelected === row * 9 + column) {
        return true;
      }
      if (props.gameArray[props.cellSelected] === '0') {
        return false;
      }
      if (props.gameArray[props.cellSelected] === props.gameArray[row * 9 + column]) {
        return true;
      }
    }
  }

  function _selectedCell(indexOfArray, value) {
    if (value !== '0') {
      if (props.initArray[indexOfArray] === '0') {
        return (
          <td className="game__cell game__cell--userfilled game__cell--selected" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
        )
      } else {
        return (
          <td className="game__cell game__cell--filled game__cell--selected" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
        )
      }
    } else {
      return (
        <td className="game__cell game__cell--selected" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
      )
    }
  }

  function _unselectedCell(indexOfArray, value) {
    if (value !== '0') {
      if (props.initArray[indexOfArray] === '0') {
        return (
          <td className="game__cell game__cell--userfilled" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
        )
      } else {
        return (
          <td className="game__cell game__cell--filled" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
        )
      }
    } else {
      return (
        <td className="game__cell" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
      )
    }
  }

  return (
    <section className="game">
      <table className="game__board">
        <tbody>
          {
            rows.map((row) => {
              return (
                <tr className="game__row" key={row}>
                  {
                    rows.map((column) => {
                      const indexOfArray = row * 9 + column;
                      const value = props.gameArray[indexOfArray];

                      if (props.cellSelected === indexOfArray) {
                        if (value !== '0') {
                          if (props.initArray[indexOfArray] === '0') {
                            return (
                              <td className="game__cell game__cell--userfilled game__cell--highlightselected" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
                            )
                          } else {
                            return (
                              <td className="game__cell game__cell--filled game__cell--highlightselected" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
                            )
                          }
                        } else {
                          return (
                            <td className="game__cell game__cell--highlightselected" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
                          )
                        }
                      }

                      if (props.fastMode) {
                        if (props.numberSelected !== '0' && _isCellSameAsSelectedCell(row, column)) {
                          return _selectedCell(indexOfArray, value);
                        } else {
                          return _unselectedCell(indexOfArray, value);
                        }
                      } else {
                        if (props.cellSelected !== -1 && _isCellSameAsSelectedCell(row, column)) {
                          return _selectedCell(indexOfArray, value);
                        } else {
                          return _unselectedCell(indexOfArray, value);
                        }
                      }
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </section>
  )
}

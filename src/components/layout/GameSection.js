import React from 'react';

export const GameSection = (props) => {
  const rows = [0,1,2,3,4,5,6,7,8];
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

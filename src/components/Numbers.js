import React from 'react';

export const Numbers = (props) => {
  return (
    <div className="status__numbers">
      {
        [1,2,3,4,5,6,7,8,9].map((number) => {
          if (props.numberSelected === number.toString()) {
            return (
              <div className="status__number status__number--selected" key={number} onClick={() => props.onClickNumber(number.toString())}>{number}</div>
            )
          } else {
            return (
              <div className="status__number" key={number} onClick={() => props.onClickNumber(number.toString())}>{number}</div>
            )
          }
        })
      }
    </div>
  )
}

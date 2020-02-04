import React from 'react';

/**
 * React component for the Difficulty Selector.
 */
export const Difficulty = (props) => {
  return (
    <div className="status__difficulty">
      <span className="status__difficulty-text">Difficulty:&nbsp;&nbsp;</span>
      <select name="status__difficulty-select" className="status__difficulty-select" defaultValue={props.difficulty} onChange={props.onChange}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  )
}

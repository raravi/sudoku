import React from 'react';
import { Difficulty } from '../Difficulty';
import { Timer } from '../Timer';
import { Numbers } from '../Numbers';
import { Action } from '../Action';
import { Mode } from '../Mode';

export const StatusSection = (props) => {
  return (
    <section className="status">
      <Difficulty difficulty={props.difficulty} onChange={props.onChange} />
      <Timer timeGameStarted={props.timeGameStarted} won={props.won} />
      <Numbers numberSelected={props.numberSelected} onClickNumber={(number) => props.onClickNumber(number)} />
      <div className="status__actions">
        <Action action='undo' onClickAction={props.onClickUndo} />
        <Action action='erase' onClickAction={props.onClickErase} />
        <Action action='hint' onClickAction={props.onClickHint} />
        <Mode mode='mistakes' onClickMode={props.onClickMistakesMode} />
        <Mode mode='fast' onClickMode={props.onClickFastMode} />
      </div>
    </section>
  )
}

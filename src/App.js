import React, { useState } from 'react';
import moment from 'moment';
import { Header } from './components/layout/Header';
import { GameSection } from './components/layout/GameSection';
import { StatusSection } from './components/layout/StatusSection';
import { Footer } from './components/layout/Footer';
import './App.css';

function App() {
  let initArray = [ '8', '0', '0', '0', '2', '0', '9', '1', '0',
                    '2', '3', '4', '5', '1', '0', '0', '0', '7',
                    '7', '1', '0', '0', '8', '0', '0', '5', '4',
                    '6', '0', '0', '1', '0', '0', '3', '0', '5',
                    '1', '8', '5', '0', '0', '0', '7', '2', '0',
                    '0', '4', '0', '6', '0', '2', '8', '0', '0',
                    '0', '6', '8', '0', '0', '0', '4', '0', '0',
                    '0', '0', '0', '0', '0', '0', '1', '6', '2',
                    '0', '0', '0', '4', '0', '7', '5', '3', '0' ];
  let nullArray = [ '0', '0', '0', '0', '0', '0', '0', '0', '0',
                    '0', '0', '0', '0', '0', '0', '0', '0', '0',
                    '0', '0', '0', '0', '0', '0', '0', '0', '0',
                    '0', '0', '0', '0', '0', '0', '0', '0', '0',
                    '0', '0', '0', '0', '0', '0', '0', '0', '0',
                    '0', '0', '0', '0', '0', '0', '0', '0', '0',
                    '0', '0', '0', '0', '0', '0', '0', '0', '0',
                    '0', '0', '0', '0', '0', '0', '0', '0', '0',
                    '0', '0', '0', '0', '0', '0', '0', '0', '0' ];
  let solvedArray=[ '8', '5', '6', '7', '2', '4', '9', '1', '3',
                    '2', '3', '4', '5', '1', '9', '6', '8', '7',
                    '7', '1', '9', '3', '8', '6', '2', '5', '4',
                    '6', '9', '2', '1', '7', '8', '3', '4', '5',
                    '1', '8', '5', '9', '4', '3', '7', '2', '6',
                    '3', '4', '7', '6', '5', '2', '8', '9', '1',
                    '5', '6', '8', '2', '3', '1', '4', '7', '9',
                    '4', '7', '3', '8', '9', '5', '1', '6', '2',
                    '9', '2', '1', '4', '6', '7', '5', '3', '8' ];
  let [ gameArray, setGameArray ] = useState(initArray);
  let [ difficulty,setDifficulty ] = useState('Easy');
  let [ numberSelected, setNumberSelected ] = useState('0');
  let [ timeGameStarted, setTimeGameStarted ] = useState(moment());
  let [ mistakesMode, setMistakesMode ] = useState(false);
  let [ fastMode, setFastMode ] = useState(false);
  let [ cellSelected, setCellSelected ] = useState(-1);
  let [ history, setHistory ] = useState([]);

  function _createNewGame() {
    // // TODO: Create New Sudoku Position, get it along with solved position
    setGameArray(initArray);
    setNumberSelected('0');
    setTimeGameStarted(moment());
    setCellSelected(-1);
    setHistory([]);
  }

  function _fillCell(index, value) {
    if (initArray[index] === '0') {
      // Direct copy results in interesting set of problems, investigate more!
      let tempArray = gameArray.slice();
      let tempHistory = history.slice();

      // Can't use tempArray here, due to Side effect below!!
      tempHistory.push(gameArray.slice());
      setHistory(tempHistory);

      tempArray[index] = value;
      setGameArray(tempArray);
    }
  }

  function _userFillCell(index, value) {
    if (mistakesMode) {
      if (value === solvedArray[index]) {
        _fillCell(index, value);
      }
      else {
        // // TODO: Flash - Mistakes not allowed in Mistakes Mode
      }
    } else {
      _fillCell(index, value);
    }
  }

  function onClickNewGame() {
    _createNewGame();
  }

  function onClickCell(indexOfArray) {
    if (fastMode && numberSelected !== '0') {
      _userFillCell(indexOfArray, numberSelected);
    }
    setCellSelected(indexOfArray);
  }

  function onChangeDifficulty(e) {
    setDifficulty(e.target.value);
    _createNewGame();
  }

  function onClickNumber(number) {
    if (fastMode) {
      setNumberSelected(number)
    } else if (cellSelected !== -1) {
      _userFillCell(cellSelected,number);
    }
  }

  function onClickUndo() {
    if(history.length) {
      let tempHistory = history.slice();
      let tempArray = tempHistory.pop();
      setHistory(tempHistory);
      setGameArray(tempArray);
    }
  }

  function onClickErase() {
    if(cellSelected !== -1 && gameArray[cellSelected] !== '0') {
      _fillCell(cellSelected, '0');
    }
  }

  function onClickHint() {
    if (cellSelected !== -1) {
      _fillCell(cellSelected, solvedArray[cellSelected]);
    }
  }

  function  onClickMistakesMode() {
    setMistakesMode(!mistakesMode);
  }

  function onClickFastMode() {
    if (fastMode) {
      setNumberSelected('0');
    }
    setCellSelected(-1);
    setFastMode(!fastMode);
  }

  return (
    <div className="container">
      <Header onClick={onClickNewGame}/>
      <div className="innercontainer">
        <GameSection gameArray={gameArray} initArray={initArray} fastMode={fastMode} numberSelected={numberSelected} cellSelected={cellSelected} onClick={(indexOfArray) => onClickCell(indexOfArray)}/>
        <StatusSection difficulty={difficulty} numberSelected={numberSelected} timeGameStarted={timeGameStarted} onClickNumber={(number) => onClickNumber(number)} onChange={(e) => onChangeDifficulty(e)} onClickUndo={onClickUndo} onClickErase={onClickErase} onClickHint={onClickHint} onClickMistakesMode={onClickMistakesMode} onClickFastMode={onClickFastMode} />
      </div>
      <Footer />
    </div>
  );
}

export default App;

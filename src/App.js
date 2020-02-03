import React, { useState } from 'react';
import moment from 'moment';
import { Header } from './components/layout/Header';
import { GameSection } from './components/layout/GameSection';
import { StatusSection } from './components/layout/StatusSection';
import { Footer } from './components/layout/Footer';
import './App.css';
import { getSudoku } from './sudoku';

function App() {
  let initialArray = [ '8', '0', '0', '0', '2', '0', '9', '1', '0',
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
  let initialSolvedArray=[ '8', '5', '6', '7', '2', '4', '9', '1', '3',
                    '2', '3', '4', '5', '1', '9', '6', '8', '7',
                    '7', '1', '9', '3', '8', '6', '2', '5', '4',
                    '6', '9', '2', '1', '7', '8', '3', '4', '5',
                    '1', '8', '5', '9', '4', '3', '7', '2', '6',
                    '3', '4', '7', '6', '5', '2', '8', '9', '1',
                    '5', '6', '8', '2', '3', '1', '4', '7', '9',
                    '4', '7', '3', '8', '9', '5', '1', '6', '2',
                    '9', '2', '1', '4', '6', '7', '5', '3', '8' ];
  let sudoku = getSudoku();
  let [ gameArray, setGameArray ] = useState(initialArray);
  let [ difficulty,setDifficulty ] = useState('Easy');
  let [ numberSelected, setNumberSelected ] = useState('0');
  let [ timeGameStarted, setTimeGameStarted ] = useState(moment());
  let [ mistakesMode, setMistakesMode ] = useState(false);
  let [ fastMode, setFastMode ] = useState(false);
  let [ cellSelected, setCellSelected ] = useState(-1);
  let [ history, setHistory ] = useState([]);
  let [ initArray, setInitArray ] = useState(initialArray);
  let [ solvedArray, setSolvedArray ] = useState(initialSolvedArray);
  let [ overlay, setOverlay] = useState(false);
  let [won, setWon ] = useState(false);

  function _getBoxCenter(box) {
    switch(box) {
      case 0: return [1,1];
      case 1: return [1,4];
      case 2: return [1,7];
      case 3: return [4,1];
      case 4: return [4,4];
      case 5: return [4,7];
      case 6: return [7,1];
      case 7: return [7,4];
      case 8: return [7,7];
    }
  }

  function _getIndexOfCell(box, cell) {
    let [row, column] = _getBoxCenter(box);
    switch(cell) {
      case 0: {row--; column--; break;}
      case 1: {row--; break;}
      case 2: {row--; column++; break;}
      case 3: {column--; break;}
      case 4: {break;}
      case 5: {column++; break;}
      case 6: {row++; column--; break;}
      case 7: {row++; break;}
      case 8: {row++; column++; break;}
    }
    return row * 9 + column;
  }

  function _cellAvailable(tempInitArray, box, value) {
    return tempInitArray[_getIndexOfCell(box, value)] === '0' ? 0 : 1;
  }

  function _generateUniqueSudoku(solvedArray, e) {
    let currentDifficulty = difficulty;
    let boxes = 9;
    let cells = 9;
    let minimumCells, maximumCells, totalCells, box, cell;

    let tempInitArray = nullArray.slice();
    let boxCounts = [ 0,0,0,
                      0,0,0,
                      0,0,0 ];
    let boxesAvailable = [];
    let cellsAvailable = [];

    if (e)
      currentDifficulty = e.target.value;

    if (currentDifficulty === 'Easy') {
      minimumCells = 3;
      maximumCells = 7;
      totalCells = 45;
    }
    else if (currentDifficulty === 'Medium') {
      minimumCells = 2;
      maximumCells = 6;
      totalCells = 40;
    }
    else {
      minimumCells = 1;
      maximumCells = 5;
      totalCells = 30;
    }

    for (let j = 0; j < 9; j++) {
      boxCounts[j] =  _cellAvailable(tempInitArray, j, 0) +
                      _cellAvailable(tempInitArray, j, 1) +
                      _cellAvailable(tempInitArray, j, 2) +
                      _cellAvailable(tempInitArray, j, 3) +
                      _cellAvailable(tempInitArray, j, 4) +
                      _cellAvailable(tempInitArray, j, 5) +
                      _cellAvailable(tempInitArray, j, 6) +
                      _cellAvailable(tempInitArray, j, 7) +
                      _cellAvailable(tempInitArray, j, 8);
    }

    for (let i = 0; i < totalCells; i++) {
      boxesAvailable = [];
      for (let j = 0; j < 9; j++) {
        if (boxCounts[j] < minimumCells) {
          boxesAvailable.push(j);
        }
      }
      if (boxesAvailable) {
        for (let j = 0; j < 9; j++) {
          if (boxCounts[j] < maximumCells) {
            boxesAvailable.push(j);
          }
        }
      }
      box = boxesAvailable[Math.random() * boxesAvailable.length | 0];

      cellsAvailable = [];
      for (let j = 0; j < 9; j++) {
        if ( tempInitArray[_getIndexOfCell(box, j)] === '0') {
          cellsAvailable.push(j);
        }
      }
      cell = cellsAvailable[Math.random() * cellsAvailable.length | 0];

      let index = _getIndexOfCell(box, cell);
      tempInitArray[index] = solvedArray[index]
      boxCounts[box]++;
    }

    return tempInitArray;
  }

  function _createNewGame(e) {
    let tempInitArray = nullArray.slice();
    let tempSolvedArray = nullArray.slice();

    let str = sudoku.generate(60);

    [...str].forEach((value, index) => {
      tempInitArray[index] = value === '.'
                          ? '0'
                          : value;
    });
    str = sudoku.solve(str);
    [...str].forEach((value, index) => {
      tempSolvedArray[index] = value;
    });
    tempInitArray = _generateUniqueSudoku(tempSolvedArray, e);

    setInitArray(tempInitArray);
    setGameArray(tempInitArray);
    setSolvedArray(tempSolvedArray);
    setNumberSelected('0');
    setTimeGameStarted(moment());
    setCellSelected(-1);
    setHistory([]);
    setWon(false);
  }

  function _isSolved(index, value) {
    if (gameArray.every((cell, cellIndex) => {
          if (cellIndex === index)
            return value === solvedArray[cellIndex];
          else
            return cell === solvedArray[cellIndex];
        })) {
      return true;
    }
    return false;
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

      if (_isSolved(index, value)) {
        setOverlay(true);
        setWon(true);
      }
    }
  }

  function _userFillCell(index, value) {
    if (mistakesMode) {
      if (value === solvedArray[index]) {
        _fillCell(index, value);
      }
      else {
        // TODO: Flash - Mistakes not allowed in Mistakes Mode
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
    _createNewGame(e);
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

  function onClickOverlay() {
    setOverlay(false);
    _createNewGame();
  }

  return (
    <>
      <div className={overlay?"container blur":"container"}>
        <Header onClick={onClickNewGame}/>
        <div className="innercontainer">
          <GameSection gameArray={gameArray} initArray={initArray} fastMode={fastMode} numberSelected={numberSelected} cellSelected={cellSelected} onClick={(indexOfArray) => onClickCell(indexOfArray)}/>
          <StatusSection difficulty={difficulty} numberSelected={numberSelected} timeGameStarted={timeGameStarted} won={won} onClickNumber={(number) => onClickNumber(number)} onChange={(e) => onChangeDifficulty(e)} onClickUndo={onClickUndo} onClickErase={onClickErase} onClickHint={onClickHint} onClickMistakesMode={onClickMistakesMode} onClickFastMode={onClickFastMode} />
        </div>
        <Footer />
      </div>
      <div className= { overlay
                        ? "overlay overlay--visible"
                        : "overlay"
                      }
           onClick={onClickOverlay}
      >
        <h2 className="overlay__text">
          You <span className="overlay__textspan1">solved</span> <span className="overlay__textspan2">it!</span>
        </h2>
      </div>
    </>
  );
}

export default App;

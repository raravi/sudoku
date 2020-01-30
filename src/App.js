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
  let [ gameArray, setGameArray ] = useState(initArray);
  let [ difficulty,setDifficulty ] = useState('Easy');
  let [ numberSelected, setNumberSelected ] = useState('0');
  let [ timeGameStarted, setTimeGameStarted ] = useState(moment());

  function onClickNewGame() {
    setGameArray(nullArray);
    setTimeGameStarted(moment());
  }

  function onClickCell(indexOfArray) {
    if (numberSelected !== '0' && initArray[indexOfArray] === '0') {
      // Direct copy results in interesting set of problems, investigate more!
      let tempArray = gameArray.slice();
      tempArray[indexOfArray] = numberSelected;
      setGameArray(tempArray);
    }
  }

  function onClickNumber(number) {
    setNumberSelected(number);
  }

  function onChangeDifficulty(e) {
    setDifficulty(e.target.value);
    setGameArray(nullArray);
    setTimeGameStarted(moment());
  }

  return (
    <div className="container">
      <Header onClick={onClickNewGame}/>
      <div className="innercontainer">
        <GameSection gameArray={gameArray} initArray={initArray} onClick={(indexOfArray) => onClickCell(indexOfArray)}/>
        <StatusSection difficulty={difficulty} numberSelected={numberSelected} timeGameStarted={timeGameStarted} onClick={(number) => onClickNumber(number)} onChange={(e) => onChangeDifficulty(e)}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;

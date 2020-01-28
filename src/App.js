import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>
          Su<span className="header__group-one">do</span><span className="header__group-two">ku</span>
        </h1>
        <h2>
          New Game
        </h2>
      </header>
      <div className="innercontainer">
        <section className="game">
          <table className="game__board">
            <tbody>
              <tr className="game__row">
                <td className="game__cell">8</td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell">2</td>
                <td className="game__cell"></td>
                <td className="game__cell">9</td>
                <td className="game__cell">1</td>
                <td className="game__cell"></td>
              </tr>
              <tr className="game__row">
                <td className="game__cell">2</td>
                <td className="game__cell">3</td>
                <td className="game__cell">4</td>
                <td className="game__cell">5</td>
                <td className="game__cell">1</td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell">7</td>
              </tr>
              <tr className="game__row">
                <td className="game__cell">7</td>
                <td className="game__cell">1</td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell">8</td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell">5</td>
                <td className="game__cell">4</td>
              </tr>
              <tr className="game__row">
                <td className="game__cell">6</td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell">1</td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell">3</td>
                <td className="game__cell"></td>
                <td className="game__cell">5</td>
              </tr>
              <tr className="game__row">
                <td className="game__cell">1</td>
                <td className="game__cell">8</td>
                <td className="game__cell">5</td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell">7</td>
                <td className="game__cell">2</td>
                <td className="game__cell"></td>
              </tr>
              <tr className="game__row">
                <td className="game__cell"></td>
                <td className="game__cell">4</td>
                <td className="game__cell"></td>
                <td className="game__cell">6</td>
                <td className="game__cell"></td>
                <td className="game__cell">2</td>
                <td className="game__cell">8</td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
              </tr>
              <tr className="game__row">
                <td className="game__cell"></td>
                <td className="game__cell">6</td>
                <td className="game__cell">8</td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell">4</td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
              </tr>
              <tr className="game__row">
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell">1</td>
                <td className="game__cell">6</td>
                <td className="game__cell">2</td>
              </tr>
              <tr className="game__row">
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell"></td>
                <td className="game__cell">4</td>
                <td className="game__cell"></td>
                <td className="game__cell">7</td>
                <td className="game__cell">5</td>
                <td className="game__cell">3</td>
                <td className="game__cell"></td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="status">
        </section>

      </div>
      <footer className="footer">
        <p>&#169; 2020 Amith Raravi - source code on <a href="https://github.com/raravi/sudoku">Github</a></p>
      </footer>
    </div>
  );
}

export default App;

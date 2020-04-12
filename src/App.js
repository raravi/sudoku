import React from 'react';
import { Game } from './Game';
import './App.css';
import { NumberProvider } from './context/NumberContext';

/**
 * App is the root React component.
 */
export const App = () => {
  return (
    <NumberProvider>
      <Game />
    </NumberProvider>
  );
}

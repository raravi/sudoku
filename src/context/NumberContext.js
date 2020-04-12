import React, { createContext, useContext, useState } from 'react';

const NumberContext = createContext(['0', () => {}]);

export const NumberProvider = ({ children }) => {
  let [ numberSelected, setNumberSelected ] = useState('0');

  return (
    <NumberContext.Provider value={[ numberSelected, setNumberSelected ]}>
      {children}
    </NumberContext.Provider>
  );
};

export const useNumberValue = () => useContext(NumberContext);

// Usage
// const { numberSelected, setNumberSelected } = useNumberValue();

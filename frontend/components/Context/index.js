import React, { createContext, useState } from 'react';

const Context = createContext({ play: false, id: '1', setId: () => false });

export function PlayContextProvider({ children }) {
  const [id,setId] = useState('1');
  return (
    <Context.Provider value={{ id, setId }}>
      { children }
    </Context.Provider>
  );
}

export default Context;
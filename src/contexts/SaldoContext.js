// SaldoContext.js
import React, { createContext, useState } from 'react';

export const SaldoContext = createContext();

export const SaldoProvider = ({ children }) => {
  const [saldo, setSaldo] = useState(0); // Valor inicial do saldo

  return (
    <SaldoContext.Provider value={{ saldo, setSaldo }}>
      {children}
    </SaldoContext.Provider>
  );
};

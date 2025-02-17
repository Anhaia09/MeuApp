import React from 'react';
import Routes from './src/Routes'; // Importando as rotas
import { SaldoProvider } from './src/contexts/SaldoContext'; // Importando o contexto de saldo

const App = () => {
  return (
  <SaldoProvider>
    <Routes />; // Renderizando as rotas
  </SaldoProvider>// Renderizando o contexto de saldo
  );
};

export default App;

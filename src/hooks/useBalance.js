import { useState, useEffect } from 'react';
import { storage } from '../services/storage';

const useBalance = () => {
  const [saldo, setSaldo] = useState(0);

  // Função para carregar o saldo do MMKV
  const carregarSaldo = () => {
    const saldoSalvo = storage.getString('balance');
    
    const saldoNumerico = saldoSalvo ? parseFloat(saldoSalvo) : 0;
    if (!isNaN(saldoNumerico)) {
      setSaldo(saldoNumerico);
    } else {
      console.error('Valor inválido no MMKV para o saldo:', saldoSalvo);
      setSaldo(0);
      storage.set('balance', '0');
    }
  };

  // Carrega o saldo ao inicializar o hook
  useEffect(() => {
    carregarSaldo();

    // Adiciona um listener para monitorar mudanças no saldo
    const listener = storage.addOnValueChangedListener((key) => {
      if (key === 'balance') {
        carregarSaldo(); // Recarrega o saldo quando a chave 'balance' é alterada
      }
    });

    // Remove o listener quando o componente é desmontado
    return () => {
      listener.remove();
    };
  }, []);

  // Função para atualizar o saldo
  const atualizarSaldo = (novoSaldo) => {
    if (!isNaN(novoSaldo)) {
      storage.set('balance', novoSaldo.toString()); // Atualiza o MMKV
    } else {
      console.error('Valor inválido para o saldo:', novoSaldo);
    }
  };

  return { saldo, atualizarSaldo };
};

export default useBalance;

import React, { useContext, useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import styles from './AdicionarDespesaModal.styles'; // Importa os estilos
import { SaldoContext } from '../../contexts/SaldoContext'; // Importa o contexto de saldo

const AdicionarDepositoModal = ({ modalDepositoVisible, setModalDepositoVisible}) => {
  const [novoValor, setNovoValor] = useState('');
  const { saldo, setSaldo } = useContext(SaldoContext);

    // Função para adicionar depósito
    const adicionarDeposito = () => {
      // Verifica se a entrada contém apenas números e ponto decimal
      if (/^\d+(\.\d+)?$/.test(novoValor)) {
        Alert.alert('Valor inválido', 'Por favor, insira um número válido.');
        setNovoValor('');  // Limpa o campo
        return;
      }
    
      const valor = parseFloat(novoValor);
    
      if (isNaN(valor) || valor <= 0) {
        Alert.alert('Valor inválido', 'Por favor, insira um número maior que zero.');
        setNovoValor('');  // Limpa o campo
        return;
      }
    
      // Se o valor for válido, atualiza o saldo
      setSaldo(saldo + valor);
      setNovoValor('');  // Limpa o campo
      setModalDepositoVisible(false);  // Fecha o modal (se aplicável)
    };
    

  return (
    <Modal animationType="slide" transparent={true} visible={modalDepositoVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitulo}>Realizar Depósito</Text>

          <TextInput
            style={styles.input}
            placeholder="Valor (R$)"
            placeholderTextColor="#7F8C8D"
            keyboardType="numeric"
            value={novoValor}
            onChangeText={setNovoValor}
          />

          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={adicionarDeposito}>
            <Text style={styles.botaoSalvarTexto}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoFechar}
            onPress={() => setModalDepositoVisible(false)}>
            <Text style={styles.botaoFecharTexto}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AdicionarDepositoModal;

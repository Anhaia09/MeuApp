import React, {useContext, useState} from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import styles from './AdicionarDespesaModal.styles'; // Importa os estilos
import useBalance from '../../hooks/useBalance';
import { storage } from '../../services/storage';
import { handleChangeText } from '../../utils/validation';

const AdicionarDepositoModal = ({
  modalDepositoVisible,
  setModalDepositoVisible,
}) => {
  const [value, setValue] = useState('');
  const { atualizarSaldo } = useBalance();
  const [successoModalVisible, setSuccessoModalVisible] = useState(false);
  

  // Função para adicionar depósito
  const adicionarDeposito = () => {
    // Verifica se a entrada contém apenas números e ponto decimal
    if (!/^\d+(\.\d+)?$/.test(value)) {
      Alert.alert('Valor inválido', 'Por favor, insira um número válido.');
      setValue(''); // Limpa o campo
      return;
    }

    const newDeposit = parseFloat(value);
    

    if (isNaN(newDeposit) || newDeposit <= 0) {
      Alert.alert(
        'Valor inválido',
        'Por favor, insira um número maior que zero.',
      );
      setValue(''); // Limpa o campo
      return;
    }

    // Obtendo saldo salvo no MMKV

    const existingBalance = storage.getString('balance');
    
    const parsedBalance = existingBalance ? JSON.parse(existingBalance) : 0;

    // Adicionando nova despesa com ID
    const updatedBalance = parsedBalance + newDeposit;
    setValue(''); // Limpa o campo

    // Salvando no MMKV
    storage.set('balance', JSON.stringify(updatedBalance));

    // Atualizando o estado
    atualizarSaldo(updatedBalance);
    
    setModalDepositoVisible(false); // Fecha o modal de depósito
    setSuccessoModalVisible(true); // Exibe o modal de sucesso
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDepositoVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Realizar Depósito</Text>

            <TextInput
              style={styles.input}
              placeholder="Valor (R$)"
              placeholderTextColor="#7F8C8D"
              keyboardType="numeric"
              value={value}
              onChangeText={(text) => handleChangeText(text, setValue)}
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

      {/* Modal de sucesso */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={successoModalVisible}
        onRequestClose={() => setSuccessoModalVisible(false)}>
        <View style={styles.successoModalContainer}>
          <View style={styles.successoModalContent}>
            <Text style={styles.successoModalTitulo}>
              Depósito realizado com sucesso!
            </Text>
            <TouchableOpacity
              style={styles.successoBotaoFechar}
              onPress={() => setSuccessoModalVisible(false)}>
              <Text style={styles.successoBotaoFecharTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AdicionarDepositoModal;

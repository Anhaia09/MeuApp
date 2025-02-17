import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { validarValor } from '../../utils/validation'; // Importa a função de validação
import styles from './AdicionarDespesaModal.styles'; // Importa os estilos
import { validarData } from '../../utils/validateData'; // Importa a função de validação

const AdicionarDespesaModal = ({ modalVisible, setModalVisible, adicionarDespesa}) => {
  // Estados para armazenar os valores dos campos do formulário de nova despesa
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novoValor, setNovoValor] = useState('');
  const [novaData, setNovaData] = useState('');
  const [novoEstabelecimento, setNovoEstabelecimento] = useState('');
  const [novoMetodoPagamento, setNovoMetodoPagamento] = useState('');

  const handleAdicionarDespesa = () => {
    

    // Valida a data digitada
    if (!validarData(novaData)) {
      Alert.alert('Erro', 'Por favor, insira uma data válida no formato DD/MM/YYYY.');
      setNovaData('');  // Limpa o campo de data em caso de erro
      return;
    }
    
    // Verifica se todos os campos foram preenchidos
    
    if (!novaDescricao || !novoValor || !novaData || !novoEstabelecimento || !novoMetodoPagamento) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Valida o valor digitado
    if (!validarValor(novoValor)) {
      Alert.alert('Erro', 'Por favor, insira um valor válido maior que zero.');
      setNovoValor('');  // Limpa o campo de valor em caso de erro
      return;
    }

    // Se tudo estiver válido, chama a função para adicionar a despesa
    adicionarDespesa({
      descricao: novaDescricao,
      valor: parseFloat(novoValor),
      data: novaData,
      estabelecimento: novoEstabelecimento,
      metodoPagamento: novoMetodoPagamento,
    });

    // Limpa os campos após adicionar a despesa
    setNovaDescricao('');
    setNovoValor('');
    setNovaData('');
    setNovoEstabelecimento('');
    setNovoMetodoPagamento('');
    setModalVisible(false); // Fecha o modal
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitulo}>Nova Despesa</Text>
          <TextInput
            style={styles.input}
            placeholder="Despesa"
            placeholderTextColor="#7F8C8D"
            value={novaDescricao}
            onChangeText={setNovaDescricao}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor (R$)"
            placeholderTextColor="#7F8C8D"
            keyboardType="numeric"
            value={novoValor}
            onChangeText={setNovoValor}
          />
          <TextInput
            style={styles.input}
            placeholder="Data"
            placeholderTextColor="#7F8C8D"
            value={novaData}
            onChangeText={setNovaData}
          />
          <TextInput
            style={styles.input}
            placeholder="Estabelecimento"
            placeholderTextColor="#7F8C8D"
            value={novoEstabelecimento}
            onChangeText={setNovoEstabelecimento}
          />
          <TextInput
            style={styles.input}
            placeholder="Método de pagamento"
            placeholderTextColor="#7F8C8D"
            value={novoMetodoPagamento}
            onChangeText={setNovoMetodoPagamento}
          />
          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={handleAdicionarDespesa}>
            <Text style={styles.botaoSalvarTexto}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botaoFechar}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.botaoFecharTexto}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AdicionarDespesaModal;

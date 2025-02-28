import React, { useState, useContext } from 'react';
import { SaldoContext } from '../../contexts/SaldoContext';
import { Modal, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { validarValor } from '../../utils/validation'; // Importa a função de validação
import styles from './AdicionarDespesaModal.styles'; // Importa os estilos
import { validarData } from '../../utils/validateData'; // Importa a função de validação
import storage from '../../services/storage'; // Importa o módulo de armazenamento
import uuid from 'react-native-uuid'; // Importa a biblioteca para gerar IDs únicos

const AdicionarDespesaModal = ({ modalVisible, setModalVisible, setDespesas }) => {
  // Estados para armazenar os valores dos campos do formulário de nova despesa
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novoValor, setNovoValor] = useState('');
  const [novaData, setNovaData] = useState('');
  const [novoEstabelecimento, setNovoEstabelecimento] = useState('');
  const [novoMetodoPagamento, setNovoMetodoPagamento] = useState('');
  const {saldo, setSaldo} = useContext(SaldoContext);

    const adicionarDespesa = async novaDespesa => {
      try {
        // Gerando um ID único para a nova despesa
        const despesaComId = {
          id: uuid.v4(), // Adiciona um ID único
          ...novaDespesa,
        };
  
        // Obtendo despesas salvas
        const existingExpenses = storage.getString('expenses');
        const parsedExpenses = existingExpenses
          ? JSON.parse(existingExpenses)
          : [];
  
        // Adicionando nova despesa com ID
        const updatedExpenses = [...parsedExpenses, despesaComId];
  
        // Salvando no MMKV
        storage.set('expenses', JSON.stringify(updatedExpenses));
  
        // Atualizando o estado
        setDespesas(updatedExpenses);
        console.log('updatedExpenses:', updatedExpenses);
  
        // Atualizando saldo
        const novoSaldo = saldo - novaDespesa.valor;
        setSaldo(novoSaldo);
      } catch (error) {
        console.error('Erro ao acessar o MMKV:', error.message);
      }
    };

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

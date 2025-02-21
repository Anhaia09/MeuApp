import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import {storage} from '../services/storage';
import Footer from '../components/Footer'; // Adjust the path as necessary

const History = ({navigation, despesas, setDespesas}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [despesaSelecionada, setDespesaSelecionada] = useState(null);

  useEffect(() => {
    const carregarDespesas = () => {
      try {
        const storedExpenses = storage.getString('expenses'); // Pegando o array diretamente
        if (storedExpenses) {
          const parsedExpenses = JSON.parse(storedExpenses);
          setDespesas(parsedExpenses); // Atualizando o estado corretamente
        } else {
          console.log('Nenhuma despesa encontrada.');
          setDespesas([]); // Se não houver despesas, definir como um array vazio
        }
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      }
    };

    carregarDespesas();
  }, []);

  const abrirDetalhes = despesa => {
    setDespesaSelecionada(despesa);
    setModalVisible(true);
  };

  const limparDespesas = async () => {
    try {
      storage.delete('expenses'); // Limpa os dados do mmkv
      setDespesas([]); // Atualiza o estado para um array vazio
      console.log('Despesas limpas com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar despesas:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Despesas</Text>

      <TouchableOpacity style={styles.botaoLimpar} onPress={limparDespesas}>
        <Text style={styles.botaoLimparTexto}>Limpar Despesas</Text>
      </TouchableOpacity>

      {/* Caixa que limita o scroll até o footer */}
      <View style={styles.listaContainer}>
        <FlatList
          data={despesas}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listaDespesas}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.cardDespesa}
              onPress={() => abrirDetalhes(item)}
              activeOpacity={0.8}>
              <View style={styles.cardContent}>
                <Text style={styles.descricaoDespesa}>{item.descricao}</Text>
                <Text style={styles.valorDespesa}>
                  R$ {item.valor.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Modal de Detalhes */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>🧾 Detalhes da Transação</Text>
            {despesaSelecionada && (
              <View style={styles.modalDetalhes}>
                <Text style={styles.modalDescricao}>
                  <Text style={styles.negrito}>🛒 Despesa:</Text>{' '}
                  {despesaSelecionada.descricao}
                </Text>
                <Text style={styles.modalDescricao}>
                  <Text style={styles.negrito}>💰 Valor:</Text> R${' '}
                  {despesaSelecionada.valor.toFixed(2)}
                </Text>
                <Text style={styles.modalDescricao}>
                  <Text style={styles.negrito}>📅 Data:</Text>{' '}
                  {despesaSelecionada.data}
                </Text>
                <Text style={styles.modalDescricao}>
                  <Text style={styles.negrito}>🏬 Estabelecimento:</Text>{' '}
                  {despesaSelecionada.estabelecimento}
                </Text>
                <Text style={styles.modalDescricao}>
                  <Text style={styles.negrito}>💳 Método de Pagamento:</Text>{' '}
                  {despesaSelecionada.metodoPagamento}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.botaoFecharTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Rodapé */}
      <Footer navigation={navigation} />    
    </View>
  );
};

// Estilos (mantidos iguais)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,

  },
  listaDespesas: {
    paddingBottom: 20,
  },
  lista: {
    flex: 1,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    marginTop: 20,
  },
  cardDespesa: {
    backgroundColor: '#F8F9FA',
    width: '92%',
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 20,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descricaoDespesa: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2C3E50',
  },
  valorDespesa: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '85%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 40,
  },
  modalDetalhes: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalDescricao: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 30,
  },
  negrito: {
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  botaoFechar: {
    width: '100%',
    backgroundColor: '#8e43fb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoFecharTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoLimpar: {
    backgroundColor: '#E74C3C', // Vermelho para destacar
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoLimparTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listaContainer: {
    flex: 1, // Garante que a lista ocupe o espaço restante
    marginBottom: 80, // Evita que os itens fiquem atrás do footer
  },
  
});

export default History;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, FlatList} from 'react-native';

// Histórico de despesas (dados fictícios)
const despesas = [
  { id: 1, descricao: 'Shopee', valor: 70.0, data: '10/02/2024', estabelecimento: 'Shopee Online', metodo: 'Crédito' },
  { id: 2, descricao: 'iFood', valor: 25.5, data: '09/02/2024', estabelecimento: 'McDonald’s', metodo: 'PIX' },
  { id: 3, descricao: 'Amazon', valor: 60.0, data: '08/02/2024', estabelecimento: 'Amazon Brasil', metodo: 'Débito' },
];

const History = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [despesaSelecionada, setDespesaSelecionada] = useState(null);

  const abrirDetalhes = (despesa) => {
    setDespesaSelecionada(despesa);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Despesas</Text>

      {/* Lista de Despesas */}
      <FlatList
        data={despesas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listaDespesas}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardDespesa}
            onPress={() => abrirDetalhes(item)}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              <Text style={styles.descricaoDespesa}>{item.descricao}</Text>
              <Text style={styles.valorDespesa}>R$ {item.valor.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal de Detalhes */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>🧾 Detalhes da Transação</Text>
            {despesaSelecionada && (
              <View style={styles.modalDetalhes}>
                <Text style={styles.modalDescricao}>
                  <Text style={styles.negrito}>🛒 Despesa:</Text> {despesaSelecionada.descricao}
                </Text>
                <Text style={styles.modalDescricao}>
                  <Text style={styles.negrito}>💰 Valor:</Text> R$ {despesaSelecionada.valor.toFixed(2)}
                </Text>
                <Text style={styles.modalDescricao}>
                  <Text style={styles.negrito}>📅 Data:</Text> {despesaSelecionada.data}
                </Text>
                <Text style={styles.modalDescricao}>
                  <Text style={styles.negrito}>🏬 Estabelecimento:</Text> {despesaSelecionada.estabelecimento}
                </Text>
                <Text style={styles.modalDescricao}>
                  <Text style={styles.negrito}>💳 Método de Pagamento:</Text> {despesaSelecionada.metodo}
                </Text>
              </View>
            )}
            {/* Botão sempre no final */}
            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.botaoFecharTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={{
              uri: 'https://png.pngtree.com/png-clipart/20230923/original/pngtree-illustration-of-a-basic-home-icon-with-a-house-symbol-in-png-image_12664609.png',
            }}
            style={styles.imagemCasaFooter}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Image
            source={{
              uri: 'https://paz.church/goiania/wp-content/uploads/2020/04/cart%C3%A3o-icone-4.jpg',
            }}
            style={styles.imagemCartaoFooter}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  // Estilização do container principal da tela
  container: {
    flex: 1, // Ocupa todo o espaço disponível na tela
    backgroundColor: '#fff', // Cor de fundo da tela
    padding: 20, // Espaçamento interno da tela
  },
  // Estilização do título principal
  titulo: {
    fontSize: 28, // Tamanho da fonte grande para destaque
    fontWeight: 'bold', // Deixa o texto em negrito
    color: '#2C3E50', // Cor azul escuro para contraste
    marginBottom: 20, // Espaçamento abaixo do título
    marginTop: 20, // Espaçamento acima do título
  },

  // Estilização do card de cada despesa
  cardDespesa: {
    backgroundColor: '#F8F9FA', // Fundo levemente acinzentado para melhor visualização
    width: '92%', // Define a largura do card
    borderRadius: 15, // Bordas arredondadas
    paddingVertical: 18, // Espaçamento interno vertical
    paddingHorizontal: 20, // Espaçamento interno horizontal
    marginBottom: 30, // Espaço entre os cards
    marginTop: 20,
  },

  // Estilo para o conteúdo dentro do card de despesa
  cardContent: {
    flexDirection: 'row', // Organiza os itens lado a lado
    justifyContent: 'space-between', // Distribui os elementos igualmente
    alignItems: 'center', // Alinha os itens ao centro
  },

  // Estilização da descrição da despesa
  descricaoDespesa: {
    fontSize: 17, // Tamanho da fonte
    fontWeight: '600', // Semibold (entre normal e bold)
    color: '#2C3E50', // Azul escuro para contraste
  },

  // Estilização do valor da despesa
  valorDespesa: {
    fontSize: 18, // Tamanho da fonte um pouco maior para destaque
    fontWeight: 'bold', // Deixa em negrito
    color: '#E74C3C', // Vermelho vibrante para chamar atenção ao valor
  },

  // Estilização do modal (pop-up)
  modalContainer: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo semi-transparente escuro
    justifyContent: 'center', // Centraliza o modal verticalmente
    alignItems: 'center', // Centraliza o modal horizontalmente
  },

  // Estilo do conteúdo dentro do modal
  modalContent: {
    backgroundColor: '#FFF', // Fundo branco
    width: '85%', // Define a largura do modal
    padding: 20, // Espaçamento interno
    borderRadius: 12, // Bordas arredondadas
    alignItems: 'center', // Centraliza os itens horizontalmente
  },

  // Estilo do título dentro do modal
  modalTitulo: {
    fontSize: 22, // Tamanho da fonte grande
    fontWeight: 'bold', // Negrito para destaque
    color: '#2C3E50', // Azul escuro para manter a identidade visual
    marginBottom: 40, // Espaçamento abaixo do título
  },

  // Estilo dos detalhes do modal
  modalDetalhes: {
    width: '100%', // Ocupa toda a largura disponível
    alignItems: 'flex-start', // Alinha os textos à esquerda
    marginBottom: 20, // Espaço entre os detalhes e o botão
  },

  // Estilo da descrição dentro do modal
  modalDescricao: {
    fontSize: 16, // Tamanho adequado para leitura
    color: '#7F8C8D', // Cinza escuro para diferenciação
    marginBottom: 30, // Espaço entre as descrições
  },

  // Estilo para textos destacados em negrito
  negrito: {
    fontWeight: 'bold', // Deixa o texto em negrito
    color: '#2C3E50', // Mantém o azul escuro para contraste
  },

  // Estilização do botão de fechar dentro do modal
  botaoFechar: {
    width: '100%', // Ocupa toda a largura disponível
    backgroundColor: '#8e43fb', // Vermelho para destacar a ação de fechar
    paddingVertical: 12, // Espaçamento interno vertical
    borderRadius: 8, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto dentro do botão
    marginTop: 10, // Espaçamento superior
  },

  // Estilização do texto dentro do botão de fechar
  botaoFecharTexto: {
    color: '#FFF', // Texto branco para contraste
    fontSize: 16, // Tamanho adequado para leitura
    fontWeight: 'bold', // Negrito para melhor visualização
  },

  // Estilização do rodapé da tela
  footer: {
    position: 'absolute', // Fixa o rodapé na parte inferior
    bottom: 0, // Posiciona no final da tela
    width: '100%', // Ocupa toda a largura
    flexDirection: 'row', // Alinha os ícones horizontalmente
    justifyContent: 'space-between', // Espaço entre os ícones
    alignItems: 'center', // Alinha os ícones verticalmente
    paddingHorizontal: 40, // Espaçamento lateral
    paddingVertical: 10, // Espaçamento interno vertical
  },
  imagemCasaFooter: {
    width: 60, // Largura do ícone da casa
    height: 60, // Altura do ícone da casa
    marginLeft: 30, // Margem à esquerda do ícone
  },
  imagemCartaoFooter: {
    width: 60, // Largura do ícone do cartão
    height: 60, // Altura do ícone do cartão
  },
});

export default History;

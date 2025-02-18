import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SaldoContext } from '../contexts/SaldoContext';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AdicionarDespesaModal from '../components/modals/AdicionarDespesaModal';
import AdicionarDepositoModal from '../components/modals/AdicionarDepositoModal';

// Dados fictícios do cartão do usuário

const Home = () => {
    // Estado para controlar a visibilidade do modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalUsuarioVisible, setModalUsuarioVisible] = useState(false);
    const [modalDepositoVisible, setModalDepositoVisible] = useState(false);

    const { saldo } = useContext(SaldoContext);

    const adicionarDespesa = async (novaDespesa) => {
      
      try {
          const existingExpenses = JSON.parse(await AsyncStorage.getItem('expenses')) || [];
          
          const updatedExpenses = [...existingExpenses, novaDespesa];
  
          await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));

      } catch (error) {
          console.error('Erro ao acessar o AsyncStorage:', error.message);
      }
  };
  

  // Hook para navegação entre telas
  const navigation = useNavigation();

  // Estado inicial das despesas com alguns exemplos predefinidos
  const [despesas, setDespesas] = useState([
    { id: 1, descricao: 'Shopee', valor: 70 },
    { id: 2, descricao: 'Ifood', valor: 25.5 },
  ]);

  const dadosUsuario = {
    nome: 'Luana',
    email: 'user@gmail.com',
    telefone: '(15) 99842-6887',
  };

  const dadosCartao = {
    nome: 'JOSÉ ALMEIDA LIMA ',
    numeroCartao: '01/2035',
    saldo: saldo,
  };

  return (
    <View style={styles.container}>
      {/* ScrollView para garantir que o conteúdo seja rolável */}
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>

        {/* Cabeçalho com imagem do usuário e título */}
      <TouchableOpacity onPress={() => setModalUsuarioVisible(true)}>
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg',
            }}
            style={styles.imagemUsuario}
          />
          <Text style={styles.titulo}>Bem-vindo</Text>
        </View>
      </TouchableOpacity>

       {/* Modal para detalhes do usuário */}
        <Modal animationType="slide" transparent={true} visible={modalUsuarioVisible}>
                <View style={styles.modalContainerUsuario}>
                  <View style={styles.modalContentUsuario}>
                    <Text style={styles.modalTituloUsuario}>Perfil</Text>
                      <View style={styles.modalDetalhesUsuario}>
                        <Text style={styles.modalDescricaoUsuario}>
                          <Text style={styles.negrito}>👤 Nome:</Text> {dadosUsuario.nome}
                        </Text>
                        <Text style={styles.modalDescricaoUsuario}>
                          <Text style={styles.negrito}>✉️ E-mail:</Text> {dadosUsuario.email}
                        </Text>
                        <Text style={styles.modalDescricaoUsuario}>
                          <Text style={styles.negrito}>📲 Telefone:</Text> {dadosUsuario.telefone}
                        </Text>
                      </View>
                    {/* Botão sempre no final */}
                    <TouchableOpacity
                style={styles.botaoFecharUsuario}
                onPress={() => setModalUsuarioVisible(false)}
              >
                <Text style={styles.botaoFecharTextoUsuario}>Fechar</Text>
              </TouchableOpacity>
                  </View>
                </View>
        </Modal>

        {/* Cartão do usuário, exibindo saldo e informações do cartão */}
        <View style={styles.cartaoContainer}>
          <Text style={styles.saldoCartao}>
            Saldo: R$ {dadosCartao.saldo.toFixed(2)}
          </Text>
          <Image
            source={require('../assets/logoCartao.png')}
            style={styles.logoCartao}
          />
          <Text style={styles.nomeCartao}>{dadosCartao.nome}</Text>
          <Text style={styles.numeroCartao}>{dadosCartao.numeroCartao}</Text>
        </View>

        {/* Exibindo histórico de despesas */}
        <View style={styles.despesasContainer}>
          <Text style={styles.tituloDespesas}>Despesas</Text>
          {despesas.map(despesa => (
            <View key={despesa.id} style={styles.itemDespesa}>
              <Text style={styles.descricaoDespesa}>{despesa.descricao}</Text>
              <Text style={styles.valorDespesa}>
                R$ {despesa.valor.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Botão flutuante para adicionar despesas e fazer depósito*/}
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.botaoAdicionarTexto}>-</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoAdicionarDeposito}
        onPress={() => setModalDepositoVisible(true)}>
        <Text style={styles.botaoAdicionarTexto}>+</Text>
      </TouchableOpacity>

      {/* Modal para adicionar nova despesa */}
      <AdicionarDespesaModal modalVisible={modalVisible} setModalVisible={setModalVisible} adicionarDespesa={adicionarDespesa}></AdicionarDespesaModal>

      {/* Modal para adicionar novo depósito */}
      <AdicionarDepositoModal modalDepositoVisible={modalDepositoVisible} setModalDepositoVisible={setModalDepositoVisible}></AdicionarDepositoModal>

      {/* Rodapé fixo na parte inferior da tela */}
      <View style={styles.footer}>
        {/* Ícone da Casa (para navegar para a tela inicial) */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={{
              uri: 'https://png.pngtree.com/png-clipart/20230923/original/pngtree-illustration-of-a-basic-home-icon-with-a-house-symbol-in-png-image_12664609.png',
            }}
            style={styles.imagemCasaFooter}
          />
        </TouchableOpacity>

        {/* Ícone do Cartão (para navegar para a tela de histórico de despesas) */}
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

// Estilos para os componentes
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível na tela
    backgroundColor: '#fff', // Cor de fundo da tela
    padding: 20, // Espaçamento interno da tela
  },
  header: {
    flexDirection: 'column', // Organiza os itens em coluna
    alignItems: 'flex-start', // Alinha os itens no canto esquerdo
    marginBottom: 20, // Espaço abaixo do cabeçalho
  },
  titulo: {
    fontFamily: 'Arial',
    fontSize: 30, // Tamanho da fonte do título
    color: 'black',
    marginTop: 10, // Espaço acima do título
    fontWeight: 'bold', // Título em negrito
  },
  imagemUsuario: {
    borderRadius: 40, // Arredonda a imagem do usuário
    width: 40, // Largura da imagem
    height: 40, // Altura da imagem
    position: 'absolute', // Posiciona a imagem de forma absoluta
    bottom: 1, // Distância do fundo
    right: 10, // Distância da direita
  },
  modalContainerUsuario: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo semi-transparente escuro
    justifyContent: 'center', // Centraliza o modal verticalmente
    alignItems: 'center', // Centraliza o modal horizontalmente
  },

  // Estilo do conteúdo dentro do modal
  modalContentUsuario: {
    backgroundColor: '#FFF', // Fundo branco
    width: '85%', // Define a largura do modal
    padding: 20, // Espaçamento interno
    borderRadius: 12, // Bordas arredondadas
    alignItems: 'center', // Centraliza os itens horizontalmente
  },

  // Estilo do título dentro do modal
  modalTituloUsuario: {
    fontSize: 22, // Tamanho da fonte grande
    fontWeight: 'bold', // Negrito para destaque
    color: '#2C3E50', // Azul escuro para manter a identidade visual
    marginBottom: 40, // Espaçamento abaixo do título
  },

  // Estilo dos detalhes do modal
  modalDetalhesUsuario: {
    width: '100%', // Ocupa toda a largura disponível
    alignItems: 'flex-start', // Alinha os textos à esquerda
    marginBottom: 20, // Espaço entre os detalhes e o botão
  },

  // Estilo da descrição dentro do modal
  modalDescricaoUsuario: {
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
  botaoFecharUsuario: {
    width: '100%', // Ocupa toda a largura disponível
    backgroundColor: '#8e43fb', // Vermelho para destacar a ação de fechar
    paddingVertical: 12, // Espaçamento interno vertical
    borderRadius: 8, // Bordas arredondadas
    alignItems: 'center', // Centraliza o texto dentro do botão
    marginTop: 10, // Espaçamento superior
  },

  // Estilização do texto dentro do botão de fechar
  botaoFecharTextoUsuario: {
    color: '#FFF', // Texto branco para contraste
    fontSize: 16, // Tamanho adequado para leitura
    fontWeight: 'bold', // Negrito para melhor visualização
  },
  cartaoContainer: {
    backgroundColor: '#8e43fb', // Cor de fundo do cartão
    padding: 20, // Espaçamento interno do cartão
    borderRadius: 15, // Borda arredondada
    marginBottom: 20, // Espaço abaixo do cartão
    elevation: 5, // Sombra do cartão (para dar destaque)
    position: 'relative', // Posicionamento relativo para o logo do cartão
    height: 200, // Altura do cartão
  },
  logoCartao: {
    width: 80, // Largura do logo do cartão
    height: 60, // Altura do logo do cartão
    position: 'absolute', // Posiciona o logo de forma absoluta
    bottom: 10, // Distância do fundo
    right: 10, // Distância da direita
  },
  numeroCartao: {
    color: '#fff', // Cor do texto
    fontSize: 18, // Tamanho da fonte
    letterSpacing: 2, // Espaçamento entre as letras
    marginBottom: 10, // Espaço abaixo do número do cartão
  },
  nomeCartao: {
    color: '#fff', // Cor do texto
    fontSize: 14, // Tamanho da fonte
    marginBottom: 5, // Espaço abaixo do nome
    fontStyle: 'normal', // Estilo da fonte
    fontFamily: 'lucida grande', // Fonte utilizada
    lineHeight: 50, // Distância entre as linhas
    letterSpacing: 3, // Espaçamento entre as letras
    fontWeight: 'bold',
  },
  saldoCartao: {
    color: '#fff', // Cor do texto
    fontSize: 20, // Tamanho da fonte
    fontWeight: 'bold', // Negrito
    marginBottom: 30, // Espaço abaixo do saldo
    marginTop: 20, // Espaço acima do saldo
    textAlign: 'right', // Alinha o saldo à direita
  },
  despesasContainer: {
    backgroundColor: '#F8F9FA', // Cor de fundo do histórico de despesas
    borderRadius: 10, // Borda arredondada
    padding: 15, // Espaçamento interno
    shadowColor: '#000', // Cor da sombra
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 10, // Raio da sombra
    elevation: 5, // Efeito de sombra
  },
  tituloDespesas: {
    fontSize: 18, // Tamanho do título
    fontWeight: 'bold', // Negrito
    marginBottom: 15, // Espaço abaixo do título
    color: '#333', // Cor do título
  },
  itemDespesa: {
    flexDirection: 'row', // Alinha os itens na mesma linha
    justifyContent: 'space-between', // Espaço entre os itens
    marginBottom: 20, // Espaço abaixo de cada item
  },
  descricaoDespesa: {
    fontSize: 17, // Tamanho da fonte
    fontWeight: '600', // Semibold (entre normal e bold)
    color: '#2C3E50', // Azul escuro para contraste
  },
  valorDespesa: {
    fontSize: 16, // Tamanho da fonte do valor
    fontWeight: 'bold', // Negrito
    color: '#e74c3c', // Cor do valor (vermelho)
  },

  botaoAdicionar: {
    position: 'absolute', // Posiciona o botão de forma absoluta na tela
    bottom: 100, // Define a distância de 100 pixels a partir da parte inferior
    right: 20, // Define a distância de 20 pixels a partir da direita
    backgroundColor: '#8e43fb', // Cor de fundo do botão (roxo)
    width: 60, // Define a largura do botão como 60 pixels
    height: 60, // Define a altura do botão como 60 pixels
    borderRadius: 30, // Torna o botão circular (metade da largura/altura)
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    flex: 1, // Faz o texto ocupar todo o espaço disponível
  },

  botaoAdicionarDeposito: {
    position: 'absolute', // Posiciona o botão de forma absoluta na tela
    bottom: 100, // Define a distância de 100 pixels a partir da parte inferior
    left: 20, // Define a distância de 20 pixels a partir da direita
    backgroundColor: '#8e43fb', // Cor de fundo do botão (roxo)
    width: 60, // Define a largura do botão como 60 pixels
    height: 60, // Define a altura do botão como 60 pixels
    borderRadius: 30, // Torna o botão circular (metade da largura/altura)
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    flex: 1, // Faz o texto ocupar todo o espaço disponível
  },

  botaoAdicionarTexto: {
    color: '#fff', // Define a cor do texto como branco
    fontSize: 30, // Define o tamanho da fonte como 30 pixels (corrigindo erro de digitação)
    fontWeight: 'bold', // Define o texto em negrito
  },

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

export default Home;

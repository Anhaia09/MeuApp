import React, {useState} from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Modal, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Dados fictícios do cartão do usuário
const dadosCartao = {
  nome: 'JOSÉ ALMEIDA LIMA ',
  numeroCartao: '01/2035',
  saldo: 400,
};

const Home = () => {
  // Hook para navegação entre telas
  const navigation = useNavigation();

  // Estado inicial das despesas com alguns exemplos predefinidos
  const [despesas, setDespesas] = useState([
    { id: 1, descricao: 'Shopee', valor: 70 },
    { id: 2, descricao: 'Ifood', valor: 25.5 },
    { id: 3, descricao: 'Amazon', valor: 60.0 },
  ]);

  // Estado para controlar a visibilidade do modal
  const [modalVisible, setModalVisible] = useState(false);

  // Estados para armazenar os valores dos campos do formulário de nova despesa
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novoValor, setNovoValor] = useState('');
  const [novaData, setNovaData] = useState('');
  const [novoEstabelecimento, setNovoEstabelecimento] = useState('');
  const [novoMetodoPagamento, setNovoMetodoPagamento] = useState('');

  // Função para adicionar uma nova despesa
  const adicionarDespesa = () => {
    // Verifica se todos os campos foram preenchidos antes de adicionar a despesa
    if (
      novaDescricao &&
      novoValor &&
      novaData &&
      novoEstabelecimento &&
      novoMetodoPagamento
    ) {
      // Cria um novo objeto de despesa com os dados fornecidos
      const novaDespesa = {
        id: despesas.length + 1, // Define um ID único baseado no tamanho do array
        descricao: novaDescricao,
        valor: parseFloat(novoValor), // Converte o valor para número
        data: novaData,
        estabelecimento: novoEstabelecimento,
        metodoPagamento: novoMetodoPagamento,
      };

      // Atualiza o estado das despesas, adicionando a nova despesa ao array
      setDespesas([...despesas, novaDespesa]);

      // Limpa os campos do formulário após a adição da despesa
      setNovaDescricao('');
      setNovoValor('');
      setNovaData('');
      setNovoEstabelecimento('');
      setNovoMetodoPagamento('');

      // Fecha o modal
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* ScrollView para garantir que o conteúdo seja rolável */}
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        {/* Cabeçalho com imagem do usuário e título */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg',
            }}
            style={styles.imagemUsuario}
          />
          <Text style={styles.titulo}>Bem-vindo</Text>
        </View>

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

      {/* Botão flutuante para adicionar despesas */}
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.botaoAdicionarTexto}>+</Text>
      </TouchableOpacity>

      {/* Modal para adicionar nova despesa */}
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
              onPress={adicionarDespesa}>
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
  },

  botaoAdicionarTexto: {
    color: '#fff', // Define a cor do texto como branco
    fontSize: 30, // Define o tamanho da fonte como 30 pixels (corrigindo erro de digitação)
    fontWeight: 'bold', // Define o texto em negrito
  },

  modalContainer: {
    flex: 1, // Ocupa toda a tela disponível
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo escuro semi-transparente para efeito de sobreposição
    justifyContent: 'center', // Centraliza o modal verticalmente
    alignItems: 'center', // Centraliza o modal horizontalmente
  },

  modalContent: {
    backgroundColor: '#FFF', // Define o fundo do modal como branco
    width: '80%', // Define a largura do modal como 80% da tela
    padding: 20, // Adiciona espaçamento interno de 20 pixels
    borderRadius: 12, // Arredonda as bordas do modal
    alignItems: 'center', // Centraliza os itens dentro do modal horizontalmente
  },

  modalTitulo: {
    marginTop: 10, // Adiciona margem superior de 10 pixels
    fontSize: 22, // Define o tamanho da fonte como 22 pixels
    fontWeight: 'bold', // Define o texto em negrito
    color: '#2C3E50', // Define a cor do texto (tom de azul escuro)
    marginBottom: 10, // Adiciona margem inferior de 10 pixels
  },

  input: {
    width: '100%', // Define a largura do input para ocupar todo o espaço disponível
    padding: 10, // Adiciona espaçamento interno de 10 pixels
    borderWidth: 1, // Define uma borda de 1 pixel
    borderColor: '#E0E0E0', // Define a cor da borda como cinza claro
    borderRadius: 8, // Arredonda as bordas do input
    marginBottom: 20, // Adiciona margem inferior de 20 pixels
    fontSize: 16, // Define o tamanho da fonte como 16 pixels
  },

  botaoSalvar: {
    backgroundColor: '#8e43fb', // Define a cor de fundo do botão como roxo
    paddingVertical: 10, // Define um espaçamento interno vertical de 10 pixels
    paddingHorizontal: 25, // Define um espaçamento interno horizontal de 25 pixels
    borderRadius: 8, // Arredonda as bordas do botão
  },

  botaoSalvarTexto: {
    color: '#FFF', // Define a cor do texto como branco
    fontSize: 16, // Define o tamanho da fonte como 16 pixels
    fontWeight: 'bold', // Define o texto em negrito
  },

  botaoFechar: {
    marginTop: 10, // Adiciona margem superior de 10 pixels
  },

  botaoFecharTexto: {
    color: '#E74C3C', // Define a cor do texto como vermelho (cor de alerta)
    fontSize: 16, // Define o tamanho da fonte como 16 pixels
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

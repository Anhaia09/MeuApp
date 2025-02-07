import React from 'react';
import {View, Text, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Dados fictícios do cartão do usuário
const dadosCartao = {
  nome: 'JOSÉ ALMEIDA LIMA ',
  numeroCartao: '01/2035',
  saldo: 400,
};

// Histórico de despesas (dados fictícios)
const despesas = [
  {id: 1, descricao: 'Shopee', valor: 70},
  {id: 2, descricao: 'Ifood', valor: 25.5},
  {id: 3, descricao: 'Amazon', valor: 60.0},
];

const Home = () => {
  // Hook para navegação entre telas
  const navigation = useNavigation();

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
          <Text style={styles.tituloDespesas}>Histórico de Despesas</Text>
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

      {/* Rodapé fixo na parte inferior da tela */}
      <View style={styles.footer}>
        {/* Ícone da Casa (para navegar para a tela inicial) */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={{ uri: 'https://png.pngtree.com/png-clipart/20230923/original/pngtree-illustration-of-a-basic-home-icon-with-a-house-symbol-in-png-image_12664609.png' }}
            style={styles.imagemCasaFooter}
          />
        </TouchableOpacity>

        {/* Ícone do Cartão (para navegar para a tela de perfil) */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://paz.church/goiania/wp-content/uploads/2020/04/cart%C3%A3o-icone-4.jpg' }}
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
    backgroundColor: '#f6f6f6', // Cor de fundo do histórico de despesas
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
    marginBottom: 10, // Espaço abaixo de cada item
  },
  descricaoDespesa: {
    fontSize: 16, // Tamanho da fonte da descrição
    color: '#555', // Cor da descrição
  },
  valorDespesa: {
    fontSize: 16, // Tamanho da fonte do valor
    fontWeight: 'bold', // Negrito
    color: '#e74c3c', // Cor do valor (vermelho)
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

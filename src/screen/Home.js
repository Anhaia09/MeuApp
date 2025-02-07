import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

// Exemplo de dados para exibição (simulando um cartão de usuário)
const dadosCartao = {
  nome: "JOSÉ ALMEIDA LIMA ",
  numeroCartao: "01/2035",
  saldo: 400,
};

// Lista de despesas para exibição no histórico
const despesas = [
  { id: 1, descricao: "Shopee", valor: 70 },
  { id: 2, descricao: "Ifood", valor: 25.50 },
  { id: 3, descricao: "Amazon", valor: 60.00 },
];

// Componente principal do aplicativo
const App = () => {
  // Função chamada ao clicar no botão "Ver Mais"
  const handleVerMais = () => {
    alert("Exibir mais detalhes das despesas!");
  };

  return (
    // ScrollView permite rolagem do conteúdo na tela
    <ScrollView style={estilos.container}>
      {/* Cabeçalho com imagem do usuário e texto de boas-vindas */}
      <View style={estilos.header}>
        <Image
          source={{ uri: 'https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg' }}
          style={estilos.imagemUsuario}
        />
        <Text style={estilos.titulo}>Bem-vindo</Text>
      </View>

      {/* Cartão com informações do usuário */}
      <View style={estilos.cartaoContainer}>
        <Text style={estilos.saldoCartao}>Saldo: R$ {dadosCartao.saldo.toFixed(2)}</Text>
        <Image source={require('../assets/logoCartao.png')} style={estilos.logoCartao} />

        <Text style={estilos.nomeCartao}>{dadosCartao.nome}</Text>
        <Text style={estilos.numeroCartao}>{dadosCartao.numeroCartao}</Text>
        <Text style={estilos.bandeiraCartao}>{dadosCartao.bandeira}</Text> {/* Essa linha pode causar erro, pois 'bandeira' não está definido em dadosCartao */}
      </View>

      {/* Seção de histórico de despesas */}
      <View style={estilos.despesasContainer}>
        <Text style={estilos.tituloDespesas}>Histórico de Despesas</Text>
        
        {/* Mapeia e exibe cada despesa da lista */}
        {despesas.map((despesa) => (
          <View key={despesa.id} style={estilos.itemDespesa}>
            <Text style={estilos.descricaoDespesa}>{despesa.descricao}</Text>
            <Text style={estilos.valorDespesa}>R$ {despesa.valor.toFixed(2)}</Text>
          </View>
        ))}

        {/* Botão para visualizar mais despesas */}
        <TouchableOpacity style={estilos.botaoVerMais} onPress={handleVerMais}>
          <Text style={estilos.textoBotao}>Ver Mais</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Estilos para os componentes da interface
const estilos = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível na tela
    backgroundColor: '#f4f4f4', // Define a cor de fundo como um cinza claro
    padding: 20, // Adiciona um espaçamento interno de 20 pixels
  },
  header: {
    flexDirection: 'column', // Organiza os elementos em coluna (um abaixo do outro)
    alignItems: 'flex-start', // Alinha os itens no canto esquerdo
    marginBottom: 20, // Adiciona um espaçamento abaixo do cabeçalho
  },
  titulo: {
    fontFamily: 'Arial', // Define a fonte do texto
    fontSize: 30, // Define o tamanho do texto
    color: 'black', // Define a cor do texto como preto
    marginTop: 10, // Adiciona um espaçamento acima do título
    fontWeight: 'bold', // Deixa o texto em negrito
  },
  imagemUsuario: {
    borderRadius: 40, // Arredonda as bordas para deixar a imagem circular
    width: 40, // Define a largura da imagem
    height: 40, // Define a altura da imagem
    position: 'absolute', // Define a posição absoluta dentro do cabeçalho
    bottom: 1, // Posiciona a imagem 1 pixel acima da base do container
    right: 10, // Posiciona a imagem 10 pixels à esquerda da borda direita
  },
  cartaoContainer: {
    backgroundColor: '#8e43fb', // Define o fundo do cartão como roxo
    padding: 20, // Adiciona um espaçamento interno
    borderRadius: 15, // Arredonda as bordas do cartão
    marginBottom: 20, // Adiciona espaçamento abaixo do cartão
    elevation: 5, // Adiciona uma sombra no Android para efeito de profundidade
    position: 'relative', // Mantém a posição relativa aos elementos ao redor
    height: 200, // Define a altura fixa do cartão
  },
  logoCartao: {
    width: 80, // Define a largura da logo do cartão
    height: 60, // Define a altura da logo do cartão
    position: 'absolute', // Define a posição absoluta dentro do cartão
    bottom: 10, // Posiciona a logo 10 pixels acima da base do cartão
    right: 10, // Posiciona a logo 10 pixels à esquerda da borda direita do cartão
  },
  numeroCartao: {
    color: '#fff', // Define a cor do texto como branco
    fontSize: 18, // Define o tamanho do texto
    letterSpacing: 2, // Aumenta o espaçamento entre os caracteres
    marginBottom: 10, // Adiciona um espaçamento abaixo do número do cartão
  },
  nomeCartao: {
    color: '#fff', // Define a cor do texto como branco
    fontSize: 14, // Define o tamanho do texto
    marginBottom: 5, // Adiciona um pequeno espaçamento abaixo do nome
    fontStyle: 'normal', // Define o estilo da fonte como normal
    fontFamily: 'lucida grande', // Define a fonte do texto
    lineHeight: 50, // Define a altura da linha para melhorar o espaçamento vertical
    letterSpacing: 3, // Aumenta o espaçamento entre as letras
  },
  saldoCartao: {
    color: '#fff', // Define a cor do texto como branco
    fontSize: 20, // Define o tamanho do texto
    fontWeight: 'bold', // Deixa o texto em negrito
    marginBottom: 30, // Adiciona um espaçamento abaixo do saldo
    marginTop: 20, // Adiciona um espaçamento acima do saldo
    textAlign: 'right', // Alinha o texto à direita
  },
  despesasContainer: {
    backgroundColor: '#fff', // Define o fundo branco para o container de despesas
    borderRadius: 10, // Arredonda as bordas
    padding: 15, // Adiciona espaçamento interno
    shadowColor: '#000', // Define a cor da sombra como preto
    shadowOpacity: 0.1, // Define a opacidade da sombra
    shadowRadius: 10, // Define a dispersão da sombra
    elevation: 5, // Adiciona uma sombra no Android para efeito de profundidade
  },
  tituloDespesas: {
    fontSize: 18, // Define o tamanho do texto
    fontWeight: 'bold', // Deixa o texto em negrito
    marginBottom: 15, // Adiciona um espaçamento abaixo do título
    color: '#333', // Define a cor do texto como cinza escuro
  },
  itemDespesa: {
    flexDirection: 'row', // Organiza os itens na mesma linha (lado a lado)
    justifyContent: 'space-between', // Distribui os itens ao longo da linha com espaço entre eles
    marginBottom: 10, // Adiciona um espaçamento abaixo de cada item de despesa
  },
  descricaoDespesa: {
    fontSize: 16, // Define o tamanho do texto
    color: '#555', // Define a cor do texto como cinza médio
  },
  valorDespesa: {
    fontSize: 16, // Define o tamanho do texto
    fontWeight: 'bold', // Deixa o valor da despesa em negrito
    color: '#e74c3c', // Define a cor do texto como vermelho para destacar o valor gasto
  },
  botaoVerMais: {
    marginTop: 15, // Adiciona espaçamento acima do botão
    backgroundColor: '#8e43fb', // Define a cor de fundo do botão como roxo
    padding: 10, // Adiciona espaçamento interno ao botão
    borderRadius: 10, // Arredonda as bordas do botão
    alignItems: 'center', // Centraliza o texto dentro do botão
  },
  textoBotao: {
    color: '#fff', // Define a cor do texto como branco
    fontSize: 16, // Define o tamanho do texto
    fontWeight: 'bold', // Deixa o texto em negrito
  },
});

export default App;

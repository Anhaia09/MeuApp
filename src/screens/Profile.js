import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

// Componente Profile representa a tela de perfil
const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Texto principal da página de perfil */}
      <Text style={styles.titulo}>Página de Perfil</Text>

      {/* Rodapé fixo na parte inferior da tela */}
      <View style={styles.footer}>
        {/* Ícone da Casa (Navega para Home) */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={{ 
              uri: 'https://png.pngtree.com/png-clipart/20230923/original/pngtree-illustration-of-a-basic-home-icon-with-a-house-symbol-in-png-image_12664609.png' 
            }}
            style={styles.imagemCasaFooter}
          />
        </TouchableOpacity>

        {/* Ícone do Cartão (Mantém na tela de Perfil) */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ 
              uri: 'https://paz.church/goiania/wp-content/uploads/2020/04/cart%C3%A3o-icone-4.jpg' 
            }}
            style={styles.imagemCartaoFooter}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos para os componentes da interface
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível na tela
    backgroundColor: '#fff', // Cor de fundo
    padding: 20, // Espaçamento interno
    justifyContent: 'center', // Centraliza os elementos verticalmente
    alignItems: 'center', // Centraliza os elementos horizontalmente
  },
  titulo: {
    fontSize: 24, // Tamanho do texto
    fontWeight: 'bold', // Deixa o texto em negrito
    marginBottom: 20, // Espaçamento abaixo do título
  },
  footer: {
    position: 'absolute', // Fixa o rodapé na parte inferior
    bottom: 0, // Gruda no final da tela
    width: '100%', // Ocupa toda a largura
    flexDirection: 'row', // Organiza os ícones lado a lado
    justifyContent: 'space-between', // Separa os ícones nas laterais
    alignItems: 'center', // Alinha verticalmente os ícones
    paddingHorizontal: 40, // Espaçamento lateral dos ícones
    paddingVertical: 10, // Espaçamento interno vertical
  },
  imagemCasaFooter: {
    width: 60, // Largura do ícone da casa
    height: 60, // Altura do ícone da casa
    marginLeft: 30, // Margem para alinhar melhor
  },
  imagemCartaoFooter: {
    width: 60, // Largura do ícone do cartão
    height: 60, // Altura do ícone do cartão
  },
});

export default Profile;

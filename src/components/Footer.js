

import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from './Footer.styles';


const Footer = ({ navigation }) => {
  return (
    // Rodapé fixo na parte inferior da tela
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
  );
}

export default Footer;

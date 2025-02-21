import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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

export default styles;



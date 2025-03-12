import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  botaoSalvar: {
    backgroundColor: '#8e43fb',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  botaoSalvarTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  botaoFechar: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoFecharTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Estilos para o modal de sucesso
  successoModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido
  },
  successoModalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  successoModalTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  successoBotaoFechar: {
    backgroundColor: '#8e43fb',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  successoBotaoFecharTexto: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default styles;

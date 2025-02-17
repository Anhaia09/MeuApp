import { StyleSheet } from 'react-native';

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
});

export default styles;

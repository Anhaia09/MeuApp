import { Alert } from 'react-native';

export const validarData = (novaData) => {
  const isValidFormat = /^\d{2}\/\d{2}\/\d{4}$/.test(novaData); // Verifica se está no formato DD/MM/YYYY

  if (!isValidFormat) {
    Alert.alert('Erro', 'Por favor, insira uma data válida no formato DD/MM/YYYY.');
    return false;
  }

  // Converte para o formato aceito pelo objeto Date (YYYY-MM-DD)
  const [dia, mes, ano] = novaData.split('/');
  const dataFormatada = `${ano}-${mes}-${dia}`;

  const dataObjeto = new Date(dataFormatada);
  const isValidDate = dataObjeto instanceof Date && !isNaN(dataObjeto.getTime());

  if (!isValidDate) {
    Alert.alert('Erro', 'Por favor, insira uma data válida.');
    return false;
  }

  return true; // Retorna true se a data for válida
};


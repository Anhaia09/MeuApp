export const validarValor = (valor) => {
  const valorNumerico = parseFloat(valor);
  return !isNaN(valorNumerico) && valorNumerico > 0;
};

export const handleChangeText = (text, setValue) => {
  if (text.length <= 12) {
    setValue(text);
  }
};

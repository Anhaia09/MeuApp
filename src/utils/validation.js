export const validarValor = (valor) => {
  const valorNumerico = parseFloat(valor);
  return !isNaN(valorNumerico) && valorNumerico > 0;
};

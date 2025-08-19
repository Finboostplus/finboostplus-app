// Converte de string formatada (R$ 1.234,56) para número (1234.56)
export const parseBRL = value => {
  if (!value) return '';
  return parseFloat(value) || 0;
};

// Converte de número (1234.56) para string formatada (R$ 1.234,56)
export const formatBRL = value => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(isNaN(numericValue) ? 0 : numericValue);
};

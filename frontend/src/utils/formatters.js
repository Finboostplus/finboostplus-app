// Converte de string formatada (R$ 1.234,56) para número (1234.56)
export const parseBRL = value => {
  if (!value) return '';
  return parseFloat(value) || 0;
};

export const formatBRL = (
  value,
  {
    locale = 'pt-BR',
    currency = 'BRL',
    style = 'currency',
    notation = 'standard',
    compactDisplay = undefined,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = {}
) => {
  let numericValue;

  if (typeof value === 'bigint') {
    numericValue = Number(value);
  } else if (typeof value === 'string') {
    numericValue = parseFloat(value.replace(',', '.'));
  } else {
    numericValue = value;
  }

  if (isNaN(numericValue)) numericValue = 0;

  return new Intl.NumberFormat(locale, {
    style,
    currency,
    notation,
    compactDisplay,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numericValue);
};

export function formatDateBR(dateString) {
  if (!dateString) {
    return 'Data Inválida';
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return 'Data Inválida';
  }

  // **MUDANÇA CHAVE:** Adicionar timeZone: 'UTC'
  // Isso força o formatador a usar os componentes da data (dia 17)
  // sem aplicar o deslocamento do fuso horário local (que subtrai 3 horas).
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC', // <-- SOLUÇÃO
  }).format(date);
}

/**
 * Converte uma data para um formato relativo (ex: "ontem", "há 2 dias").
 * @param {string | Date} dateString A data a ser formatada.
 * @param {string} lang A linguagem para a formatação (padrão: 'pt-BR').
 * @returns {string} A string de tempo relativo.
 */
export const formatRelativeDate = (dateString, lang = 'pt-BR') => {
  if (!dateString) return 'Data Indisponível';

  const date = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = date - now;

  // Definições de corte de tempo (em milissegundos)
  const cutoffs = [60000, 3600000, 86400000, 2592000000, 31536000000, Infinity];
  const units = ['minute', 'hour', 'day', 'month', 'year'];

  // Determinar a unidade
  const unitIndex = cutoffs.findIndex(
    cutoff => Math.abs(diffInMilliseconds) < cutoff
  );
  const unit = units[unitIndex];
  const divisor = unitIndex > 0 ? cutoffs[unitIndex - 1] : 1000;
  const value = Math.round(diffInMilliseconds / divisor);

  // Usa Intl.RelativeTimeFormat com 'numeric: "auto"' para "ontem", "amanhã"
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });

  // Para segundos (caso especial: diffInMilliseconds < 60000)
  if (unit === 'minute' && Math.abs(diffInMilliseconds) < 60000) {
    return 'há poucos segundos';
  }

  return rtf.format(value, unit);
};

export const getCurrentDate = () => {
  const today = new Date();
  return new Intl.DateTimeFormat('en-CA').format(today); // 'en-CA' => formato YYYY-MM-DD
};

// Divide igualmente e distribui o resto para os primeiros membros
export const calculateEqualShares = (amount, members = []) => {
  if (!amount || members.length === 0) return {};

  const equalShare = Math.floor((amount / members.length) * 100) / 100;
  let remainder =
    Math.round((amount - equalShare * members.length) * 100) / 100;

  const division = {};

  members.forEach(m => {
    let finalShare = equalShare;
    if (remainder > 0.009) {
      // garante precisão
      finalShare += 0.01;
      remainder = Math.round((remainder - 0.01) * 100) / 100;
    }

    division[m.id] = {
      float: finalShare,
      formatted: formatCurrencyValue(finalShare),
      value: finalShare.toFixed(2).replace('.', ','),
    };
  });

  return division;
};

// Corrige diferenças restantes automaticamente entre membros
export const autoAdjustDifference = (total, divisionAmount = {}) => {
  const members = Object.keys(divisionAmount);
  if (members.length === 0) return divisionAmount;

  let sum = Object.values(divisionAmount).reduce(
    (acc, d) => acc + (parseFloat(d?.float) || 0),
    0
  );
  let diff = Math.round((total - sum) * 100) / 100;

  if (diff === 0) return divisionAmount; // já está equilibrado

  const adjusted = { ...divisionAmount };

  // Corrige centavos (para cima ou para baixo)
  let index = 0;
  const step = diff > 0 ? 0.01 : -0.01;

  while (Math.abs(diff) >= 0.01) {
    const memberId = members[index % members.length];
    const current = adjusted[memberId].float + step;

    adjusted[memberId] = {
      float: Math.round(current * 100) / 100,
      formatted: formatCurrencyValue(current),
      value: current.toFixed(2).replace('.', ','),
    };

    diff = Math.round((diff - step) * 100) / 100;
    index++;
  }

  return adjusted;
};

// Calcula diferença restante (quanto falta ou sobra)
export const calculateRemainingDifference = (total, divisionAmount) => {
  const sum = Object.values(divisionAmount).reduce(
    (acc, d) => acc + (parseFloat(d?.float) || 0),
    0
  );
  return Math.round((total - sum) * 100) / 100;
};

// Formata para moeda BRL
export const formatCurrencyValue = value =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

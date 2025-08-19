export const getCurrentDate = () => {
  const today = new Date();
  return new Intl.DateTimeFormat('en-CA').format(today); // 'en-CA' => formato YYYY-MM-DD
};

export const calculateEqualShares = (amount, members) => {
  if (members.length === 0) return {};

  const equalShare = Math.floor((amount / members.length) * 100) / 100; // truncar para 2 casas
  const remainder =
    Math.round((amount - equalShare * members.length) * 100) / 100;

  return Object.fromEntries(
    members.map((m, index) => {
      const float = index === 0 ? equalShare + remainder : equalShare;
      const formatted = float.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return [m, { float, formatted, value: formatted }];
    })
  );
};

export const calculateRemainingDifference = (amount, divisionAmount) => {
  const distributedTotal = Object.values(divisionAmount).reduce(
    (sum, { float }) => sum + (float || 0),
    0
  );
  return Math.round((amount - distributedTotal) * 100) / 100;
};

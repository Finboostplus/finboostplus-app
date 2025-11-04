import { create } from 'zustand';
import {
  calculateEqualShares,
  calculateRemainingDifference,
} from '../../../utils/helpers';

export const useFormExpense = create((set, get) => ({
  amount: 0,
  members: [], // array de ids
  divisionAmount: {}, // { memberId: { float, formatted, value } }

  // 💰 Atualiza o valor total da despesa
  setAmount: value => {
    const amount = Number(value) || 0;
    const members = get().members;
    const divisionAmount = calculateEqualShares(amount, members);
    set({ amount, divisionAmount });
  },

  // 👥 Atualiza os membros participantes
  setMembers: members => {
    const amount = get().amount;
    const divisionAmount = calculateEqualShares(amount, members);
    set({ members, divisionAmount });
  },

  updateMemberShare: (memberId, raw) => {
    // converte string para número
    if (raw === '') return;
    let floatValue = 0;
    if (typeof raw === 'string') {
      floatValue = parseFloat(raw.replace(',', '.')) || 0;
    } else if (typeof raw === 'number') {
      floatValue = raw;
    }

    // atualiza a store com formato consistente
    const divisionAmount = {
      ...get().divisionAmount,
      [memberId]: {
        float: floatValue,
        formatted: floatValue.toFixed(2), // para mostrar no input
        value: String(floatValue), // string “bruta”
      },
    };

    set({ divisionAmount });
  },

  // ♻️ Redistribui os valores igualmente
  redistributeEvenly: () => {
    const amount = get().amount;
    const members = get().members;
    const divisionAmount = calculateEqualShares(amount, members);
    set({ divisionAmount });
  },

  // 🔄 Resetar tudo
  reset: () =>
    set({
      amount: 0,
      members: [],
      divisionAmount: {},
    }),

  // 🧮 Soma total distribuída
  getTotalAssigned: () =>
    Object.values(get().divisionAmount).reduce(
      (acc, val) => acc + (val?.float || 0),
      0
    ),

  // ⚖️ Diferença restante
  getRemainingDifference: () => get().amount - get().getTotalAssigned(),

  // ✅ Verifica se está equilibrado
  isBalanced: () => Math.abs(get().getRemainingDifference()) < 0.01,
}));

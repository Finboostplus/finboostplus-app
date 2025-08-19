import { create } from 'zustand';
import {
  calculateEqualShares,
  calculateRemainingDifference,
} from '../../../utils/helpers';

export const useFormExpense = create((set, get) => ({
  amount: 0,
  members: [],
  divisionAmount: {}, // { member: { float, formatted, value } }
  remainingDifference: 0,

  setAmount: value => {
    const amount = value === null ? 0 : value;
    const divisionAmount = calculateEqualShares(amount, get().members);
    set({ amount, divisionAmount, remainingDifference: 0 });
  },

  setMembers: members => {
    const divisionAmount = calculateEqualShares(get().amount, members);
    set({ members, divisionAmount, remainingDifference: 0 });
  },

  updateMemberShare: (member, raw) => {
    //raw:{float,formatted,value}
    const divisionAmount = { ...get().divisionAmount, [member]: raw };
    const remainingDifference = calculateRemainingDifference(
      get().amount,
      divisionAmount
    );

    set({ divisionAmount, remainingDifference });
  },

  redistributeEvenly: () => {
    const divisionAmount = calculateEqualShares(get().amount, get().members);
    set({ divisionAmount, remainingDifference: 0 });
  },

  reset: () =>
    set({
      amount: 0,
      members: [],
      divisionAmount: {},
      remainingDifference: 0,
    }),
}));

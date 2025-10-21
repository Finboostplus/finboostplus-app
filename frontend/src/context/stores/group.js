/* import { create } from 'zustand';
import { getGroups } from '../../services/groups';

export const useGroupStore = create((get, set) => ({
  groups: [],
  isLoading: false,
  getAllGroupUser: async () => {
    set({ isLoading: true });
    try {
      const { content } = await getGroups();
      set({ groups: content });
      return content;
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
})); */

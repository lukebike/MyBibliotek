import { create } from "zustand";
import type { User } from "../types/users/User";
import api from "../api";

type UserState = {
  users: User[];
  loading: boolean;
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  updateUser: (updatedUser: User) => void;
  fetchUsers: () => Promise<void>;
};

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: true,
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),
  fetchUsers: async () => {
    const state = get();
    if (state.users.length > 0) {
      return;
    }
    
    set({ loading: true });
    try {
      const response = await api.get<User[]>("/users");
      set({ users: response.data, loading: false });
    } catch (err) {
      set({ loading: false });
      console.error("Failed to fetch loans", err);
    }
  },
}));

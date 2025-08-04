import { create } from "zustand";
import type { User } from "../types/users/User";

type UserState = {
  users: User[];
  loading: boolean;
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  updateUser: (updatedUser: User) => void;
};

export const useUserStore = create<UserState>((set) => ({
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
}));

import { create } from "zustand";
import type { User } from "../types/User";

type UserState = {
  users: User[];
  loading: boolean;
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: true,
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
}));

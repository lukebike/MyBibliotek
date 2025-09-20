import { create } from "zustand";
import type { User } from "../types/users/User";
import api from "../api";

type UserState = {
  users: User[];
  loading: boolean;
  username: string | null;
  roles: string[];
  isLoggedIn: boolean;
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  updateUser: (updatedUser: User) => void;
  fetchUsers: () => Promise<void>;
   setAuth: (username: string, roles: string[]) => void;
  clearAuth: () => void;
  hasRole: (role: string) => boolean;
  initializeAuth: () => void;
};

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: true,
  username: null,
  roles: [],
  isLoggedIn: false,
  
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  
  setAuth: (username, roles) => {
    localStorage.setItem("username", username);
    localStorage.setItem("roles", JSON.stringify(roles));
    
    set({ 
      username, 
      roles, 
      isLoggedIn: true 
    });
  },
  
  clearAuth: () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    
    set({ 
      username: null, 
      roles: [], 
      isLoggedIn: false 
    });
  },
  
  hasRole: (role) => get().roles.includes(role),
  initializeAuth: () => {
    const token = localStorage.getItem("jwt");
    const username = localStorage.getItem("username");
    const roles = localStorage.getItem("roles");
    
    if (token && username && roles) {
      set({
        username,
        roles: JSON.parse(roles),
        isLoggedIn: true
      });
    } else {
      get().clearAuth();
    }
  },
  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),
  fetchUsers: async () => {
    if (get().users.length > 0) return;
    
    set({ loading: true });
    try {
      const response = await api.get<User[]>("/users");
      set({ users: response.data, loading: false });
    } catch (err) {
      set({ loading: false });
      console.error("Failed to fetch users", err);
    }
  },
}));

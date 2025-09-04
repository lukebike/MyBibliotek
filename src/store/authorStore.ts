import { create } from "zustand";
import type { Author } from "../types/authors/Author";
import api from "../api";

type AuthorState = {
  authors: Author[];
  loading: boolean;
  setAuthors: (authors: Author[]) => void;
  setLoading: (loading: boolean) => void;
  updateAuthor: (updatedAuthor: Author) => void;
  fetchAuthors: () => Promise<void>;
};

export const useAuthorStore = create<AuthorState>((set) => ({
  authors: [],
  loading: true,
  setAuthors: (authors) => set({ authors }),
  setLoading: (loading) => set({ loading }),
  updateAuthor: (updatedAuthor) =>
    set((state) => ({
      authors: state.authors.map((author) =>
        author.id === updatedAuthor.id ? updatedAuthor : author
      ),
    })),
  fetchAuthors: async () => {
    set({ loading: true });
    try {
      const response = await api.get<Author[]>("/authors");
      set({ authors: response.data, loading: false });
    } catch (err) {
      set({ loading: false });
      console.error("Failed to fetch authors", err);
    }
  },
}));

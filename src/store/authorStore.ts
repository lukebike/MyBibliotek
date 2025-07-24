import { create } from "zustand";
import type { Author } from "../types/Author/Author";

type AuthorState = {
  authors: Author[];
  loading: boolean;
  setAuthors: (authors: Author[]) => void;
  setLoading: (loading: boolean) => void;
  updateAuthor: (updatedAuthor: Author) => void;
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
}));

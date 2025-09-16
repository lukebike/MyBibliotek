import { create } from "zustand";
import type { Book } from "../types/books/Book";
import api from "../api";

type BookState = {
  books: Book[];
  loading: boolean;
  setBooks: (books: Book[]) => void;
  setLoading: (loading: boolean) => void;
  updateBook: (updatedBook: Book) => void;
  fetchBooks: () => Promise<void>;
};

export const useBookStore = create<BookState>((set, get) => ({
  books: [],
  loading: true,
  setBooks: (books) => set({ books }),
  setLoading: (loading) => set({ loading }),
  updateBook: (updatedBook) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      ),
    })),
  fetchBooks: async () => {
    const state = get();
    if (state.books.length > 0) {
      return;
    }
    
    set({ loading: true });
    try {
      const response = await api.get("/books", {
        params: {
          pageNumber: 0,
          pageSize: 100,
        },
      });
      set({ books: response.data.books, loading: false });
    } catch (err) {
      set({ loading: false });
      console.error("Failed to fetch books", err);
    }
  },
}));

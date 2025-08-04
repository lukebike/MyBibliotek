import { create } from "zustand";
import type { Book } from "../types/books/Book";

type BookState = {
  books: Book[];
  loading: boolean;
  setBooks: (books: Book[]) => void;
  setLoading: (loading: boolean) => void;
  updateBook: (updatedBook: Book) => void;
};

export const useBookStore = create<BookState>((set) => ({
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
}));

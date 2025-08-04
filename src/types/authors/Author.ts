import type { Book } from "../books/Book";

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  books: Book[];
}

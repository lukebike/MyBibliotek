import type { Book } from "../Book/Book";

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  books: Book[];
}

import type { Book } from "../books/Book";
import type { User } from "../users/User";

export interface Loan {
  id: number;
  user: User;
  book: Book;
  borrowedDate: string;
  dueDate: string;
  returnedDate: string;
}

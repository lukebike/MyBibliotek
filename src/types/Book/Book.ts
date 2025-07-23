import type { Author } from "../Author/Author";

export interface Book {
  id: number;
  title: string;
  publicationYear: number;
  availableCopies: number;
  totalCopies: number;
  author: Author;
}

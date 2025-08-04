import type { IFuseOptions } from "fuse.js";
import type { User } from "../types/users/User";
import type { Book } from "../types/books/Book";
import type { Author } from "../types/authors/Author";
import type { Loan } from "../types/loans/Loan";

export const fuseConfigs = {
  users: {
    threshold: 0.3,
    keys: ["firstName", "lastName", "email"],
    readonly: false,
  } as IFuseOptions<User>,
  books: {
    threshold: 0.3,
    keys: ["title", "publicationYear"],
    readonly: false,
  } as IFuseOptions<Book>,
  authors: {
    threshold: 0.3,
    keys: ["firstName", "lastName", "nationality", "book.title"],
    readonly: false,
  } as IFuseOptions<Author>,
  loans: {
    threshold: 0.3,
    keys: [
      "user.firstName",
      "user.lastName",
      "book.title",
      "borrowedDate",
      "dueDate",
      "returnedDate",
    ],
    readonly: false,
  } as IFuseOptions<Loan>,
};

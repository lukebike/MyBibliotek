import type { IFuseOptions } from "fuse.js";
import type { User } from "../types/User/User";
import type { Book } from "../types/Book/Book";
import type { Author } from "../types/Author/Author";

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
    keys: ["firstName", "lastName", "nationality"],
    readonly: false,
  } as IFuseOptions<Author>,
};

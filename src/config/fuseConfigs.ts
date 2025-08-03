export const fuseConfigs = {
  users: {
    threshold: 0.3,
    keys: ["firstName", "lastName", "email"],
  },
  books: {
    threshold: 0.3,
    keys: ["title", "publicationYear"],
  },
  authors: {
    threshold: 0.3,
    keys: ["firstName", "lastName", "nationality"],
  },
} as const;

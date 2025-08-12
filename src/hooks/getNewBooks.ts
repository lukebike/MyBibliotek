export function getNewBooks(books: { publicationYear: number }[]) {
  const currentYear = new Date().getFullYear();

  return books.filter((book) => book.publicationYear === currentYear).length;
}

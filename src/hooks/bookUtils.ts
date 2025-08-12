import dayjs from "dayjs";
import type { Book } from "../types/books/Book";
import type { Loan } from "../types/loans/Loan";

export const getNewBooks = (books: { publicationYear: number }[]) => {
  const currentYear = new Date().getFullYear();

  return books.filter((book) => book.publicationYear === currentYear).length;
};

export const getPopularBooks = (loans: Loan[]) => {
  const bookLoanCounts = new Map<number, { book: Book; loanCount: number }>();

  loans.forEach((loan) => {
    const bookId = loan.book.id;
    if (bookLoanCounts.has(bookId)) {
      bookLoanCounts.get(bookId)!.loanCount += 1;
    } else {
      bookLoanCounts.set(bookId, {
        book: loan.book,
        loanCount: 1,
      });
    }
  });

  return Array.from(bookLoanCounts.values())
    .sort((a, b) => b.loanCount - a.loanCount)
    .slice(0, 5)
    .map((item) => ({
      id: item.book.id,
      title: item.book.title,
      loans: item.loanCount,
      available: item.book.availableCopies,
      total: item.book.totalCopies,
    }));
};

export function getBookGrowth(books: { publicationYear: number }[]) {
  const now = dayjs();
  const thisYear = now.year();
  const lastYear = thisYear - 1;

  const booksThisYear = books.filter(
    (book) => book.publicationYear === thisYear
  ).length;

  const booksLastYear = books.filter(
    (book) => book.publicationYear === lastYear
  ).length;

  if (booksLastYear === 0) {
    return booksThisYear > 0 ? 100 : 0;
  }

  const growthPercentage =
    ((booksThisYear - booksLastYear) / booksLastYear) * 100;
  return Math.round(growthPercentage * 100) / 100;
}

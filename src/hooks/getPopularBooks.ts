import type { Book } from "../types/books/Book";
import type { Loan } from "../types/loans/Loan";

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
    .slice(0, 5) // Top 5 popular books
    .map((item) => ({
      id: item.book.id,
      title: item.book.title,
      loans: item.loanCount,
      available: item.book.availableCopies,
      total: item.book.totalCopies,
    }));
};

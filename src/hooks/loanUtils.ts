import dayjs from "dayjs";
import type { Loan } from "../types/loans/Loan";

export const getReturnedBooks = (loans: Loan[]) => {
  return loans.filter((loan) => loan.returnedDate).length;
};

export const getActiveLoans = (loans: Loan[]) => {
  return loans.filter((loan) => !loan.returnedDate).length;
};

export const getOverdueBooks = (loans: Loan[]) => {
  return loans.filter(
    (loan) => !loan.returnedDate && dayjs(loan.dueDate).isBefore(dayjs())
  ).length;
};

export const getRecentLoans = (loans: Loan[], limit: number = 5) => {
  return loans
    .filter((loan) => !loan.returnedDate)
    .sort(
      (a, b) =>
        dayjs(b.borrowedDate).valueOf() - dayjs(a.borrowedDate).valueOf()
    )
    .slice(0, limit)
    .map((loan) => ({
      id: loan.id,
      user: {
        initials: `${loan.user.firstName?.[0] || ""}${
          loan.user.lastName?.[0] || ""
        }`,
        name: `${loan.user.firstName || ""} ${loan.user.lastName || ""}`.trim(),
      },
      book: {
        title: loan.book.title,
      },
      dueDate: dayjs(loan.dueDate).format("YYYY-MM-DD"),
      status: dayjs(loan.dueDate).isBefore(dayjs()) ? "overdue" : "active",
    }));
};

export const getRecentReturns = (loans: Loan[], limit: number = 5) => {
  return loans
    .filter((loan) => loan.returnedDate)
    .sort(
      (a, b) =>
        dayjs(b.returnedDate!).valueOf() - dayjs(a.returnedDate!).valueOf()
    )
    .slice(0, limit)
    .map((loan) => ({
      id: loan.id,
      user: {
        initials: `${loan.user.firstName?.[0] || ""}${
          loan.user.lastName?.[0] || ""
        }`,
        name: `${loan.user.firstName || ""} ${loan.user.lastName || ""}`.trim(),
      },
      book: {
        title: loan.book.title,
      },
      returnDate: dayjs(loan.returnedDate).format("YYYY-MM-DD"),
    }));
};

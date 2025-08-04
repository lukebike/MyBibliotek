import { create } from "zustand";

import type { Loan } from "../types/loans/Loan";

type LoanState = {
  loans: Loan[];
  loading: boolean;
  setLoans: (loans: Loan[]) => void;
  setLoading: (loading: boolean) => void;
  updateLoan: (updatedLoan: Loan) => void;
};

export const useLoanStore = create<LoanState>((set) => ({
  loans: [],
  loading: true,
  setLoans: (loans) => set({ loans }),
  setLoading: (loading) => set({ loading }),
  updateLoan: (updatedLoan) =>
    set((state) => ({
      loans: state.loans.map((loan) =>
        loan.id === updatedLoan.id ? updatedLoan : loan
      ),
    })),
}));

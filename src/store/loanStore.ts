import { create } from "zustand";

import type { Loan } from "../types/loans/Loan";
import api from "../api";

type LoanState = {
  loans: Loan[];
  loading: boolean;
  setLoans: (loans: Loan[]) => void;
  setLoading: (loading: boolean) => void;
  updateLoan: (updatedLoan: Loan) => void;
  fetchLoans: () => Promise<void>;
};

export const useLoanStore = create<LoanState>((set, get) => ({
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
  fetchLoans: async () => {
    const state = get();
    if (state.loans.length > 0) {
      return;
    }
    
    set({ loading: true });
    try {
      const response = await api.get<Loan[]>("/loans");
      set({ loans: response.data, loading: false });
    } catch (err) {
      set({ loading: false });
      console.error("Failed to fetch loans", err);
    }
  },
}));

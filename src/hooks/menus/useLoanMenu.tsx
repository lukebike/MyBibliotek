/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import api from "../../api";
import type { Loan } from "../../types/loans/Loan";
import { useLoanStore } from "../../store/loanStore";
import { useNotification } from "../useNotification";

export const useLoanActionsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLoanId, setSelectedLoanId] = useState<null | number | string>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const loans = useLoanStore((state) => state.loans);
  const setLoans = useLoanStore((state) => state.setLoans);
  const { showSuccess, showError } = useNotification();

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    loanId: number | string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedLoanId(loanId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLoanId(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleExtendLoan = async () => {
    if (selectedLoanId) {
      const loan = loans.find((loan: Loan) => loan.id === selectedLoanId);
      if (loan?.returnedDate) {
        showError("Cannot extend loan: This book has already been returned.");
        handleMenuClose();
        return;
      }
      try {
        const response = await api.put(`/loans/${selectedLoanId}/extend`);
        const updatedLoan = response.data;
        setLoans(
          loans.map((loan: Loan) =>
            loan.id === updatedLoan.id ? updatedLoan : loan
          )
        );
        showSuccess(
          `Loan extended successfully! New due date: ${new Date(
            updatedLoan.dueDate
          ).toLocaleDateString()}`
        );
        handleMenuClose();
      } catch (error: any) {
        const errorMsg =
          error.response?.data?.message || "Could not extend loan";
        showError(errorMsg);
        console.log("Could not extend loan:", error);
      }
    }
  };

  const handleReturnLoan = async () => {
    if (selectedLoanId) {
      const loan = loans.find((loan: Loan) => loan.id === selectedLoanId);
      if (loan?.returnedDate) {
        showError("This book has already been returned.");

        handleMenuClose();
        return;
      }
      try {
        const response = await api.put(`/loans/${selectedLoanId}/return`);
        const updatedLoan = response.data;
        setLoans(
          loans.map((loan: Loan) =>
            loan.id === updatedLoan.id ? updatedLoan : loan
          )
        );
        const bookTitle = updatedLoan.book?.title || "Book";
        showSuccess(`${bookTitle} returned successfully!`);
        handleMenuClose();
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Could not return loan";
        showError(errorMessage);
        console.error("Could not return loan:", error);
      }
    }
  };

  const handleDeleteLoan = () => {
    setDialogOpen(true);
  };

  const confirmDeleteLoan = async () => {
    if (selectedLoanId) {
      try {
        await api.delete(`/loans/${selectedLoanId}`);
        setLoans(loans.filter((loan: Loan) => loan.id !== selectedLoanId));
        showSuccess("Loan deleted successfully!");
        setDialogOpen(false);
        handleMenuClose();
      } catch (error: any) {
        const errorMsg =
          error.response?.data?.message || "Could not remove loan";
        showError(errorMsg);
        setDialogOpen(false);
        console.log("Could not remove loan:", error);
      }
    }
  };

  const LoanMenu = () => {
    const selectedLoan = loans.find((loan: Loan) => loan.id === selectedLoanId);
    const isReturned = selectedLoan?.returnedDate !== null;

    return (
      <>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {!isReturned && (
            <MenuItem onClick={handleExtendLoan} sx={{ color: "#219EBC" }}>
              Extend Loan
            </MenuItem>
          )}
          {!isReturned && (
            <MenuItem onClick={handleReturnLoan} sx={{ color: "#81551cff" }}>
              Return Loan
            </MenuItem>
          )}
          <MenuItem
            sx={{ color: "#bc4749", fontWeight: "500" }}
            onClick={handleDeleteLoan}
          >
            Delete Loan
          </MenuItem>
        </Menu>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this loan? This action cannot be
            undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button color="error" onClick={confirmDeleteLoan}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return {
    handleMenuOpen,
    LoanMenu,
  };
};

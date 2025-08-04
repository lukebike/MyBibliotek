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
import { useNavigate } from "react-router-dom";
import api from "../../api";
import type { Loan } from "../../types/loans/Loan";
import { useLoanStore } from "../../store/loanStore";

export const useLoanActionsMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLoanId, setSelectedLoanId] = useState<null | number | string>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const loans = useLoanStore((state) => state.loans);
  const setLoans = useLoanStore((state) => state.setLoans);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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
    setDeleteSuccess(false);
  };

  const handleEditLoan = () => {
    if (selectedLoanId) {
      navigate(`/loans/${selectedLoanId}`);
      handleMenuClose();
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
        setDeleteSuccess(true);
      } catch (error) {
        console.log("Could not remove loan:", error);
      }
    }
  };

  const LoanMenu = () => (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditLoan} sx={{ color: "#168aad" }}>
          Edit Loan
        </MenuItem>
        <MenuItem
          sx={{ color: "#bc4749", fontWeight: "500" }}
          onClick={handleDeleteLoan}
        >
          Delete Loan
        </MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {deleteSuccess ? "Loan Deleted" : "Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          {deleteSuccess
            ? "Loan deleted successfully!"
            : "Are you sure you want to delete this loan? This action cannot be undone."}
        </DialogContent>
        <DialogActions>
          {deleteSuccess ? (
            <Button onClick={handleDialogClose}>Close</Button>
          ) : (
            <>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button color="error" onClick={confirmDeleteLoan}>
                Delete
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );

  return {
    handleMenuOpen,
    LoanMenu,
  };
};

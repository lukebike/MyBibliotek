import { useState } from "react";
import {
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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

  const handleExtendLoan = async () => {
    if (selectedLoanId) {
      try {
        const response = await api.put(`/loans/${selectedLoanId}/extend`);
        const updatedLoan = response.data;
        setLoans(
          loans.map((loan: Loan) =>
            loan.id === updatedLoan.id ? updatedLoan : loan
          )
        );
        setSnackbarOpen(true);
        handleMenuClose();
      } catch (error) {
        console.log("Could not extned loan:", error);
      }
    }
  };

  const handleReturnLoan = () => {
    if (selectedLoanId) {
      navigate(`/loans/${selectedLoanId}/return`);
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

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const LoanMenu = () => (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleExtendLoan} sx={{ color: "#219EBC" }}>
          Extend Loan
        </MenuItem>
        <MenuItem onClick={handleReturnLoan} sx={{ color: "#81551cff" }}>
          Return Loan
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Loan successfully extended!
        </Alert>
      </Snackbar>
    </>
  );

  return {
    handleMenuOpen,
    LoanMenu,
  };
};

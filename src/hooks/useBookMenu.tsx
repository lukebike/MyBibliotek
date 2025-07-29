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
import api from "../api";
import type { Book } from "../types/Book/Book";
import { useBookStore } from "../store/bookStore";

export const useBookActionsMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBookId, setSelectedBookId] = useState<null | number | string>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const books = useBookStore((state) => state.books);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const setBooks = useBookStore((state) => state.setBooks);
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    bookId: number | string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedBookId(bookId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBookId(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDeleteSuccess(false); // Reset dialog state
  };

  const handleEditBook = () => {
    if (selectedBookId) {
      navigate(`/books/${selectedBookId}`);
      handleMenuClose();
    }
  };

  const handleDeleteBook = () => {
    setDialogOpen(true);
  };

  const confirmDeleteBook = async () => {
    console.log("Delete clicked", selectedBookId);
    if (selectedBookId) {
      try {
        await api.delete(`/authors/${selectedBookId}`);
        setBooks(books.filter((book: Book) => book.id !== selectedBookId));
        setDeleteSuccess(true);
      } catch (error) {
        console.log("Could not remove user:", error);
      }
    }
  };

  const BookMenu = () => (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditBook} sx={{ color: "#168aad" }}>
          Edit Book
        </MenuItem>
        <MenuItem
          sx={{ color: "#bc4749", fontWeight: "500" }}
          onClick={handleDeleteBook}
        >
          Delete Book
        </MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {deleteSuccess ? "Book Deleted" : "Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          {deleteSuccess
            ? "Book deleted successfully!"
            : "Are you sure you want to delete this book? This action cannot be undone."}
        </DialogContent>
        <DialogActions>
          {deleteSuccess ? (
            <Button onClick={handleDialogClose}>Close</Button>
          ) : (
            <>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button color="error" onClick={confirmDeleteBook}>
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
    BookMenu,
  };
};

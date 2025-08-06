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
import { useNavigate } from "react-router-dom";
import api from "../../api";
import type { Book } from "../../types/books/Book";
import { useBookStore } from "../../store/bookStore";
import { useNotification } from "../useNotification";

export const useBookActionsMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBookId, setSelectedBookId] = useState<null | number | string>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const books = useBookStore((state) => state.books);
  const setBooks = useBookStore((state) => state.setBooks);
  const { showSuccess, showError } = useNotification();
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
    if (selectedBookId) {
      try {
        await api.delete(`/books/${selectedBookId}`);
        setBooks(books.filter((book: Book) => book.id !== selectedBookId));
        showSuccess("Book deleted successfully!");
        setDialogOpen(false);
        handleMenuClose();
      } catch (error: any) {
        const errorMsg =
          error.response?.data?.message || "Could not remove book";
        showError(errorMsg);
        setDialogOpen(false);
        console.log("Could not remove book:", error);
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
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this book? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button color="error" onClick={confirmDeleteBook}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return {
    handleMenuOpen,
    BookMenu,
  };
};

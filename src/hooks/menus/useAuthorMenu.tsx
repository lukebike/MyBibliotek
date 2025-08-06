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
import type { Author } from "../../types/authors/Author";
import { useAuthorStore } from "../../store/authorStore";
import { useNotification } from "../useNotification";

export const useAuthorActionsMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState<
    null | number | string
  >(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const authors = useAuthorStore((state) => state.authors);
  const { showSuccess, showError } = useNotification();
  const setAuthors = useAuthorStore((state) => state.setAuthors);
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    authorId: number | string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedAuthorId(authorId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAuthorId(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleEditAuthor = () => {
    if (selectedAuthorId) {
      navigate(`/authors/${selectedAuthorId}`);
      handleMenuClose();
    }
  };

  const handleDeleteAuthor = () => {
    setDialogOpen(true);
  };

  const confirmDeleteAuthor = async () => {
    if (selectedAuthorId) {
      try {
        await api.delete(`/authors/${selectedAuthorId}`);
        setAuthors(
          authors.filter((author: Author) => author.id !== selectedAuthorId)
        );
        showSuccess(`Author deleted successfully`);
      } catch (error: any) {
        showError(`Could not remove author: ${error.response?.data}`);
        console.log("Could not remove author:", error);
      }
    }
  };

  const AuthorMenu = () => (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditAuthor} sx={{ color: "#168aad" }}>
          Edit Author
        </MenuItem>
        <MenuItem
          sx={{ color: "#bc4749", fontWeight: "500" }}
          onClick={handleDeleteAuthor}
        >
          Delete Author
        </MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this author? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button color="error" onClick={confirmDeleteAuthor}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return {
    handleMenuOpen,
    AuthorMenu,
  };
};

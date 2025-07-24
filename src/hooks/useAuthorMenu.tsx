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
import type { Author } from "../types/Author/Author";
import { useAuthorStore } from "../store/authorStore";

export const useAuthorActionsMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState<
    null | number | string
  >(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const authors = useAuthorStore((state) => state.authors);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
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
    setDeleteSuccess(false); // Reset dialog state
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
    console.log("Delete clicked", selectedAuthorId);
    if (selectedAuthorId) {
      try {
        await api.delete(`/users/${selectedAuthorId}`);
        setAuthors(
          authors.filter((author: Author) => author.id !== selectedAuthorId)
        );
        setDeleteSuccess(true);
      } catch (error) {
        console.log("Could not remove user:", error);
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
        <MenuItem onClick={handleEditAuthor} sx={{ color: "blue" }}>
          Edit Author
        </MenuItem>
        <MenuItem
          sx={{ color: "red", fontWeight: "500" }}
          onClick={handleDeleteAuthor}
        >
          Delete Author
        </MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {deleteSuccess ? "Author Deleted" : "Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          {deleteSuccess
            ? "Author deleted successfully!"
            : "Are you sure you want to delete this author? This action cannot be undone."}
        </DialogContent>
        <DialogActions>
          {deleteSuccess ? (
            <Button onClick={handleDialogClose}>Close</Button>
          ) : (
            <>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button color="error" onClick={confirmDeleteAuthor}>
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
    AuthorMenu,
  };
};

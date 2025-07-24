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
import { useUserStore } from "../store/userStore";
import api from "../api";
import type { User } from "../types/User/User";

export const useAuthorActionsMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<null | number | string>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const users = useUserStore((state) => state.users);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const setUsers = useUserStore((state) => state.setUsers);
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    userId: number | string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDeleteSuccess(false); // Reset dialog state
  };

  const handleEditUser = () => {
    if (selectedUserId) {
      navigate(`/users/${selectedUserId}`);
      handleMenuClose();
    }
  };

  const handleDeleteUser = () => {
    setDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    console.log("Delete clicked", selectedUserId);
    if (selectedUserId) {
      try {
        await api.delete(`/users/${selectedUserId}`);
        setUsers(users.filter((u: User) => u.id !== selectedUserId));
        setDeleteSuccess(true);
      } catch (error) {
        console.log("Could not remove user:", error);
      }
    }
  };

  const UserMenu = () => (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditUser} sx={{ color: "blue" }}>
          Edit User
        </MenuItem>
        <MenuItem
          sx={{ color: "red", fontWeight: "500" }}
          onClick={handleDeleteUser}
        >
          Delete User
        </MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {deleteSuccess ? "User Deleted" : "Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          {deleteSuccess
            ? "User deleted successfully!"
            : "Are you sure you want to delete this user? This action cannot be undone."}
        </DialogContent>
        <DialogActions>
          {deleteSuccess ? (
            <Button onClick={handleDialogClose}>Close</Button>
          ) : (
            <>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button color="error" onClick={confirmDeleteUser}>
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
    UserMenu,
  };
};

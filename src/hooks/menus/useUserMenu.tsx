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
import { useUserStore } from "../../store/userStore";
import api from "../../api";
import type { User } from "../../types/users/User";
import { useNotification } from "../useNotification";

export const useUserActionsMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<null | number | string>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const users = useUserStore((state) => state.users);
  const { showSuccess, showError } = useNotification();
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
    if (selectedUserId) {
      try {
        await api.delete(`/users/${selectedUserId}`);
        setUsers(users.filter((u: User) => u.id !== selectedUserId));
        showSuccess("User deleted successfully!");
        setDialogOpen(false);
        handleMenuClose();
      } catch (error) {
        showError(`Could not remove user: ${error}`);
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
        <MenuItem onClick={handleEditUser} sx={{ color: "#168aad" }}>
          Edit User
        </MenuItem>
        <MenuItem
          sx={{ color: "#bc4749", fontWeight: "500" }}
          onClick={handleDeleteUser}
        >
          Delete User
        </MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button color="error" onClick={confirmDeleteUser}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return {
    handleMenuOpen,
    UserMenu,
  };
};

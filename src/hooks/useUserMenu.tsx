import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";

export const useUserActionsMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<null | number | string>(
    null
  );

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

  const handleEditUser = () => {
    console.log("EDIT user:", selectedUserId);
    handleMenuClose();
  };

  const handleDeleteUser = () => {
    console.log("DELETE user:", selectedUserId);
    handleMenuClose();
  };

  const UserMenu = () => (
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
  );

  return {
    handleMenuOpen,
    UserMenu,
  };
};

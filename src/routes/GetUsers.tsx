import { useEffect, useMemo, useState } from "react";
import api from "../api";
import type { User } from "../types/User";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Paper, TextField } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";
import { DataGrid } from "@mui/x-data-grid";
import { getUserColumns } from "../components/GetUserColumns";
import { useUserActionsMenu } from "../hooks/useUserMenu";
import Fuse from "fuse.js";

const GetUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fuse = useMemo(() => {
    const fuseOptions = {
      threshold: 0.3,
      keys: ["firstName", "lastName", "email"],
    };
    return new Fuse(users, fuseOptions);
  }, [users]);

  const { handleMenuOpen, UserMenu } = useUserActionsMenu();
  const columns = getUserColumns(handleMenuOpen);

  useEffect(() => {
    api
      .get<User[]>("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users: ", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">Loading... </Typography> <CircularProgress />
      </Box>
    );

  const filteredUsers = debouncedSearchTerm.trim()
    ? fuse.search(debouncedSearchTerm).map((result) => result.item)
    : users;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Manage Users</Typography>
        <Button
          href="/users/post"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "grey",
            "&:hover": {
              backgroundColor: "cyan",
            },
          }}
        >
          Add User
        </Button>
      </Box>
      <TextField
        fullWidth
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: "10px" }}
      />
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: rowsPerPage },
            },
          }}
          onPaginationModelChange={(model) => setRowsPerPage(model.pageSize)}
          disableRowSelectionOnClick
        />
      </Box>
      <UserMenu />
    </Paper>
  );
};

export default GetUsers;

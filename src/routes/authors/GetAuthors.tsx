import { useEffect, useState } from "react";
import api from "../../api";
import AddIcon from "@mui/icons-material/Add";
import type { Author } from "../../types/Author/Author";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAuthorColumns } from "../../components/GetAuthorColumns";
import { useUserActionsMenu } from "../../hooks/useUserMenu";

export default function GetAuthors() {
  const [authors, setAuthors] = useState<Author[]>();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    api
      .get<Author[]>("/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((err) => console.error("Error fetching authors", err));
  }, []);

  const columns = getAuthorColumns(useUserActionsMenu);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Manage Authors</Typography>
        <Button
          href="/authors/post"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "grey",
            "&:hover": {
              backgroundColor: "cyan",
            },
          }}
        >
          Add Author
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
          rows={authors}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{}}
          disableRowSelectionOnClick
        />
      </Box>
    </Paper>
  );
}

import { Paper, Box, Typography, Button, TextField } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { ReactNode } from "react";
import AddIcon from "@mui/icons-material/Add";
import type { User } from "../types/User/User";
import type { Book } from "../types/Book/Book";
import type { Author } from "../types/Author/Author";

interface DataGridLayoutProps {
  title: string;
  addUrl: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  rows: User[] | Book[] | Author[];
  columns: GridColDef[];
  loading: boolean;
  totalCount?: number;
  paginationModel?: { page: number; pageSize: number };
  onPaginationChange?: (model: { page: number; pageSize: number }) => void;
  paginationMode?: "client" | "server";
  children?: ReactNode;
}

export const DataGridLayout: React.FC<DataGridLayoutProps> = ({
  title,
  addUrl,
  searchTerm,
  onSearchChange,
  rows,
  columns,
  loading,
  totalCount,
  paginationModel,
  onPaginationChange,
  paginationMode = "client",
  children,
}) => (
  <Paper elevation={3} sx={{ p: 3 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <Typography variant="h4">{title}</Typography>
      <Button
        href={addUrl}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: "grey",
          "&:hover": {
            backgroundColor: "cyan",
          },
        }}
      >
        Add {title.split(" ")[1]}
      </Button>
    </Box>
    <TextField
      fullWidth
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      sx={{ marginBottom: "10px" }}
    />
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: paginationModel || { page: 0, pageSize: 5 },
          },
        }}
        onPaginationModelChange={onPaginationChange}
        paginationMode={paginationMode}
        rowCount={totalCount}
        disableRowSelectionOnClick
      />
    </Box>
    {children}
  </Paper>
);

import { useEffect, useMemo, useState } from "react";
import api from "../../api";
import type { User } from "../../types/User/User";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Paper, TextField } from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";
import { DataGrid } from "@mui/x-data-grid";

import Fuse from "fuse.js";
import { useBookActionsMenu } from "../../hooks/useBookMenu";
import { getBookColumns } from "../../components/GetBookColumns";
import type { Book } from "../../types/Book/Book";
import { useBookStore } from "../../store/bookStore";

const GetBooks: React.FC = () => {
  const books = useBookStore((state) => state.books);
  const loading = useBookStore((state) => state.loading);
  const setBooks = useBookStore((state) => state.setBooks);
  const [totalCount, setTotalCount] = useState(0);
  const setLoading = useBookStore((state) => state.setLoading);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fuse = useMemo(() => {
    const fuseOptions = {
      threshold: 0.3,
      keys: ["title", "publicationYear"],
    };
    return new Fuse(books, fuseOptions);
  }, [books]);

  const { handleMenuOpen, BookMenu } = useBookActionsMenu();
  const columns = getBookColumns(handleMenuOpen);

  useEffect(() => {
    api
      .get("/books", {
        params: {
          pageNumber: paginationModel.page,
          pageSize: paginationModel.pageSize,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBooks(res.data.books);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => console.error("Error fetching books: ", err))
      .finally(() => setLoading(false));
  }, [paginationModel, setBooks, setLoading]);

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

  const filteredBooks = debouncedSearchTerm.trim()
    ? fuse.search(debouncedSearchTerm).map((result) => result.item)
    : books;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Manage Books</Typography>
        <Button
          href="/books/post"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "grey",
            "&:hover": {
              backgroundColor: "cyan",
            },
          }}
        >
          Add Book
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
          rows={filteredBooks}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: paginationModel,
            },
          }}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          rowCount={totalCount}
          disableRowSelectionOnClick
        />
      </Box>
      <BookMenu />
    </Paper>
  );
};

export default GetBooks;

import { GridActionsCellItem, type GridColDef } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Tooltip } from "@mui/material";
import type { Book } from "../types/Book/Book";

export const getAuthorColumns = (
  handleMenuOpen: (
    event: React.MouseEvent<HTMLElement>,
    authorId: number | string
  ) => void
): GridColDef[] => [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 170,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 170,
  },
  {
    field: "nationality",
    headerName: "Nationality",
    width: 170,
  },
  {
    field: "books",
    headerName: "Books",
    width: 250,
    renderCell: (params) => {
      const books = params.row.books || [];
      const titles = books.map((b: Book) => b.title);
      const preview =
        titles.slice(0, 2).join(", ") +
        (titles.length > 2 ? `, +${titles.length - 2} more` : "");
      return (
        <Tooltip title={titles.join(", ") || "No books"}>
          <span>{preview || "No books"}</span>
        </Tooltip>
      );
    },
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    flex: 1,
    headerAlign: "right",
    align: "right",
    cellClassName: "actions",
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<MoreVertIcon />}
          label="More"
          onClick={(event) => handleMenuOpen(event, id)}
        />,
      ];
    },
  },
];

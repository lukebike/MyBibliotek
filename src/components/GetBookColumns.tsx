import { GridActionsCellItem, type GridColDef } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { Author } from "../types/Author/Author";

export const getBookColumns = (
  handleMenuOpen: (
    event: React.MouseEvent<HTMLElement>,
    userId: number | string
  ) => void
): GridColDef[] => [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "title",
    headerName: "Title",
    width: 170,
  },
  {
    field: "publicationYear",
    headerName: "Publication Year",
    width: 170,
  },
  {
    field: "availableCopies",
    headerName: "Available Copies",
    width: 170,
  },
  { field: "totalCopies", headerName: "Total Copies", width: 170 },
  {
    field: "author",
    headerName: "Author",
    width: 170,
    renderCell: (params) => {
      console.log(params.row);
      const author = params.row.author;
      if (!author) return <span>Unknown</span>;
      return (
        <span>
          {author.firstName} {author.lastName}
        </span>
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

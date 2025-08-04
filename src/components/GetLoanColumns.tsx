import { GridActionsCellItem, type GridColDef } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const getLoanColumns = (
  handleMenuOpen: (
    event: React.MouseEvent<HTMLElement>,
    userId: number | string
  ) => void
): GridColDef[] => [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "user",
    headerName: "Borrower",
    width: 170,
    renderCell: (params) => {
      console.log(params.row);
      const borrower = params.row.user;
      if (!borrower) return <span>Anonymous</span>;
      return (
        <span>
          {borrower.firstName} {borrower.lastName}
        </span>
      );
    },
  },
  {
    field: "book",
    headerName: "Borrowed Book",
    width: 170,
    renderCell: (params) => {
      console.log(params.row);
      const book = params.row.book;
      if (!book) return <span>Unknown Book</span>;
      return <span>{book.title}</span>;
    },
  },
  {
    field: "borrowedDate",
    headerName: "Borrowed Date",
    width: 170,
  },
  { field: "dueDate", headerName: "Due Date", width: 170 },
  {
    field: "returnedDate",
    headerName: "Returned Date",
    width: 170,
    renderCell: (params) => {
      console.log(params.row);
      const returnedDate = params.row.returnedDate;
      if (!returnedDate) return <span>Not returned yet</span>;
      return <span>{returnedDate}</span>;
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

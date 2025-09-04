import { GridActionsCellItem, type GridColDef } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const getUserColumns = (
  handleMenuOpen: (
    event: React.MouseEvent<HTMLElement>,
    userId: number | string
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
    field: "email",
    headerName: "Email",
    width: 250,
  },
  { field: "registrationDate", headerName: "Registration Date", width: 200 },
  { field: "role", headerName: "Role", width: 100 },
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

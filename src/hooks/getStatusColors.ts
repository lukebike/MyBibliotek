import { useTheme } from "@mui/material/styles";

export const useStatusColor = (status: string) => {
  const theme = useTheme();
  switch (status) {
    case "active":
      return theme.palette.info.main;
    case "overdue":
      return theme.palette.warning.main;
    default:
      return theme.palette.text.secondary;
  }
};

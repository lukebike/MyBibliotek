import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#12141779", // Main app background
      paper: "#12141779", // Cards, panels, etc.
    },
    text: {
      primary: "#FFFFFF", // Main text
      secondary: "#A3ABB2", // Subtle/secondary text
      disabled: "#40474F", // Disabled text
    },
    divider: "#2B3036", // Divider lines
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#2B3036", // Input background
          color: "#FFFFFF",
        },
        input: {
          color: "#FFFFFF",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          borderColor: "#40474F",
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
      disabled: "#BDBDBD",
    },
    divider: "#E0E0E0",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#F5F5F5",
          color: "#212121",
        },
        input: {
          color: "#212121",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#212121",
          borderColor: "#E0E0E0",
        },
      },
    },
  },
});

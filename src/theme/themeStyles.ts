import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1565C0",
      dark: "#0D47A1",
      light: "#42A5F5",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#7E57C2",
      dark: "#5E35B1",
      light: "#B39DDB",
      contrastText: "#FFFFFF",
    },
    success: { main: "#2E7D32" },
    warning: { main: "#F57C00" },
    error: { main: "#D32F2F" },
    info: { main: "#0288D1" },

    background: {
      default: "#12141779",
      paper: "#12141779",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A3ABB2",
      disabled: "#40474F",
    },
    divider: "#2B3036",
  },

  shape: { borderRadius: 10 },

  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body2: { fontWeight: 500 },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
        containedPrimary: ({ theme }) => ({
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          "&:hover": { backgroundColor: theme.palette.primary.dark },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === "dark" ? "#40474F" : "#F1F5F9",
          borderRadius: 999,
        }),
        bar: { borderRadius: 999 },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === "dark" ? "#2B3036" : "#F5F5F5",
          color: theme.palette.text.primary,
        }),
        input: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          borderColor: theme.palette.divider,
        }),
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1565C0",
      dark: "#0D47A1",
      light: "#42A5F5",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#7E57C2",
      dark: "#5E35B1",
      light: "#B39DDB",
      contrastText: "#FFFFFF",
    },
    success: { main: "#2E7D32" },
    warning: { main: "#F57C00" },
    error: { main: "#D32F2F" },
    info: { main: "#0288D1" },

    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
      disabled: "#BDBDBD",
    },
    divider: "#E0E0E0",
  },

  shape: { borderRadius: 10 },

  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body2: { fontWeight: 500 },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
        containedPrimary: ({ theme }) => ({
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          "&:hover": { backgroundColor: theme.palette.primary.dark },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === "dark" ? "#40474F" : "#F1F5F9",
          borderRadius: 999,
        }),
        bar: { borderRadius: 999 },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === "dark" ? "#2B3036" : "#F5F5F5",
          color: theme.palette.text.primary,
        }),
        input: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          borderColor: theme.palette.divider,
        }),
      },
    },
  },
});

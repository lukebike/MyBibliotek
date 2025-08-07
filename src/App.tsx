import GetUsers from "./routes/users/GetUsers";
import "./App.css";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import PostUsers from "./routes/users/PostUsers";
import { BrowserRouter, Route, Routes } from "react-router";
import UpdateUser from "./routes/users/UpdateUser";
import GetAuthors from "./routes/authors/GetAuthors";
import PostAuthors from "./routes/authors/PostAuthors";
import GetBooks from "./routes/books/GetBooks";
import PostBooks from "./routes/books/PostBooks";
import UpdateBook from "./routes/books/UpdateBook";
import UpdateAuthor from "./routes/authors/UpdateAuthor";
import GetLoans from "./routes/loans/GetLoans";
import PostLoans from "./routes/loans/PostLoans";
import { ThemeContextProvider } from "./context/ThemeContextProvider";
import { useThemeContext } from "./hooks/useThemeContext";
import { NotificationManager } from "./components/NotificationManager";
import Dashboard from "./layout/Dashboard";

function AppContent() {
  const { theme, isDark } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box
          sx={{
            backgroundColor: isDark ? "#121212" : "#FFFFFF",
            minHeight: "100vh",
          }}
        >
          <Container maxWidth="lg">
            <ResponsiveAppBar />
            <Routes>
              <Route path="users" element={<GetUsers />} />
              <Route path="users/post" element={<PostUsers />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="authors" element={<GetAuthors />} />
              <Route path="authors/post" element={<PostAuthors />} />
              <Route path="authors/:id" element={<UpdateAuthor />} />
              <Route path="books" element={<GetBooks />} />
              <Route path="books/post" element={<PostBooks />} />
              <Route path="books/:id" element={<UpdateBook />} />
              <Route path="loans" element={<GetLoans />} />
              <Route path="loans/post" element={<PostLoans />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Container>
          <NotificationManager />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}

export default App;

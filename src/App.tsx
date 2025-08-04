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
import { CustomThemeProvider } from "./context/ThemeContext";
import { useThemeContext } from "./hooks/useThemeContext";

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
            <div>
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
              </Routes>
            </div>
          </Container>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;

import GetUsers from "./routes/users/GetUsers";
import "./App.css";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import PostUsers from "./routes/users/PostUsers";
import { BrowserRouter, Route, Routes } from "react-router";
import UpdateUser from "./routes/users/UpdateUser";
import GetAuthors from "./routes/authors/GetAuthors";
import { darkTheme } from "./theme/themeStyles";
import PostAuthors from "./routes/authors/PostAuthors";
import GetBooks from "./routes/books/GetBooks";
import PostBooks from "./routes/books/PostBooks";
import UpdateBook from "./routes/books/UpdateBook";
import UpdateAuthor from "./routes/authors/UpdateAuthor";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ backgroundColor: "#121212", minHeight: "100vh" }}>
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
              </Routes>
            </div>
          </Container>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

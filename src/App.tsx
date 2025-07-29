import GetUsers from "./routes/users/GetUsers";
import "./App.css";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import PostUsers from "./routes/users/PostUsers";
import { BrowserRouter, Route, Routes } from "react-router";
import EditUser from "./routes/users/EditUser";
import GetAuthors from "./routes/authors/GetAuthors";
import PostAuthors from "./routes/authors/PostAuthors";
import GetBooks from "./routes/books/GetBooks";

function App() {
  return (
    <BrowserRouter>
      <Box>
        <Container maxWidth="lg">
          <div>
            <ResponsiveAppBar />
            <Routes>
              <Route path="users" element={<GetUsers />} />
              <Route path="users/post" element={<PostUsers />} />
              <Route path="users/:id" element={<EditUser />} />
              <Route path="authors" element={<GetAuthors />} />
              <Route path="authors/post" element={<PostAuthors />} />
              <Route path="books" element={<GetBooks />} />
            </Routes>
          </div>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

export default App;

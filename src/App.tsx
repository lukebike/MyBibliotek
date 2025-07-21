import GetUsers from "./routes/GetUsers";
import "./App.css";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import PostUsers from "./routes/PostUsers";
import { BrowserRouter, Route, Routes } from "react-router";
import EditUser from "./routes/EditUser";

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
            </Routes>
          </div>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

export default App;

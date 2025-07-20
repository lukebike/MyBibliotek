import GetUsers from "./routes/GetUsers";
import "./App.css";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import PostUsers from "./routes/PostUsers";
import { BrowserRouter, Route, Routes } from "react-router";

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
            </Routes>
          </div>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

export default App;

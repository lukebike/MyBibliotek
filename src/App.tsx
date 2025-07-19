import UserList from "./routes/GetUsers";
import "./App.css";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import PostUsers from "./routes/PostUsers";

function App() {
  return (
    <Box>
      <Container maxWidth="lg">
        <div>
          <ResponsiveAppBar />
          <UserList />
          <PostUsers />
        </div>
      </Container>
    </Box>
  );
}

export default App;

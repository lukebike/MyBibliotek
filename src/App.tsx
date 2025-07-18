import UserList from "./routes/getUsers";
import "./App.css";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import PostUsers from "./routes/postUsers";

function App() {
  return (
    <Container maxWidth="lg">
      <div>
        <ResponsiveAppBar />
        <UserList />
        <PostUsers />
      </div>
    </Container>
  );
}

export default App;

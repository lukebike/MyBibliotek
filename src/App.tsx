import UserList from "./routes/users";
import "./App.css";
import { Container, Typography } from "@mui/material";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";

function App() {
  return (
    <Container maxWidth="lg">
      <div>
        <ResponsiveAppBar />
        <UserList />
      </div>
    </Container>
  );
}

export default App;

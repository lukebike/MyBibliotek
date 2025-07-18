import UserList from "./routes/users";
import "./App.css";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container maxWidth="lg">
      <div>
        <Typography variant="h3">Library System</Typography>
        <UserList />
      </div>
    </Container>
  );
}

export default App;

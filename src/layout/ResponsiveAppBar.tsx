import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { Link } from "react-router";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeContext } from "../hooks/useThemeContext";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
const isLoggedIn = localStorage.getItem("jwt");
const drawerWidth = 240;
const navItems = [
  "Dashboard",
  "Users",
  "Authors",
  "Books",
  "Loans",
  isLoggedIn ? "Logout" : "Login",
  ...(!isLoggedIn ? ["Register"] : []),
];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isDark, toggleTheme } = useThemeContext();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MyBibliotek
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              component={Link}
              to={`/${item.toLowerCase()}`}
              sx={{ textAlign: "center" }}
              onClick={() => {
              if (item.toLowerCase() === "logout") {
                localStorage.removeItem("jwt");
                location.reload();
              }
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={toggleTheme} sx={{ textAlign: "center" }}>
            <ListItemText
              primary={isDark ? "Light Mode" : "Dark Mode"}
              secondary={isDark ? <LightModeIcon /> : <DarkModeIcon />}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar
          component="nav"
          color="inherit"
          sx={{
            backgroundColor: isDark ? "#121212" : "#FFFFFF",
            borderBottom: isDark ? "1px solid #2B3036" : "1px solid #E0E0E0",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                color: isDark ? "#fff" : "#212121",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block", fontWeight: "500" },
                color: isDark ? "#fff" : "#212121",
                fontWeight: "500",
              }}
            >
              MyBibliotek
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  component={Link}
                  to={`/${item.toLowerCase()}`}
                  key={item}
                  sx={{
                    color: isDark ? "#fff" : "#212121",
                    textTransform: "none",
                    fontWeight: "400",
                  }}
                   onClick={() => {
              if (item.toLowerCase() === "logout") {
                localStorage.removeItem("jwt");
                location.reload();
              }
              }}
                >
                  {item}
                </Button>
              ))}
            </Box>
            <IconButton
              onClick={toggleTheme}
              sx={{
                display: { xs: "none", sm: "inherit" },
                ml: 2,
                color: isDark ? "#fff" : "#212121",
              }}
              aria-label="toggle theme"
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: isDark ? "#121212" : "#FFFFFF",
                color: isDark ? "#FFFFFF" : "#212121",
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Container>
    </Box>
  );
}

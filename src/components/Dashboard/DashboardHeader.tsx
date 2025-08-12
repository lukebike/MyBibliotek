import { Box, Typography, type Theme } from "@mui/material";
import { memo } from "react";

export const DashboardHeader = memo(({ theme }: { theme: Theme }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 4,
    }}
  >
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          mb: 1,
        }}
      >
        Dashboard
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
        Welcome back! Here's what's happening in your library today.
      </Typography>
    </Box>
  </Box>
));

import React from "react";
import { Paper, Typography, Box, useTheme } from "@mui/material";

interface DashboardCardProps {
  title: string;
  value: string | number;
  growth?: number;
  icon: React.ReactNode;
  color?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  growth,
  icon,
  color = "#666",
}) => {
  const theme = useTheme();

  const formatGrowth = (growth: number) => {
    const absGrowth = Math.abs(growth);
    const action = growth >= 0 ? "increase" : "decrease";
    return `${absGrowth.toFixed(1)}% ${action} this month`;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        height: "100%",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
            fontSize: "0.875rem",
          }}
        >
          {title}
        </Typography>
        <Box sx={{ color: color, fontSize: "1.25rem" }}>{icon}</Box>
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          mb: 1,
          fontSize: "2rem",
        }}
      >
        {typeof value === "number" ? value.toLocaleString() : value}
      </Typography>

      {growth !== undefined && (
        <Typography
          variant="caption"
          sx={{
            color: growth >= 0 ? "#4caf50" : "#f44336",
            fontSize: "0.75rem",
          }}
        >
          {formatGrowth(growth)}
        </Typography>
      )}
    </Paper>
  );
};

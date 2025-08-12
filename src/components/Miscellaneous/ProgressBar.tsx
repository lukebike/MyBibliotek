import React from "react";
import { Box, LinearProgress, useTheme } from "@mui/material";
import type { ProgressBarProps } from "../../types/miscellaneous/ProgressBar";

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  total,
  color = "#1976d2",
  height = 8,
}) => {
  const theme = useTheme();
  const percentage = (value / total) * 100;

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: height,
          borderRadius: height / 2,
          backgroundColor:
            theme.palette.mode === "dark" ? "#40474F" : "#f5f5f5",
          "& .MuiLinearProgress-bar": {
            backgroundColor: color,
            borderRadius: height / 2,
          },
        }}
      />
    </Box>
  );
};

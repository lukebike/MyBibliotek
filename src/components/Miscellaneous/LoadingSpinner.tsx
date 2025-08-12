import { Box, Skeleton, Typography } from "@mui/material";
import type { LoadingSpinnerProps } from "../../types/miscellaneous/LoadingSpinnerProps";

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ rows = 5 }) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" textAlign={"center"}>
      Loading, please wait...
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <Skeleton variant="text" sx={{ fontSize: "2rem", width: "200px" }} />
      <Skeleton variant="rectangular" width={120} height={36} />
    </Box>
    <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
    {Array.from({ length: rows }).map((_, index) => (
      <Skeleton key={index} variant="rectangular" height={52} sx={{ mb: 1 }} />
    ))}
  </Box>
);

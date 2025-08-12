import { memo } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { ProgressBar } from "./ProgressBar";

interface UsageMetric {
  label: string;
  current: number;
  total: number;
}

interface UsageMetricsSectionProps {
  usageMetrics: UsageMetric[];
  theme: any;
}

const MetricItem = memo(
  ({ metric, theme }: { metric: UsageMetric; theme: any }) => {
    const percentage =
      metric.total > 0 ? (metric.current / metric.total) * 100 : 0;

    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            {metric.label}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "0.75rem",
            }}
          >
            {metric.current}/{metric.total} ({percentage.toFixed(0)}%)
          </Typography>
        </Box>
        <ProgressBar
          value={metric.current}
          total={metric.total}
          color={theme.palette.secondary.main}
        />
      </Box>
    );
  }
);

const UsageMetrics = memo(
  ({ usageMetrics, theme }: UsageMetricsSectionProps) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 3,
          color: theme.palette.text.primary,
        }}
      >
        Library Usage
      </Typography>

      {usageMetrics.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {usageMetrics.map((metric, index) => (
            <MetricItem
              key={`${metric.label}-${index}`}
              metric={metric}
              theme={theme}
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            No usage data available
          </Typography>
        </Box>
      )}
    </Paper>
  )
);

export default UsageMetrics;

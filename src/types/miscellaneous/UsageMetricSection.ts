import type { Theme } from "@mui/material";
import type { UsageMetric } from "./UsageMetric";

export interface UsageMetricsSectionProps {
  usageMetrics: UsageMetric[];
  theme: Theme;
}

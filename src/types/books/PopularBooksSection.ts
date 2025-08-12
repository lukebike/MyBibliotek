import type { Theme } from "@mui/material";
import type { PopularBook } from "./PopularBook";

export interface PopularBooksSectionProps {
  popularBooks: PopularBook[];
  theme: Theme;
}

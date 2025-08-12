import { memo } from "react";
import { Box, Typography, Paper, type Theme } from "@mui/material";
import { ProgressBar } from "./ProgressBar";

interface PopularBook {
  id: number;
  title: string;
  loans: number;
  available: number;
  total: number;
}

interface PopularBooksSectionProps {
  popularBooks: PopularBook[];
  theme: Theme;
}

const BookProgressItem = memo(
  ({ book, theme }: { book: PopularBook; theme: Theme }) => (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: theme.palette.text.primary,
            maxWidth: "60%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {book.title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.75rem",
          }}
        >
          {book.loans} loans • {book.available}/{book.total} available
        </Typography>
      </Box>
      <ProgressBar
        value={book.loans}
        total={Math.max(20, book.loans)}
        color={theme.palette.primary.main}
      />
    </Box>
  )
);

const PopularBooksSection = memo(
  ({ popularBooks, theme }: PopularBooksSectionProps) => (
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
        Most Popular Books
      </Typography>

      {popularBooks.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {popularBooks.slice(0, 5).map((book) => (
            <BookProgressItem key={book.id} book={book} theme={theme} />
          ))}
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            No loan data available yet
          </Typography>
        </Box>
      )}
    </Paper>
  )
);

export default PopularBooksSection;

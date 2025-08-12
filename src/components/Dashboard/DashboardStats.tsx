import { memo } from "react";
import { Grid, type Theme } from "@mui/material";
import { DashboardCard } from "./DashboardCard";
import {
  People as PeopleIcon,
  MenuBook as BookIcon,
  Assignment as LoanIcon,
  Person as AuthorIcon,
  Warning as WarningIcon,
  LibraryBooks as LibraryIcon,
} from "@mui/icons-material";
import type { User } from "../../types/users/User";
import type { Book } from "../../types/books/Book";
import type { Author } from "../../types/authors/Author";
import type { Loan } from "../../types/loans/Loan";

interface DashboardStatsProps {
  users: User[];
  books: Book[];
  authors: Author[];
  loans: Loan[];
  activeLoans: number;
  overDueBooks: number;
  returnedBooks: number;
  theme: Theme;
}

const DashboardStats = memo(
  ({
    users,
    books,
    authors,
    theme,
    activeLoans,
    overDueBooks,
    returnedBooks,
  }: DashboardStatsProps) => {
    return (
      <>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <DashboardCard
              title="Total Users"
              value={users.length}
              icon={<PeopleIcon />}
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <DashboardCard
              title="Total Books"
              value={books.length}
              icon={<LibraryIcon />}
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <DashboardCard
              title="Total Authors"
              value={authors.length}
              icon={<AuthorIcon />}
              color={theme.palette.secondary.main}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <DashboardCard
              title="Active Loans"
              value={activeLoans}
              icon={<LoanIcon />}
              color={theme.palette.warning.main}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <DashboardCard
              title="Overdue Books"
              value={overDueBooks}
              icon={<WarningIcon />}
              color={theme.palette.error.main}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <DashboardCard
              title="Books Returned"
              value={returnedBooks}
              icon={<BookIcon />}
              color={theme.palette.success.main}
            />
          </Grid>
        </Grid>
      </>
    );
  }
);

export default DashboardStats;

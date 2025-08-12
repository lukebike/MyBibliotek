import { lazy, Suspense, useEffect, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { Grid } from "@mui/material";

import type { DashboardStats } from "../types/miscellaneous/DashboardStats";

import { useUserStore } from "../store/userStore";
import { getNewUsers } from "../hooks/userUtils";

import { useBookStore } from "../store/bookStore";
import { useLoanStore } from "../store/loanStore";
import { useAuthorStore } from "../store/authorStore";
import { LoadingSpinner } from "../components/Miscellaneous/LoadingSpinner";
import { DashboardHeader } from "../components/Dashboard/DashboardHeader";

import { useStatusColor } from "../hooks/getStatusColors";
import { getNewBooks, getPopularBooks } from "../hooks/bookUtils";
import {
  getActiveLoans,
  getOverdueBooks,
  getRecentLoans,
  getRecentReturns,
  getReturnedBooks,
} from "../hooks/loanUtils";

const DashboardStats = lazy(
  () => import("../components/Dashboard/DashboardStats")
);
const PopularBooks = lazy(
  () => import("../components/Miscellaneous/PopularBooks")
);
const UsageMetricsSection = lazy(
  () => import("../components/Miscellaneous/UsageMetrics")
);
const RecentActivities = lazy(
  () => import("../components/Miscellaneous/RecentActivities")
);

export default function Dashboard() {
  const theme = useTheme();
  const getStatusColor = useStatusColor;

  // LIST OF ENTITIES
  const users = useUserStore((state) => state.users);
  const books = useBookStore((state) => state.books);
  const loans = useLoanStore((state) => state.loans);
  const authors = useAuthorStore((state) => state.authors);

  //LOADING STATES
  const usersLoading = useUserStore((state) => state.loading);
  const booksLoading = useBookStore((state) => state.loading);
  const loansLoading = useLoanStore((state) => state.loading);
  const authorsLoading = useAuthorStore((state) => state.loading);

  // FETCH ENTITIES DATA
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const fetchLoans = useLoanStore((state) => state.fetchLoans);
  const fetchAuthors = useAuthorStore((state) => state.fetchAuthors);
  const newUsers = getNewUsers(users);
  const newBooks = getNewBooks(books);
  const activeLoans = getActiveLoans(loans);
  const returnedBooks = getReturnedBooks(loans);
  const overdueBooks = getOverdueBooks(loans);
  const recentLoans = getRecentLoans(loans, 5);
  const recentReturns = getRecentReturns(loans, 5);
  // DATA COMPARISON

  // LOADING CHECK
  const isLoading =
    usersLoading || booksLoading || loansLoading || authorsLoading;
  const hasData =
    users.length > 0 ||
    books.length > 0 ||
    loans.length > 0 ||
    authors.length > 0;

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchUsers(),
        fetchBooks(),
        fetchLoans(),
        fetchAuthors(),
      ]);
    };

    fetchAllData();
  }, [fetchUsers, fetchBooks, fetchLoans, fetchAuthors]);

  const processedData = useMemo(() => {
    return {
      popularBooks: loans.length > 0 ? getPopularBooks(loans) : [],
      usageMetrics: [
        {
          label: "New Users",
          current: newUsers,
          total: users.length,
        },
        {
          label: "New Books",
          current: newBooks,
          total: books.length,
        },
        {
          label: "Active Loans",
          current: activeLoans,
          total: loans.length,
        },
        {
          label: "Books Returned",
          current: returnedBooks,
          total: books.length,
        },
        {
          label: "Overdue Books",
          current: overdueBooks,
          total: books.length,
        },
      ],
    };
  }, [
    loans,
    newUsers,
    users.length,
    newBooks,
    books.length,
    activeLoans,
    returnedBooks,
    overdueBooks,
  ]);

  if (isLoading && !hasData) {
    return <LoadingSpinner rows={15} />;
  }

  return (
    <Suspense fallback={<LoadingSpinner rows={15} />}>
      <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
        <DashboardHeader theme={theme} />

        <DashboardStats
          users={users}
          books={books}
          authors={authors}
          loans={loans}
          theme={theme}
          activeLoans={activeLoans}
          overDueBooks={overdueBooks}
          returnedBooks={returnedBooks}
        />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <PopularBooks
              popularBooks={processedData.popularBooks}
              theme={theme}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <UsageMetricsSection
              usageMetrics={processedData.usageMetrics}
              theme={theme}
            />
          </Grid>
        </Grid>
        <RecentActivities
          recentLoans={recentLoans}
          recentReturns={recentReturns}
          getStatusColor={getStatusColor}
          theme={theme}
        />
      </Box>
    </Suspense>
  );
}

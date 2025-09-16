import { lazy, Suspense, useEffect, useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
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
  
  // LOADING STATES
  const usersLoading = useUserStore((state) => state.loading);
  const booksLoading = useBookStore((state) => state.loading);
  const loansLoading = useLoanStore((state) => state.loading);
  const authorsLoading = useAuthorStore((state) => state.loading);
  const isLoading = usersLoading || booksLoading || loansLoading || authorsLoading;
  
  // FETCH ENTITIES DATA
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const fetchLoans = useLoanStore((state) => state.fetchLoans);
  const fetchAuthors = useAuthorStore((state) => state.fetchAuthors);

  useEffect(() => {
    const fetchAllData = async () => {
      const promises = [];
      
      // Only fetch if stores are empty
      if (users.length === 0) promises.push(fetchUsers());
      if (books.length === 0) promises.push(fetchBooks());
      if (loans.length === 0) promises.push(fetchLoans());
      if (authors.length === 0) promises.push(fetchAuthors());
      
      if (promises.length > 0) {
        await Promise.all(promises);
      }
    };

    fetchAllData();
  }, [users.length, books.length, loans.length, authors.length, fetchUsers, fetchBooks, fetchLoans, fetchAuthors]);
  
  const processedData = useMemo(() => {
    // SAFETY CHECKS
    const safeUsers = Array.isArray(users) ? users : [];
    const safeBooks = Array.isArray(books) ? books : [];
    const safeLoans = Array.isArray(loans) ? loans : [];
    const safeAuthors = Array.isArray(authors) ? authors : [];

    // ANALYTICS 
    const newUsers = getNewUsers(safeUsers);
    const newBooks = getNewBooks(safeBooks);
    const activeLoans = getActiveLoans(safeLoans);
    const returnedBooks = getReturnedBooks(safeLoans);
    const overdueBooks = getOverdueBooks(safeLoans);
    const recentLoans = getRecentLoans(safeLoans, 5);
    const recentReturns = getRecentReturns(safeLoans, 5);

    return {
      safeUsers,
      safeBooks,
      safeLoans,
      safeAuthors,
      analytics: {
        newUsers,
        newBooks,
        activeLoans,
        returnedBooks,
        overdueBooks,
        recentLoans,
        recentReturns,
      },
      popularBooks: safeLoans.length > 0 ? getPopularBooks(safeLoans) : [],
      usageMetrics: [
        {
          label: "New Users",
          current: newUsers,
          total: safeUsers.length,
        },
        {
          label: "New Books",
          current: newBooks,
          total: safeBooks.length,
        },
        {
          label: "Active Loans",
          current: activeLoans,
          total: safeLoans.length,
        },
        {
          label: "Books Returned",
          current: returnedBooks,
          total: safeLoans.length,
        },
        {
          label: "Overdue Books",
          current: overdueBooks,
          total: safeBooks.length,
        },
      ],
    };
  }, [users, books, loans, authors]);

  const hasNoData = processedData.safeUsers.length === 0 && 
                   processedData.safeBooks.length === 0 && 
                   processedData.safeLoans.length === 0 && 
                   processedData.safeAuthors.length === 0;
  const showLoadingMessage = isLoading && hasNoData;

  return (
    <Suspense fallback={<LoadingSpinner rows={15} />}>
      <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
        {showLoadingMessage && (
          <Typography variant="h4" color="secondary" sx={{ mb: 2 }}>
            Please wait a couple of minutes, our server is starting up..
          </Typography>
        )}
        <DashboardHeader theme={theme} />
        <DashboardStats
          users={processedData.safeUsers}
          books={processedData.safeBooks}
          authors={processedData.safeAuthors}
          loans={processedData.safeLoans}
          theme={theme}
          activeLoans={processedData.analytics.activeLoans}
          overDueBooks={processedData.analytics.overdueBooks}
          returnedBooks={processedData.analytics.returnedBooks}
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
          recentLoans={processedData.analytics.recentLoans}
          recentReturns={processedData.analytics.recentReturns}
          getStatusColor={getStatusColor}
          theme={theme}
        />
      </Box>
    </Suspense>
  );
}

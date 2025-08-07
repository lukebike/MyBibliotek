import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  useTheme,
} from "@mui/material";
import { Grid } from "@mui/material";
import {
  People as PeopleIcon,
  MenuBook as BookIcon,
  Assignment as LoanIcon,
  Person as AuthorIcon,
  Warning as WarningIcon,
  LibraryBooks as LibraryIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { DashboardCard } from "../components/DashboardCard";
import { ProgressBar } from "../components/ProgressBar";
import type {
  DashboardStats,
  PopularBook,
  UsageMetric,
  RecentLoan,
  RecentReturn,
} from "../types/DashboardStats";

import { useUserStore } from "../store/userStore";
import { getUserGrowth } from "../hooks/getUserGrowth";
import dayjs from "dayjs";

export default function Dashboard() {
  const theme = useTheme();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [popularBooks, setPopularBooks] = useState<PopularBook[]>([]);
  const [usageMetrics, setUsageMetrics] = useState<UsageMetric[]>([]);
  const [recentLoans, setRecentLoans] = useState<RecentLoan[]>([]);
  const [recentReturns, setRecentReturns] = useState<RecentReturn[]>([]);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const users = useUserStore((state) => state.users);
  const userGrowth = getUserGrowth(users);

  useEffect(() => {
    fetchUsers();
    setStats({
      totalUsers: 1247,
      activeLoans: 342,
      booksReturned: 89,
      totalAuthors: 456,
      overdueBooks: 23,
      newMembers: 18,
      collectionSize: 12847,
      userGrowth: 12,
      loanGrowth: -8,
      returnGrowth: -3,
      authorGrowth: -5,
    });

    setPopularBooks([
      { id: 1, title: "The Great Gatsby", loans: 15, available: 2, total: 5 },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        loans: 12,
        available: 1,
        total: 4,
      },
      { id: 3, title: "1984", loans: 10, available: 0, total: 3 },
      { id: 4, title: "Pride and Prejudice", loans: 9, available: 3, total: 6 },
    ]);

    setUsageMetrics([
      { label: "Books Checked Out", current: 342, total: 500 },
      { label: "Active Members", current: 1247, total: 1500 },
      { label: "Digital Resources", current: 156, total: 200 },
      { label: "Study Rooms", current: 8, total: 12 },
    ]);

    setRecentLoans([
      {
        id: 1,
        user: { initials: "AA", name: "Anna Andersson" },
        book: { title: "The Great Gatsby" },
        dueDate: "2024-01-25",
        status: "active",
      },
      {
        id: 2,
        user: { initials: "EE", name: "Erik Eriksson" },
        book: { title: "To Kill a Mockingbird" },
        dueDate: "2024-01-23",
        status: "overdue",
      },
      {
        id: 3,
        user: { initials: "MK", name: "Maria Karlsson" },
        book: { title: "1984" },
        dueDate: "2024-01-28",
        status: "active",
      },
      {
        id: 4,
        user: { initials: "JJ", name: "Johan Johansson" },
        book: { title: "Pride and Prejudice" },
        dueDate: "2024-01-30",
        status: "active",
      },
    ]);

    setRecentReturns([
      {
        id: 1,
        user: { initials: "ES", name: "Emma Svensson" },
        book: { title: "The Catcher in the Rye" },
        returnDate: "2024-01-20",
      },
      {
        id: 2,
        user: { initials: "LL", name: "Lars Larsson" },
        book: { title: "Brave New World" },
        returnDate: "2024-01-19",
      },
      {
        id: 3,
        user: { initials: "SN", name: "Sofia Nilsson" },
        book: { title: "The Lord of the Rings" },
        returnDate: "2024-01-18",
      },
      {
        id: 4,
        user: { initials: "SD", name: "sdadsa" },
        book: { title: "Thadasd" },
        returnDate: "2024-01-20",
      },
    ]);
  }, [fetchUsers]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#1976d2";
      case "overdue":
        return "#f57c00";
      case "good":
        return "#4caf50";
      case "excellent":
        return "#4caf50";
      case "fair":
        return "#ff9800";
      default:
        return theme.palette.text.secondary;
    }
  };

  if (!stats) {
    return (
      <Typography color={theme.palette.text.primary}>Loading...</Typography>
    );
  }

  users.forEach((u) => {
    const reg = dayjs(u.registrationDate);
    console.log(
      u.registrationDate,
      "->",
      reg.format("YYYY-MM-DD"),
      "year:",
      reg.year(),
      "month:",
      reg.month()
    );
  });

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            Dashboard
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary }}
          >
            Welcome back! Here's what's happening in your library today.
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Total Users"
            value={users.length}
            growth={userGrowth}
            icon={<PeopleIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Books Returned"
            value={stats.booksReturned}
            growth={stats.returnGrowth}
            icon={<BookIcon />}
            color="#4caf50"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Total Authors"
            value={stats.totalAuthors}
            growth={stats.authorGrowth}
            icon={<AuthorIcon />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Active Loans"
            value={stats.activeLoans}
            growth={stats.loanGrowth}
            icon={<LoanIcon />}
            color="#f57c00"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Overdue Books"
            value={stats.overdueBooks}
            icon={<WarningIcon />}
            color="#f44336"
          />
          <Typography
            variant="caption"
            sx={{
              color: "#f44336",
              mt: 1,
              display: "block",
              textAlign: "center",
            }}
          >
            Requires immediate attention
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Collection Size"
            value={stats.collectionSize}
            icon={<LibraryIcon />}
            color="#1976d2"
          />
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              mt: 1,
              display: "block",
            }}
          >
            Total books in library
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {popularBooks.map((book) => (
                <Box key={book.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {book.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {book.loans} loans • {book.available}/{book.total}{" "}
                      available
                    </Typography>
                  </Box>
                  <ProgressBar value={book.loans} total={20} color="#1976d2" />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
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
              Library Usage Overview
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {usageMetrics.map((metric, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
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
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {metric.current}/{metric.total}
                    </Typography>
                  </Box>
                  <ProgressBar
                    value={metric.current}
                    total={metric.total}
                    color="#1976d2"
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                Recent Loans
              </Typography>
              <IconButton
                size="small"
                sx={{ color: theme.palette.text.secondary }}
              >
                <ViewIcon fontSize="small" />
              </IconButton>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      User
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      Book
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      Due Date
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentLoans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            sx={{ width: 32, height: 32, fontSize: "0.875rem" }}
                          >
                            {loan.user.initials}
                          </Avatar>
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.primary }}
                          >
                            {loan.user.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.primary }}
                        >
                          {loan.book.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.primary }}
                        >
                          {loan.dueDate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={loan.status}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(loan.status),
                            color: "white",
                            fontSize: "0.75rem",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                Recent Returns
              </Typography>
              <IconButton
                size="small"
                sx={{ color: theme.palette.text.secondary }}
              >
                <ViewIcon fontSize="small" />
              </IconButton>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      User
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      Book
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      Return Date
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      Condition
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentReturns.map((returnItem) => (
                    <TableRow key={returnItem.id}>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            sx={{ width: 32, height: 32, fontSize: "0.875rem" }}
                          >
                            {returnItem.user.initials}
                          </Avatar>
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.primary }}
                          >
                            {returnItem.user.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.primary }}
                        >
                          {returnItem.book.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.primary }}
                        >
                          {returnItem.returnDate}
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

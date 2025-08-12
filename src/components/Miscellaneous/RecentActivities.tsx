import { memo } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Tooltip,
  type Theme,
} from "@mui/material";
import { Grid } from "@mui/material";

import type { RecentReturnedLoan } from "../../types/loans/RecentReturnedLoan";
import type { RecentLoan } from "../../types/loans/RecentLoan";

interface RecentActivitiesProps {
  getStatusColor: (status: string) => string;
  recentLoans: RecentLoan[];
  recentReturns: RecentReturnedLoan[];
  theme: Theme;
}

const RecentLoansTable = memo(
  ({
    loans,
    getStatusColor,
    theme,
  }: {
    loans: RecentLoan[];
    getStatusColor: (status: string) => string;
    theme: Theme;
  }) => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
            >
              Borrower
            </TableCell>
            <TableCell
              sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
            >
              Book
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 600,
                minWidth: "100px",
              }}
            >
              Due By
            </TableCell>
            <TableCell
              sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.slice(0, 5).map((recentLoan) => (
            <TableRow key={recentLoan.id} hover>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: "0.875rem" }}>
                    {recentLoan.user.initials}
                  </Avatar>
                  <Tooltip title={recentLoan.user.name} arrow placement="top">
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.primary,
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "help",
                      }}
                    >
                      {recentLoan.user.name}
                    </Typography>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell>
                <Tooltip title={recentLoan.book.title} arrow placement="top">
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.primary,
                      maxWidth: "75px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      cursor: "help",
                    }}
                  >
                    {recentLoan.book.title}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    whiteSpace: "nowrap",
                    fontSize: "0.875rem",
                  }}
                >
                  {recentLoan.dueDate}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={recentLoan.status}
                  size="small"
                  sx={{
                    backgroundColor: getStatusColor(recentLoan.status),
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
);

const RecentReturnsTable = memo(
  ({ loans, theme }: { loans: RecentReturnedLoan[]; theme: Theme }) => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
            >
              Borrower
            </TableCell>
            <TableCell
              sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
            >
              Book
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 600,
                minWidth: "100px",
              }}
            >
              Returned On
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.slice(0, 5).map((returnedLoan) => (
            <TableRow key={returnedLoan.id} hover>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: "0.875rem" }}>
                    {returnedLoan.user.initials}
                  </Avatar>
                  <Tooltip title={returnedLoan.user.name} arrow placement="top">
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.primary,
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "help",
                      }}
                    >
                      {returnedLoan.user.name}
                    </Typography>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell>
                <Tooltip title={returnedLoan.book.title} arrow placement="top">
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.primary,
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      cursor: "help",
                    }}
                  >
                    {returnedLoan.book.title}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    whiteSpace: "nowrap",
                    fontSize: "0.875rem",
                  }}
                >
                  {returnedLoan.returnDate}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
);

const RecentActivities = memo(
  ({
    recentLoans,
    recentReturns,
    getStatusColor,
    theme,
  }: RecentActivitiesProps) => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            width: "100%",
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
            Recent Loans
          </Typography>

          {recentLoans.length > 0 ? (
            <RecentLoansTable
              loans={recentLoans}
              getStatusColor={getStatusColor}
              theme={theme}
            />
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                No recent loans
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            width: "100%",
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
            Recent Returns
          </Typography>

          {recentReturns.length > 0 ? (
            <RecentReturnsTable loans={recentReturns} theme={theme} />
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                No recent returns
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
);

export default RecentActivities;

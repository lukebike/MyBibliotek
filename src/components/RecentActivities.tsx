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

interface RecentLoan {
  id: number;
  user: { initials: string; name: string };
  book: { title: string };
  dueDate: string;
  status: string;
}

interface RecentReturn {
  id: number;
  user: { initials: string; name: string };
  book: { title: string };
  returnDate: string;
}

interface RecentActivitiesProps {
  getStatusColor: (status: string) => string;
  recentLoans: RecentLoan[];
  recentReturns: RecentReturn[];
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
          {loans.slice(0, 5).map((loan) => (
            <TableRow key={loan.id} hover>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: "0.875rem" }}>
                    {loan.user.initials}
                  </Avatar>
                  <Tooltip title={loan.user.name} arrow placement="top">
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
                      {loan.user.name}
                    </Typography>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell>
                <Tooltip title={loan.book.title} arrow placement="top">
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
                    {loan.book.title}
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
  ({ returns, theme }: { returns: RecentReturn[]; theme: Theme }) => (
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
          {returns.slice(0, 5).map((returnItem) => (
            <TableRow key={returnItem.id} hover>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: "0.875rem" }}>
                    {returnItem.user.initials}
                  </Avatar>
                  <Tooltip title={returnItem.user.name} arrow placement="top">
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
                      {returnItem.user.name}
                    </Typography>
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell>
                <Tooltip title={returnItem.book.title} arrow placement="top">
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
                    {returnItem.book.title}
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
                  {returnItem.returnDate}
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
            <RecentReturnsTable returns={recentReturns} theme={theme} />
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

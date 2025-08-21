import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LockIcon from "@mui/icons-material/Lock";
import BlockIcon from "@mui/icons-material/Block";
import RestoreIcon from "@mui/icons-material/Restore";
import DownloadIcon from "@mui/icons-material/Download";
import KeyIcon from "@mui/icons-material/Key";
import SecurityIcon from "@mui/icons-material/Security";

// Status color mapping
const kycStatusColors = {
  Approved: "success",
  Pending: "warning",
  Rejected: "error",
  "Not Submitted": "default",
};

const accountStatusColors = {
  Active: "success",
  Suspended: "error",
  Locked: "warning",
};

const UserDetailsDialog = ({
  open,
  onClose,
  user,
  tabValue,
  handleTabChange,
  kycDocuments,
  openConfirmDialog,
  handleSecurityReset,
  handleAccountStatusChange,
  userWalletBalances,
  walletLoading,
  userTransactions,
  transactionsLoading,
  userActivityLogs = [],
}) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3">User Details: {user.username}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="user details tabs"
          >
            <Tab label="Profile" />
            <Tab label="KYC Documents" />
            <Tab label="Activity Logs" />
            <Tab label="Wallet Balances" />
            <Tab label="Transaction History" /> {/* Add new tab */}
            <Tab label="Account Actions" />
          </Tabs>
        </Box>

        {/* Profile Tab */}
        {tabValue === 0 && (
          <Grid
            container
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={2}
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Username:</Typography>
              <Typography variant="body1">
                {user.firstname} {user.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Email:</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Date Registered:</Typography>
              <Typography variant="body1">
                {dayjs(user.createdAt).format("DD MM, YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">KYC Status:</Typography>
              <Chip label={"--"} color={kycStatusColors[user.kycStatus]} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Account Status:</Typography>
              <Chip
                label={user.isActive === true ? "Active" : "InActive"}
                color={
                  accountStatusColors[
                    user.isActive === true ? "Active" : "InActive"
                  ]
                }
              />
            </Grid>
          </Grid>
        )}

        {/* KYC Documents Tab */}
        {tabValue === 1 && (
          <>
            <Typography variant="h6" gutterBottom>
              KYC Documents
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Document Type</TableCell>
                    <TableCell>Upload Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {kycDocuments.length > 0 ? (
                    kycDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.uploadDate}</TableCell>
                        <TableCell>
                          <Chip
                            label={doc.status}
                            color={kycStatusColors[doc.status]}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="Download Document">
                              <IconButton size="small" color="primary">
                                <DownloadIcon />
                              </IconButton>
                            </Tooltip>
                            {doc.status === "Pending" && (
                              <>
                                <Tooltip title="Approve">
                                  <IconButton
                                    size="small"
                                    color="success"
                                    onClick={() =>
                                      openConfirmDialog(
                                        "Approve Document",
                                        `Are you sure you want to approve this ${doc.type}?`,
                                        () => handleKycAction("approve", doc.id)
                                      )
                                    }
                                  >
                                    <CheckCircleIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Reject">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() =>
                                      openConfirmDialog(
                                        "Reject Document",
                                        `Are you sure you want to reject this ${doc.type}?`,
                                        () => handleKycAction("reject", doc.id)
                                      )
                                    }
                                  >
                                    <CancelIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No KYC documents found for this user
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Activity Logs Tab */}
        {tabValue === 2 && (
          <>
            <Typography variant="h6" gutterBottom>
              Activity Logs
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Track all user activities and system interactions for{" "}
              {user?.firstname}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="primary">
                    Total Activities: {userActivityLogs?.length || 0}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
                  <Chip
                    label="Real-time"
                    color="success"
                    size="small"
                    icon={<CheckCircleIcon />}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Activity Summary Cards */}
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      bgcolor: "primary.light",
                      color: "white",
                      textAlign: "center",
                      py: 2,
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 3,
                        bgcolor: "primary.main",
                      },
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <Typography variant="h4" fontWeight="bold">
                      {Array.isArray(userActivityLogs)
                        ? userActivityLogs.filter((log) =>
                            log?.description?.includes("wallet")
                          ).length
                        : 0}
                    </Typography>
                    <Typography variant="body2">Wallet Activities</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      bgcolor: "success.light",
                      color: "white",
                      textAlign: "center",
                      py: 2,
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 3,
                        bgcolor: "success.main",
                      },
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <Typography variant="h4" fontWeight="bold">
                      {Array.isArray(userActivityLogs)
                        ? userActivityLogs.filter((log) =>
                            log?.description?.includes("created")
                          ).length
                        : 0}
                    </Typography>
                    <Typography variant="body2">Created Records</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      bgcolor: "warning.light",
                      color: "white",
                      textAlign: "center",
                      py: 2,
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 3,
                        bgcolor: "warning.main",
                      },
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <Typography variant="h4" fontWeight="bold">
                      {Array.isArray(userActivityLogs)
                        ? userActivityLogs.length
                        : 0}
                    </Typography>
                    <Typography variant="body2">Total Actions</Typography>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {Array.isArray(userActivityLogs) && userActivityLogs.length > 0 ? (
              <TableContainer
                sx={{
                  maxHeight: 400,
                  overflow: "auto",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          background:
                            "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                          color: "white",
                          borderRight: "1px solid rgba(255,255,255,0.2)",
                          "&:first-of-type": { borderTopLeftRadius: 8 },
                          "&:last-of-type": { borderTopRightRadius: 8 },
                        }}
                      >
                        Activity
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          background:
                            "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                          color: "white",
                          borderRight: "1px solid rgba(255,255,255,0.2)",
                        }}
                      >
                        Description
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          background:
                            "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                          color: "white",
                          borderRight: "1px solid rgba(255,255,255,0.2)",
                        }}
                      >
                        Timestamp
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          background:
                            "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                          color: "white",
                        }}
                      >
                        Details
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(userActivityLogs)
                      ? userActivityLogs.map((log, index) => (
                          <TableRow
                            key={log?._id || index}
                            hover
                            sx={{
                              "&:nth-of-type(odd)": {
                                backgroundColor: "rgba(25, 118, 210, 0.04)",
                              },
                              "&:hover": {
                                backgroundColor: "rgba(25, 118, 210, 0.08)",
                                transform: "scale(1.001)",
                              },
                              transition: "all 0.2s ease-in-out",
                              cursor: "pointer",
                            }}
                          >
                            <TableCell
                              sx={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}
                            >
                              <Box display="flex" alignItems="center" gap={1}>
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    backgroundColor: log?.description?.includes(
                                      "wallet"
                                    )
                                      ? "success.main"
                                      : "info.main",
                                    boxShadow: `0 0 8px ${log?.description?.includes("wallet") ? "success.main" : "info.main"}`,
                                    "&:hover": {
                                      transform: "scale(1.2)",
                                      boxShadow: `0 0 12px ${log?.description?.includes("wallet") ? "success.main" : "info.main"}`,
                                    },
                                    transition: "all 0.2s ease-in-out",
                                  }}
                                />
                                <Typography variant="body2" fontWeight={500}>
                                  {log?.description
                                    ?.split(" ")
                                    .slice(0, 3)
                                    .join(" ") || "Activity"}
                                  ...
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  maxWidth: 300,
                                  lineHeight: 1.4,
                                  color: "text.primary",
                                }}
                              >
                                {log?.description || "No description available"}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}
                            >
                              <Box>
                                <Typography
                                  variant="body2"
                                  fontWeight={500}
                                  color="primary"
                                >
                                  {log?.createdAt
                                    ? dayjs(log.createdAt).format(
                                        "MMM DD, YYYY"
                                      )
                                    : "N/A"}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="textSecondary"
                                  sx={{ fontStyle: "italic" }}
                                >
                                  {log?.createdAt
                                    ? dayjs(log.createdAt).format("hh:mm A")
                                    : "N/A"}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={1}>
                                <Chip
                                  label={log?.fullName || "System"}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                  sx={{
                                    borderColor: "primary.main",
                                    "&:hover": {
                                      backgroundColor: "primary.light",
                                      transform: "scale(1.05)",
                                    },
                                    transition: "all 0.2s ease-in-out",
                                    fontWeight: 500,
                                  }}
                                />
                                <Tooltip title="View Full Details">
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    sx={{
                                      "&:hover": {
                                        backgroundColor: "primary.light",
                                        transform: "scale(1.1)",
                                      },
                                      transition: "all 0.2s ease-in-out",
                                    }}
                                  >
                                    <DownloadIcon />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  backgroundColor: "grey.50",
                  borderRadius: 2,
                  border: "2px dashed",
                  borderColor: "grey.300",
                }}
              >
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  No Activity Logs Found
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  This user hasn't performed any activities yet, or logs are not
                  available.
                </Typography>
                <Chip
                  label="Activity monitoring is active"
                  color="info"
                  variant="outlined"
                  size="small"
                />
              </Box>
            )}
          </>
        )}

        {/* Wallet Balances Tab */}
        {tabValue === 3 && (
          <>
            <Typography variant="h6" gutterBottom>
              Wallet Balances
            </Typography>
            {walletLoading ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : userWalletBalances ? (
              <>
                <Grid container spacing={2}>
                  {userWalletBalances.map((balance) => (
                    <Grid item xs={12} sm={6} md={4} key={balance.tokenAddress}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1}
                          >
                            <Box display="flex" alignItems="center" gap={1}>
                              <img
                                src={balance.logo}
                                alt={balance.name}
                                style={{ width: 24, height: 24 }}
                              />
                              <Typography variant="h6">
                                {balance.symbol}
                              </Typography>
                            </Box>
                            <Chip
                              label={balance.chain}
                              color="primary"
                              size="small"
                            />
                          </Box>
                          <Typography variant="body1">
                            {balance.name}
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {parseFloat(balance.balance).toLocaleString()}{" "}
                            {balance.symbol}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Unit Price: ${balance.unitPrice.toLocaleString()}
                          </Typography>
                          <Typography variant="body1" color="primary">
                            ≈ ${parseFloat(balance.usdValue).toLocaleString()}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Box display="flex" justifyContent="center" p={3}>
                <Typography variant="body1" color="textSecondary">
                  No wallet balances found
                </Typography>
              </Box>
            )}
          </>
        )}

        {/* Transaction History Tab */}
        {tabValue === 4 && (
          <>
            <Typography variant="h6" gutterBottom>
              Transaction History
            </Typography>
            {transactionsLoading ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : userTransactions?.length > 0 ? (
              <Box>
                {userTransactions?.map((dateGroup, index) => (
                  <Box key={index} mb={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {dateGroup.date}
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Asset</TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>To</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Time</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dateGroup.transactions.map((transaction, tIndex) => (
                            <TableRow key={`${index}-${tIndex}`}>
                              <TableCell>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <img
                                    src={transaction.logo}
                                    alt={transaction.name}
                                    style={{ width: 24, height: 24 }}
                                  />
                                  <Box>
                                    <Typography variant="body2">
                                      {transaction.name}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="textSecondary"
                                    >
                                      {transaction.symbol}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Tooltip title={transaction.from}>
                                  <Typography noWrap sx={{ maxWidth: 150 }}>
                                    {transaction.from}
                                  </Typography>
                                </Tooltip>
                              </TableCell>
                              <TableCell>
                                <Tooltip title={transaction.to}>
                                  <Typography noWrap sx={{ maxWidth: 150 }}>
                                    {transaction.to}
                                  </Typography>
                                </Tooltip>
                              </TableCell>
                              <TableCell>
                                {parseFloat(
                                  transaction.balance
                                ).toLocaleString()}{" "}
                                {transaction.symbol}
                              </TableCell>
                              <TableCell>
                                {new Date(
                                  transaction.blockTimestamp
                                ).toLocaleTimeString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box display="flex" justifyContent="center" p={3}>
                <Typography variant="body1" color="textSecondary">
                  No transactions found
                </Typography>
              </Box>
            )}
          </>
        )}

        {/* Account Actions Tab - update index */}
        {tabValue === 5 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Account Actions
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Current Status:{" "}
                <Chip
                  label={user.isActive === true ? "Active" : "InActive"}
                  color={
                    accountStatusColors[
                      user.isActive === true ? "Active" : "InActive"
                    ]
                  }
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button
                  variant="outlined"
                  color="warning"
                  disabled={user?.isActive === false}
                  startIcon={<LockIcon />}
                  onClick={() =>
                    openConfirmDialog(
                      "Lock Account",
                      `Are you sure you want to lock ${user.firstname}'s account? They will not be able to log in until the account is unlocked. This action preserves all transaction history.`,
                      () => handleAccountStatusChange("lock")
                    )
                  }
                >
                  Lock Account
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  disabled={user?.isActive === false}
                  startIcon={<BlockIcon />}
                  onClick={() =>
                    openConfirmDialog(
                      "Suspend Account",
                      `Are you sure you want to suspend ${user.firstname}'s account? This will prevent them from using the platform until reactivated.`,
                      () => handleAccountStatusChange("suspend")
                    )
                  }
                >
                  Suspend Account
                </Button>

                <Button
                  variant="outlined"
                  color="success"
                  disabled={user?.isActive === true}
                  startIcon={<RestoreIcon />}
                  onClick={() =>
                    openConfirmDialog(
                      "Reactivate Account",
                      `Are you sure you want to reactivate ${user.firstname}'s account?`,
                      () => handleAccountStatusChange("reactivate")
                    )
                  }
                >
                  Reactivate Account
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<KeyIcon />}
                  onClick={() =>
                    openConfirmDialog(
                      "Reset Password",
                      `Are you sure you want to send a password reset link to ${user.email}?`,
                      () => handleSecurityReset("password")
                    )
                  }
                >
                  Reset Password
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<SecurityIcon />}
                  onClick={() =>
                    openConfirmDialog(
                      "Reset 2FA",
                      `Are you sure you want to reset 2FA for ${user.firstname}? A setup link will be sent to ${user.email}.`,
                      () => handleSecurityReset("2fa")
                    )
                  }
                >
                  Reset 2FA
                </Button>
              </Stack>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
